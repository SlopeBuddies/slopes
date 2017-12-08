import {createStore, applyMiddleware} from 'redux';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io'
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './ducks/reducer.js';

const socket = io();

const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

export default createStore(reducer, 
    applyMiddleware(
        promiseMiddleware(),
        socketIoMiddleware
    )
);
