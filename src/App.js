import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { test } from './ducks/reducer';
import Login from './components/Login';



class App extends Component {

componentDidMount(){
    this.props.test()
}

 render() {
   return (
     <div>
         {this.props.init}
     </div>
   );
 }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {test})(App);