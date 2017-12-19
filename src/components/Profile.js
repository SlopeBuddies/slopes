import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Nav from "./Nav";
import {
  getProfile,
  checkUser,
  getUserInfo,
  updateProfile,
  getAllFriends
} from "../ducks/reducer";
import Dropzone from "react-dropzone";
import axios from "axios";
import Channels from "./Channels";
import edit from './../assets/edit icon.png';
import gps from './../assets/gps.svg';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      editable: true,
      secureURL: "",
      friends: [],
      coverURL: ""
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
        secureURL: this.props.profile.profile_picture,
        coverURL: this.props.profile.cover_picture
      });
    });
    this.props.checkUser();
    this.props.getUserInfo();
    this.props.getAllFriends(this.props.user.user_id);
  }

  handleDropCover = files => {
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
      return axios
        .post(
          " https://api.cloudinary.com/v1_1/dpkxhok4t/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" }
          }
        )
        .then(response => {
          const data = response.data;
          var fileURL = data.secure_url; // You should store this URL for future references in your app
          fileURL = fileURL.split("/");
          for (var i = 0; i < fileURL.length; ++i) {
            if (fileURL[i] === "upload") {
              fileURL.splice(i + 1, 0, "w_200,h_200,c_fill");
              fileURL = fileURL.join("/");
              this.setState({
                coverURL: fileURL
              });
              i = fileURL.length;
            }
          }
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
      alert("done");
    });
  };

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
      return axios
        .post(
          " https://api.cloudinary.com/v1_1/dpkxhok4t/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" }
          }
        )
        .then(response => {
          const data = response.data;
          var fileURL = data.secure_url; // You should store this URL for future references in your app
          fileURL = fileURL.split("/");
          for (var i = 0; i < fileURL.length; ++i) {
            if (fileURL[i] === "upload") {
              fileURL.splice(i + 1, 0, "w_200,h_200,c_fill,g_face");
              fileURL = fileURL.join("/");
              this.setState({
                secureURL: fileURL
              });
              i = fileURL.length;
            }
          }
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
      alert("done");
    });
  };

  unfriend() {
    axios.put(`/unfriend/${+this.props.match.params.id}`).then(res => {
      this.props.getAllFriends(this.props.user.user_id);
    });
  }

  toggleVisibility() {
    axios
      .put("/update/visibility", {
        updateTo: !this.props.profile.location_visible
      })
      .then(res => {
        console.log("toggled");
        this.props.getProfile(this.props.match.params.id);
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
    // this.props.allhomies.map((e, i, arr)=>{
    //   this.setState({
    //     friends: this.state.friends.push(e.user_id)
    //   })
    // })

    return (
      <div className="profile-main">
        <Header />
        <div className="profile_container">
          <div style={{ height: "15px" }} />
          <div>
            <img
              alt="cover-picture"
              src={this.props.profile.cover_picture}
              className="profile-cover-photo"
            />
          </div>
          <div>
            <img
              alt="profile-picture"
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
            <div className="cover-upload-div">
              <Dropzone
                onDrop={this.handleDropCover}
                accept="image/*"
                // style={styles.dropzone}
                className="profile-upload"
              >
                <p>+</p>
              </Dropzone>
            </div>

            <div className="profile-upload-div">
              <Dropzone
                onDrop={this.handleDrop}
                accept="image/*"
                // style={styles.dropzone}
                className="profile-upload"
              >
                <p>+</p>
              </Dropzone>
            </div>
            <div className="profileName">
              <input ref="first" type="text" className="profile_input" />
              <input ref="last" type="text" className="profile_input" />
            </div>
            <input ref="nickname" type="text" className="profile_input" />
            <input ref="homeMountain" type="text" className="profile_input" />
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
                  imgURL: this.state.secureURL,
                  coverURL: this.state.coverURL
                });
                this.setState({ editable: true });
              }}
            >
              SAVE
            </button>
          </div>
          <div
            className={
              this.state.editable ? "profile_display" : "profile_disabled"
            }
          >
            <div className="profile_box">
              <div className="profileName">
                <h3>{this.props.profile.first_name} &nbsp; </h3>
                <h3> {this.props.profile.last_name}</h3>
              </div>
              <h3 className='profile_nickname'>{this.props.profile.nickname} </h3>
              <h3 className='profile_home_mtn'> {this.props.profile.home_mountain}</h3>
            </div>

            <div
              className={
                this.props.user.user_id === +this.props.match.params.id
                  ? ""
                  : "profile_disabled"
              }
            >
              <div>
                <img src={gps}
                  onClick={() => {
                    this.toggleVisibility();
                  }}
                  className="profile_toggle"
                  style={
                    this.props.profile.location_visible
                      ? { background: "green" }
                      : { background: "gray" }
                  }
                />
                {/* visibility */}
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  this.unfriend();
                }}
                style={
                  this.props.friendIds.includes(+this.props.match.params.id)
                    ? null
                    : { display: "none" }
                }
                className="profile_edit unfriend"
              >
                X
              </button>
            </div>
          </div>

          <div
            className={
              this.props.user.user_id === +this.props.match.params.id
                ? ""
                : "profile_disabled"
            }
          >
            <img src={edit}
              type="profilebtn"
              className={
                this.state.editable ? "profile_edit" : "profile_disabled"
              }
              onClick={() => this.setState({ editable: false })}
            
              Edit
            />

            
          </div>
        </div>
        <Channels />
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
  updateProfile,
  getAllFriends
})(Profile);
