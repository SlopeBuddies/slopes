import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Nav from './Nav';

class Profile extends Component {
    

    render(){
        return(
            <div>
                <Header/>
                <div className='profile_container'>
                <div className='profile_image'>image</div> 
                <div className='profile_text_container'>
                    <input type='text' placeholder='nickname' className='profile_input'/>
                    <div>
                    <input type='text' placeholder='first name' className='profile_input'/>
                    <input type='text' placeholder='last name' className='profile_input'/>
                    </div>
                    <input type='text' placeholder='home mountain' className='profile_input'/>
                </div>
                    <div className='profile_display'>
                        <h3 className=''>Nickname: </h3>
                        <div>
                        <h3 className=''>First Name: </h3>
                        <h3 className=''>Last Name: </h3>
                        </div>
                        <h3 className=''>Home Mountain: </h3>
                    </div>  
                </div> 
                <button type='' className={true ? 'profile_disabled': 'profile_edit'}>Edit</button>
                <button type='' className={true ? 'profile_save': 'profile_disabled'}>Save</button>
                <Nav/>
            </div> 
        )
    }

}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Profile);