import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Chat from './components/Chat';
import Profile from './components/Profile';




class App extends Component {

render() {
    return (
        <BrowserRouter >
            <div>


                
                <Route path='/login' component={Login} />
                <Route exact path='/' component={Home} />
                <Route path='/chat/:id' component={Chat} />
                <Route path='/profile/:id' component={Profile} />

                

            </div>
        </BrowserRouter>
    );
    }
}


export default App;