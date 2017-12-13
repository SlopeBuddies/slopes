import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Map from './components/Map'



class App extends Component {

render() {
    return (
        <BrowserRouter >
            <div className='App'>

                <Route exact path='/' component={Login} />
                <Route  path='/home' component={Home} />
                <Route path='/chat/:chatid' component={Chat} />
                <Route path='/profile/:id' component={Profile} />
                <Route path='/map' component={Map} />
            </div>
        </BrowserRouter>
    );
    }
}


export default App;