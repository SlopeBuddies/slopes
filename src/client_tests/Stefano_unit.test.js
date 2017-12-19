const testExports = require('./exports')

describe('Stefanos friggin tests', () => {
    test('forObject', ()=> {
        let result = testExports.addToInvited(4)
        expect(result.constructor).toEqual(Object)
    })
    test('invited exists in Object', () => {
        let result = testExports.addToInvited(4)
        expect(result.invited).not.toEqual(undefined)
    })
    test('invited is array', ()=>{
        let result = testExports.addToInvited(4)
        expect(result.invited.constructor).toEqual(Array)
    })
    test('uninvited exists in Object', () => {
        let result = testExports.addToInvited(4)
        expect(result.invited).not.toEqual(undefined)
    })
    test('uninvited is array', ()=>{
        let result = testExports.addToInvited(4)
        expect(result.uninvited.constructor).toEqual(Array)
    })
}) 