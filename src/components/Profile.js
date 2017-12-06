import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Nav from './Nav';
import { getProfile, checkUser, getUserInfo, updateProfile } from '../ducks/reducer';

class Profile extends Component {

    constructor(){
        super();

        this.state = {
            editable: true
        }
    }

    componentDidMount(){
        console.log(this.props.match.params.id)
        this.props.getProfile(this.props.match.params.id).then( () => {
            this.refs.nickname.value = this.props.profile.nickname
            this.refs.first.value = this.props.profile.first_name
            this.refs.last.value = this.props.profile.last_name
            this.refs.homeMountain.value = this.props.profile.home_mountain
        })
        this.props.checkUser();
        this.props.getUserInfo();
    }
    
// this.props.user.user_id = this.props.match.params.id ? '' : 'profile_disabled'
    render(){
        console.log(this.props.userLogged)
        console.log(this.props.match.params.id)
        console.log(this.props.user);
        // const user = {
        //     nickname: this.refs.nickname.value,
        //     first: this.refs.first.value,
        //     last: this.refs.last.value,
        //     homeMountain: this.refs.homeMountain.value
        // }
        return(
            <div>
                <Header/>
                <div className='profile_container'>
                <div ><img src={this.props.profile.profile_picture} className='profile_image' /></div> 
                <div className={this.state.editable ? 'profile_disabled' : 'profile_text_container'}>
                    <input ref='nickname' type='text' className='profile_input'/>
                    <div>
                    <input ref='first' type='text'  className='profile_input'/>
                    <input ref='last' type='text'  className='profile_input'/>
                    </div>
                    <input ref='homeMountain' type='text'  className='profile_input'/>
                </div>
                    <div className={this.state.editable ? 'profile_display' :'profile_disabled'}>
                        <h3 className=''>Nickname: {this.props.profile.nickname} </h3>
                        <div>
                        <h3 className=''>First Name: {this.props.profile.first_name} </h3>
                        <h3 className=''>Last Name: {this.props.profile.last_name}</h3>
                        </div>
                        <h3 className=''>Home Mountain:</h3>
                    </div>  
                </div> 
                <div className={this.props.user.user_id == this.props.match.params.id ? '' : 'profile_disabled'} >
                    <button type='' className={this.state.editable ? 'profile_edit': 'profile_disabled'}onClick={()=> this.setState({editable: false})}>Edit</button>
                    <button type='' className={this.state.editable ? 'profile_disabled': 'profile_save'}onClick={()=>{
                        this.props.updateProfile(this.props.match.params.id, {
                            nickname: this.refs.nickname.value,             
                            first: this.refs.first.value,
                            last: this.refs.last.value,
                            homeMountain: this.refs.homeMountain.value
                })
                        this.setState({editable: true})}}>Save</button>
                </div>
                <Nav/>
            </div> 
        )
    }

}

function mapStateToProps(state) {
    console.log('mpst:', state)
    return state

}
export default connect(mapStateToProps, { getProfile, checkUser, getUserInfo, updateProfile })(Profile);