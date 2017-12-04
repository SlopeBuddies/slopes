import axios from 'axios';

const initialState = {
    init: 'hello'
}

const TEST = 'TEST'

export function test() {
    return {
        type: TEST,
        payload: 'test'
    }
}

export default (state = initialState, action) => {
  switch (action.type) {

  case TEST:
    return Object.assign({},state, {init: action.payload})

  default:
    return state
  }
}
