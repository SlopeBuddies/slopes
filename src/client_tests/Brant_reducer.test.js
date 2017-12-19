const testFunctions = require('./exports');


describe('Brants unit tests', ()=>{
    test('test if filtered exists', () => {
        let result = testFunctions.getAllFriends(4);
        expect(result).not.toEqual(undefined);
    })
    test('recieve array',()=>{
        let result = testFunctions.getAllFriends(4)

        expect(result.constructor).toEqual(Array);
    })
    test('test if 4th object in array has "" as home mountain', ()=>{
        let result = testFunctions.getAllFriends(4)

        expect(result[3].current_mtn).toEqual("")
    })
    test('secound object current_mtn = devmountain', ()=>{
        let result = testFunctions.getAllFriends(4)

        expect(result[1].current_mtn).toEqual('DevMountain')
    })
    test('test every index for an object',()=>{
        let result = testFunctions.getAllFriends(4);
        let obj = true
        result.forEach((e)=>{
            if(e.constructor !== Object){
                obj = false;
            }
        })

        expect(obj).toEqual(true);
    })
    
})

