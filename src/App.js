import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';



class App extends Component {

render() {
    return (
        <BrowserRouter >
            <div>
                <Route path='/login' component={Login} />
                <Route exact path='/' component={Home} />
            </div>
        </BrowserRouter>
    );
    }
}


export default App;