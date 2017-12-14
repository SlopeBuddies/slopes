import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModal, getAllFriends, getUserInfo } from "./../ducks/reducer";

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserInfo();
    this.props.getAllFriends(this.props.user.user_id);
    console.log(this.props.user.user_id);
  }

  render() {
    const displayFriends = this.props.allhomies.map((e, i) => {
      return (
        <div key={i} className="friendsAvatar">
          <div>
            <img alt="user" className="friendsPic" src={e.profile_picture} />
          </div>
          <div className="friendsName">
            {e.first_name} {e.last_name}
          </div>
          <div className="friendmailer">
            <button type="" className="">
              Add to Room
            </button>
          </div>
        </div>
      );
    });
    return (
      <div>
        <section className="section_modal">
          <div
            className={
              this.props.openModal ? "modal_display_none" : "create_room_modal"
            }
          >
            <span className="modal_title">Create Your Own Room</span>
            <div>
              <input
                type="text"
                placeholder="room name"
                className="modal_input"
              />
              <button type="" className="modal_name_submit_button">
                Add Room
              </button>
            </div>
            <div className="friends_modal_list">{displayFriends}</div>
            <button
              type=""
              className="close_modal_button"
              onClick={() => this.props.toggleModal()}
            >
              Close
            </button>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { toggleModal, getAllFriends, getUserInfo })(Modal);
