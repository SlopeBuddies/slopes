const tester = require('./exports');

describe("Cody's unit test", () => {
    test('Testing to see if I get back an array', () => {
        var result = tester.getAllChannels('Cody')
        expect(result.constructor).toEqual(Array)
    })

    test('Testing to see if array has two results', () => {
        var result = tester.getAllChannels('Cody')
        expect(result.length).toEqual(2)
    })

    test('Testing to see if array is empty with bad input', () => {
        var result = tester.getAllChannels('Brant')
        expect(result.length).toEqual(0)
    })

    test('Testing to see if obj has all proper keys', () => {
        var result = tester.getAllChannels('Cody')
        var testing = true
        result.forEach((e,i) => {
            for(key in e) {
                if(!['id', "room_id", "room_name", "room_private"].includes(key)) {
                    testing = false
                }
            }
        })
        expect(testing).toEqual(true)
    })

    test('Testing to see if array only contains objects', () => {
        var result = tester.getAllChannels('Cody')
        var testing = true
        result.forEach((e,i) => {
            if(e.constructor !== Object) {
                testing = false
            }
        })
        expect(testing).toEqual(true)
    })
})