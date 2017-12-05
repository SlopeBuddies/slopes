import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Nav from './Nav';
import { getProfile, checkUser } from '../ducks/reducer';

class Profile extends Component {
    componentDidMount(){
        console.log(this.props.match.params.id)
        this.props.getProfile(this.props.match.params.id)
        this.props.checkUser();
    }
    

    render(){
        console.log(this.props.userLogged)
        return(
            <div>
                <Header/>
                <div className='profile_container'>
                <div ><img src={this.props.profile.profile_picture} className='profile_image' /></div> 
                <div className='profile_text_container'>
                    <input type='text' placeholder={this.props.profile.nickname} className='profile_input'/>
                    <div>
                    <input type='text' placeholder={this.props.profile.first_name} className='profile_input'/>
                    <input type='text' placeholder={this.props.profile.last_name} className='profile_input'/>
                    </div>
                    <input type='text' placeholder='home mountain' className='profile_input'/>
                </div>
                    <div className='profile_display'>
                        <h3 className=''>Nickname: {this.props.profile.nickname} </h3>
                        <div>
                        <h3 className=''>First Name: {this.props.profile.first_name} </h3>
                        <h3 className=''>Last Name: {this.props.profile.last_name}</h3>
                        </div>
                        <h3 className=''>Home Mountain:</h3>
                    </div>  
                </div> 
                <div className={this.props.userLogged ? '': 'profile_disabled'} >
                    <button type='' className={true ? 'profile_disabled': 'profile_edit'}>Edit</button>
                    <button type='' className={true ? 'profile_save': 'profile_disabled'}>Save</button>
                </div>
                <Nav/>
            </div> 
        )
    }

}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { getProfile, checkUser })(Profile);