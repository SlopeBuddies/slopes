require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  session = require("express-session"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0"),
  massive = require("massive"),
  ctrl = require('./controllers'),
  fence = require('./fence_controllers'),
  socket = require('socket.io');

  const port = 3030;
  
  const app = express();
  app.use(express.static('build'))
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
});

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH_DOMAIN,
      clientID: process.env.AUTH_CLIENTID,
      clientSecret: process.env.AUTH_CLIENTSECRET,
      callbackURL: process.env.AUTH_CALLBACK
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      const db = app.get("db");
      const userData = profile._json;
      db.find_user([userData.identities[0].user_id]).then(user => {
        if (user[0]) {
          return done(null, user[0].user_id);
        } else {
          db
            .create_user([
              userData.given_name,
              userData.family_name,
              userData.email,
              userData.picture,
              userData.nickname,
              userData.identities[0].user_id
            ])
            .then(user => {
              done(null, user[0].user_id);
            })
            .catch( (error) => console.log('errrr', error))
        }
      });
    }
  )
);
passport.serializeUser(function(id, done) {
  done(null, id);
});
passport.deserializeUser(function(id, done) {
  app
    .get("db")
    .find_session_user([id])
    .then(user => {
      done(null, user[0]);
    });
});

app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/auth"
  })
);
app.get("/auth/me", (req, res) => {
  if (req.user) {
    return res.status(200).send(req.user);
  } else {
    return res.status(401).send(req.user);
  }
});

app.get("/auth/logout", (req, res) => {
  req.logOut(); //built in method that destroys the session
  res.redirect("http://localhost:3000/login");
});

// Socket io

const io = socket(app.listen(port, () => console.log(`Server listening on port, ${port}`)));

io.on('connection', socket =>{
  console.log('User Connected')

  socket.on('message sent', data => {
    console.log(data, socket);
    io.emit('chat', data.message)
  })

});


//profile endpoints

app.get('/user/:id', ctrl.getUser )

app.get('/checkuser', ctrl.checkUser)

app.put('/users/:id', ctrl.updateUser)

//Friends Endpoints

app.get('/friends/all/:id', ctrl.getAllFriends)

//GEOLOCATION

app.put('/user/location', ctrl.updateUserLocation)

app.put('/get/user/location', fence.check_fences)

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// app.listen(port, () => console.log(`server is listening on port: ${port}`));
