import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';

class Home extends Component {

    componentDidMount(){
        this.props.getUserInfo();
    }

    render() {

console.log(this.props.user)

        return (
            <div>
                <Header />
                <div>

                </div>

                <Nav />
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUserInfo})(Home);