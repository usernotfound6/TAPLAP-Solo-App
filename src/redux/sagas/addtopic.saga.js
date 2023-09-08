import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* createTopic(action) {
    try {
        yield axios.post('/createtopic', action.payload)
        yield put({ type: 'FETCH_TOPICS' })
    } catch (err) {
        console.log(err)
    }
}

export default createTopic;