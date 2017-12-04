import React, { Component } from 'react';
import { connect } from 'react-redux';
import { test } from '../ducks/reducer';

class Home extends Component {

    componentDidMount(){
        this.props.test();
    }

    render() {
        return (
            <div>
                {this.props.init}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {test})(Home);