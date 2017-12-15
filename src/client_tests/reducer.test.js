// const reducer = require('../ducks/reducer');

// describe("Brant's tests", ()=>{
//     test('')
// })
module.exports = {
    geberateRoomId: function() {
       let roomId = Math.floor(Math.random() * 2000)
       return roomId;
    },

    greeting: function(name) {
        return `Hello ${name}`;
    },

    addFriendsToRoom: function(id) {
        let friendInRoom = [];
        return friendInRoom.push(id);
    },

    removeFromRoom: function(array, id) {
        let array = [1, 2, 3, 4, 5, 6 ,7 ,8, 9];
        let id = 4;
        return array.splice()
    },

    mapArray: function() {

    }
}


