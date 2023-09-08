import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


function* fetchAllTopics() {
    // get all movies from the DB
    try {
        const topics = yield axios.get('/api/topics');
        console.log('get all:', topics.data);
        yield put({ type: 'SET_TOPICS', payload: topics.data });

    } catch {
        console.log('get all topics error');
    }
        
}
function* fetchMyTopics() {
    // get all movies from the DB
    try {
        const topics = yield axios.get('/api/topics');
        console.log('get your topics:', topics.data);
        yield put({ type: 'SET_MY_TOPICS', payload: topics.data });

    } catch {
        console.log('get all topics error');
    }
        
}

function* addTopic(action) {
    // adding users topic
    try {
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        };
        yield axios.post('/api/topics', action.payload, config);
    } catch (error) {
        console.log('Error with adding topic', error)
    }
}

function* TopicsSaga() {
    yield takeEvery('FETCH_TOPICS', fetchAllTopics);
    yield takeEvery('ADD_TOPIC', addTopic);
    yield takeEvery('FETCH_MY_TOPICS', fetchMyTopics);
}

export default TopicsSaga;