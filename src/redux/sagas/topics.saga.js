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
function* getTopicsSaga() {
    yield takeEvery('FETCH_TOPICS', fetchAllTopics);
}

export default getTopicsSaga;