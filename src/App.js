import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { test } from './ducks/reducer';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';



class App extends Component {

componentDidMount(){
    this.props.test()
}

render() {
    return (
        <BrowserRouter >
            <div>
                <Route path='/login' component={Login} />
            </div>
        </BrowserRouter>
    );
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {test})(App);