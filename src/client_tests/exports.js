const getAllFriendsJson = require('./getAllFriends')
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

    removeFromRoom(friend) {
        var bottom = [];
        var top = [];
        let uninvitedFriends = [];
        let invitedFriends = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let arr = [...invitedFriends];
       arr.forEach((e, i) => {
         if (friend === e) {
           top = [...uninvitedFriends]
           bottom = [...invitedFriends]
        //    var addUserInfo = [...createdRoomsInfo]
        //    var addRoomInfo = [...requestInfo];
           var bottomSplice = bottom.splice(i, 1);
        //    var userSplice = addUserInfo.splice(i, 1)
        //    var roomSplice = addRoomInfo.splice(i, 1);
           top.push(bottomSplice[0]);


          
         }
       })
       return {
        uninvitedFriends: top,
        invitedFriends: bottom,
        // createdRoomsInfo: addUserInfo,
        // requestInfo: addRoomInfo
      }
    }
}

