import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Nav from "./Nav";
import {
  getProfile,
  checkUser,
  getUserInfo,
  updateProfile
} from "../ducks/reducer";
import Dropzone from 'react-dropzone';
import axios from 'axios';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      editable: true,
      secureURL: '',

    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.getProfile(this.props.match.params.id).then(() => {
      this.refs.nickname.value = this.props.profile.nickname;
      this.refs.first.value = this.props.profile.first_name;
      this.refs.last.value = this.props.profile.last_name;
      this.refs.homeMountain.value = this.props.profile.home_mountain;
      this.setState({
        secureURL:this.props.profile.profile_picture
      })
    });
    this.props.checkUser();
    this.props.getUserInfo();
  }


  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "faquy7a8"); // Replace the preset name with your own
      formData.append("api_key", "468972269232726"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);
      
      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.post(" https://api.cloudinary.com/v1_1/dpkxhok4t/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const data = response.data;
        var fileURL = data.secure_url; // You should store this URL for future references in your app
        fileURL = fileURL.split('/')
        for (var i = 0; i < fileURL.length; ++i){
          if (fileURL[i] == 'upload'){
            fileURL.splice(i + 1, 0, 'w_200,h_200,c_fill,g_face');
            fileURL = fileURL.join('/')
            console.log(fileURL)
            this.setState({
              secureURL: fileURL
            })
            i = fileURL.length;
          }
        }
        
        console.log('Worked', data);
      })
    });
  
    // Once all the files are uploaded 
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
      alert('done')
    });
  }

  // this.props.user.user_id = this.props.match.params.id ? '' : 'profile_disabled'
  render() {
    // console.log(this.props.userLogged);
    // console.log(this.props.match.params.id);
    // console.log(this.props.user);
    // console.log('profile', this.props.profile)
    // const user = {
    //     nickname: this.refs.nickname.value,
    //     first: this.refs.first.value,
    //     last: this.refs.last.value,
    //     homeMountain: this.refs.homeMountain.value
    // }
    return (
      <div>
        <Header />
        <div className="profile_container">
          <div>
            <img
              src={this.props.profile.profile_picture}
              className="profile_image"
            />
          </div>
          <div
            className={
              this.state.editable
                ? "profile_disabled"
                : "profile_text_container"
            }
          >

              <div className="profileName">
                <input ref="first" type="text" className="profile_input" />
                <input ref="last" type="text" className="profile_input" />
              </div>
              <input ref="nickname" type="text" className="profile_input" />
              <input ref="homeMountain" type="text" className="profile_input" />
              <div className='profile-upload-div' >
              <Dropzone 
                onDrop={this.handleDrop}  
                accept="image/*" 
                // style={styles.dropzone}
                className='profile-upload'
              >
                <p>Drop your files or click here to upload</p>
              </Dropzone>
              </div>
          </div>
          <div
            className={
              this.state.editable ? "profile_display" : "profile_disabled"
            }>

            <div>
              <div className="profileName">
                <h3>{  this.props.profile.first_name} &nbsp;   </h3>
                <h3>   {this.props.profile.last_name}</h3>
              </div>
              <h3>{this.props.profile.nickname} </h3>
              <h3> {this.props.profile.home_mountain}</h3>
            </div>
          </div>
          <div
            className={
              this.props.user.user_id == this.props.match.params.id
                ? ""
                : "profile_disabled"
            }
          >
            <button
              type="profilebtn"
              className={
                this.state.editable ? "profile_edit" : "profile_disabled"
              }
              onClick={() => this.setState({ editable: false })}
            >
              Edit
            </button>
            <button
              type="profilebtn"
              className={
                this.state.editable ? "profile_disabled" : "profile_save"
              }
              onClick={() => {
                this.props.updateProfile(this.props.match.params.id, {
                  nickname: this.refs.nickname.value,
                  first: this.refs.first.value,
                  last: this.refs.last.value,
                  home_mountain: this.refs.homeMountain.value,
                  imgURL: this.state.secureURL
                });
                this.setState({ editable: true });
              }}
            >
              Save
            </button>
          </div>
        </div>

        <Nav />
      </div>
    );
  }
}

function mapStateToProps(state) {

  return state;
}
export default connect(mapStateToProps, {
  getProfile,
  checkUser,
  getUserInfo,
  updateProfile
})(Profile);
