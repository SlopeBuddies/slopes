const tests = require('./exports')

describe("removing friends from array actually works", () => {
    test('for object', () => {
        let result = tests.removeFromRoom(6)
        expect(result.constructor).toEqual(Object)
    })
    test('removed exists in object', () => {
        let result = tests.removeFromRoom(6)
        expect(result.uninvitedFriends).not.toEqual(undefined)
    })
    test('removed item is a matches param', () => {
        let result = tests.removeFromRoom(6)
        expect(result).not.toEqual(6)
    })
    test('remove has length > 0', () => {
        let result = tests.removeFromRoom(6)
        expect(result.length).not.toEqual(0)
    })
    test('removed item is an array,', () => {
        let result = tests.removeFromRoom(6)
        expect(result.uninvitedFriends.constructor).toEqual(Array)
    })
})