import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { select } from 'redux-saga/effects';


function* fetchAllTopics() {
    // get all topics from the DB
    try {
        const topics = yield axios.get('/api/topics');
        console.log('get all:', topics.data);
        yield put({ type: 'SET_TOPICS', payload: topics.data });

    } catch {
        console.log('get all topics error');
    }
        
}


function* fetchIndTopic(action) {
    // get all topics from the DB
    try {
        const indtopic = yield axios.get(`/api/topics/${action.payload}`);
        console.log('get individual topic:', indtopic.data);
        yield put({ type: 'SET_IND_TOPIC', payload: indtopic.data[0] });

    } catch {
        console.log('get individual topic error');
    }
        
}
function* fetchMyTopics() {
    // Get YOUR topics from the DB
    try {
        const user = yield select(state => state.user);
        const userId = user.id;
      const response = yield axios.get(`/api/topics/${userId}`); // Use backticks for template literals
      console.log('get your topics:', response.data);
      yield put({ type: 'SET_MY_TOPICS', payload: response.data });
    } catch (error) {
      console.error('Error fetching your topics:', error);
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
    yield takeEvery('FETCH_IND_TOPIC', fetchIndTopic);
}

export default TopicsSaga;