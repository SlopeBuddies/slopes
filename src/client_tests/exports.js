const getAllFriendsJson = require('./getAllFriends')
const getAllChannelsJson = require('./getAllChannels')
module.exports = {
addToInvited: (friend) => {
    let uninvitedFriends = [1,4,3,8,6];
    let invitedFriends = [];
    let arr = [...uninvitedFriends];
    var bottom = [];
    var top = []
    arr.forEach((e, i) => {
        if (friend === e) {
            top = [...uninvitedFriends]
            bottom = [...invitedFriends]
        var topSplice = top.splice(i, 1);
        bottom.push(topSplice[0]);
    }
    })
                return {
                    invited: bottom,
                    uninvited: top
                }
    },
    getAllFriends: (id) => {
        var filtered = [...getAllFriendsJson]
        getAllFriendsJson.forEach((e, i) => {
            if(!e.location_visible){
            filtered[i].current_mtn = ''
            }
        });
        return filtered
    },
    getAllChannels: (name) => {
        var channels = getAllChannelsJson
        return getAllChannelsJson.filter((e, i) => {
            if(e.room_name.includes(name)){
                return e 
            }
        })
      }

}