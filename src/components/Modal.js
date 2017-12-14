import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModal, getAllFriends, getUserInfo } from "./../ducks/reducer";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomName: '',
      uninvitedFriends: [],
      invitedFriends: []
    }
  }

  componentDidMount() {
    this.props.getUserInfo();
    console.log(this.props.user.user_id);
  }

  addToInvited(friend) {
     let arr = [...this.state.uninvitedFriends];
    arr.forEach((e, i) => {
      if (friend === e) {
        var top = [...this.state.uninvitedFriends]
        var bottom = [...this.state.invitedFriends]
        var topSplice = top.splice(i, 1);
        bottom.push(topSplice[0]);
        this.setState({
          uninvitedFriends: top,
          invitedFriends: bottom
        })
      }
    })
  }

  removeFromRoom(friend) {
    let arr = [...this.state.invitedFriends];
   arr.forEach((e, i) => {
     if (friend === e) {
       var top = [...this.state.uninvitedFriends]
       var bottom = [...this.state.invitedFriends]
       var bottomSplice = bottom.splice(i, 1);
       top.push(bottomSplice[0]);
       this.setState({
         uninvitedFriends: top,
         invitedFriends: bottom
       })
     }
   })
 }



  render() {
    console.log('all homeies', this.props.allhomies);
    for (var i = 0; i < this.props.allhomies.length; i++) {
      if (!this.state.invitedFriends.includes(this.props.allhomies[i].user_id) && !this.state.uninvitedFriends.includes(this.props.allhomies[i].user_id)) {
        this.setState({
          uninvitedFriends: [...this.state.uninvitedFriends, this.props.allhomies[i].user_id]
        })
      }
    }

    const displayFriends = this.props.allhomies.map((e, i) => {
      if (this.state.uninvitedFriends.includes(e.user_id)) {
        console.log(e.user_id)
        return (
          <div key={i} className="friendsAvatar">
            <div>
              <img alt="user" className="friendsPic" src={e.profile_picture} />
            </div>
            <div className="friendsName">
              {e.first_name} {e.last_name}
            </div>
            <div className="friendmailer">
              <button type="" className="add_to_room_button" onClick={() => {
                console.log(e.user_id)
                console.log(this.state.invitedFriends)
                this.addToInvited(e.user_id)
              } }>
                Add to Room
              </button>
            </div>
          </div>
        );
  
      }
    });
    const invitedFriends = this.props.allhomies.map((e, i) => {
      if (this.state.invitedFriends.includes(e.user_id)) {
        console.log(e.user_id)
        return (
          <div key={i} className="friendsAvatar">
            <div>
              <img alt="user" className="friendsPic" src={e.profile_picture} />
            </div>
            <div className="friendsName">
              {e.first_name} {e.last_name}
            </div>
            <div className="friendmailer">
              <button type="" className="add_to_room_button" onClick={ () => this.removeFromRoom(e.user_id) }>
                Remove from Room
              </button>
            </div>
          </div>
        );
  
      }
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
                Submit
              </button>
            </div>
            <div className="friends_modal_list">{displayFriends}
            <div>
              <span className=''>Room: </span> <span className=''>Friends: </span>
              </div> 
              <div>
              {invitedFriends}
              </div> 
            </div>
            <div>
              <button type='' className=''>
              Send Invites</button>
            <button
              type=""
              className="close_modal_button"
              onClick={() => this.props.toggleModal()}
            >
              Close
            </button>
            </div> 
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
