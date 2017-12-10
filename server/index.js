require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0"),
  massive = require("massive"),
  ctrl = require('./controllers'),
  socket = require('socket.io'),
  sharedSession = require('express-socket.io-session');
  fence = require('./fence_controllers');

  const port = 3030;
  
  const app = express();
  app.use(express.static('build'))
app.use(bodyParser.json());
app.use(cors());

const session = require("express-session")({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
})

app.use(session)

app.use(passport.initialize());
app.use(passport.session());


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
    successRedirect: process.env.AUTH_SUCCESS,
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
  res.redirect(process.env.AUTH_LOGIN);
});

// Socket io


// io.on('connection', socket =>{
//   console.log('User Connected')

//   socket.on('message sent', data => {
//     console.log(data, socket);
//     io.emit('chat', data.message)
//   })

//   socket.on('join room', data => {
//     console.log('Room joined', data.room);
//     socket.join(data.room);
//     io.to(data.room).emit('room joined');
//   })

//   socket.on('message sent', data => {
//     io.to(data.room).emit('message dispatched', data.message)
//   })

// });
// ---------------------- New socket stuff ---------------------------//

const applyMiddleware = (io) => {
  io.use(sharedSession(session, {
    autoSave:true
  }));
  io.use((socket, next) => {
      if (socket.handshake.session.passport) {
          socket.user = socket.handshake.session.passport.user
      }
      return next();
  })
}

const addListeners = (io, db) => {
  io.on('connect', (socket) => {
      console.log(socket.id + ' connected');
      socket.on('action', (action) => {
        switch (action.type) {
          case 'server/ new chat':
            socket.join(action.payload.roomid)
            break;
          case 'server/ join chat' :
            console.log(socket.id, ' joined room ', action.payload)
            socket.join(action.payload)
            db.get_room_messages([action.payload]).then(res => {
              io.to(action.payload).emit('action', {type: 'GET_ROOM_MESSAGES', payload: res});
            })
            break;
          case 'server/ chat send message' :
            console.log(action.payload, 'user: ', socket.user)
            const { message, roomid } = action.payload
            db.save_chat_message([ message, socket.user, roomid ]).then( res => {
              socket.on
              io.to(roomid).emit('action', {type: 'SEND_CHAT_MESSAGE', payload: res[0]})
            })
          // case 'server/message sent' :
          //   io.to('action', )
      }
    })
  })
}
//profile endpoints

app.get('/user/:id', ctrl.getUser )

app.get('/checkuser', ctrl.checkUser)

app.put('/users/:id', ctrl.updateUser)


//Friends Endpoints
app.post('/send/friend/request/:requestfrom/:requestto', ctrl.friendRequest)

app.get('/find/users/:id', ctrl.findUsers)

app.get('/friends/all/:id', ctrl.getAllFriends)

app.post('/accept/friend/', ctrl.acceptFriend)
app.put('/deny/friend', ctrl.denyFriend)
//GEOLOCATION

app.put('/user/location', ctrl.updateUserLocation)

app.put('/get/user/location', fence.check_fences)

//Chat Endpoints
app.put('/take/chat/request', ctrl.takeChatRequest)
app.get('/chat/messages/:room_id', ctrl.getRoomMessages);

app.post('/chat/request', ctrl.createChatRequest);

app.get('/notifications/:user_id', ctrl.getRequest)

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

massive(process.env.CONNECTION_STRING)
.then(db => {
  app.set("db", db);
  const io = socket(app.listen(port, () => console.log(`Server listening on port, ${port}`)));
  applyMiddleware(io);
  addListeners(io, db)
})
