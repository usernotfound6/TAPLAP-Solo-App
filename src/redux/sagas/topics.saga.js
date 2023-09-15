import { takeEvery, put, takeLatest } from 'redux-saga/effects';
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

function* editTopic(action) {
    
    try {
        yield axios.put(`/api/edit/${action.payload}`)
        console.log('topic to edit:', `${action.payload}`);
        yield put({ 
            type: 'FETCH_MY_TOPICS', 
        });

    } catch {
        console.log('edit topic error');
    }

}
function* fetchMyTopics() {
    // Get YOUR topics from the DB
    try {
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        
      const response = yield axios.get(`/api/mytopics/`, config); // Use backticks for template literals
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

function* fetchAllComments(action) {
    // get all topics from the DB
    try {
        const topics = yield axios.get(`/api/comments/${action.payload}`);
        console.log('get all comments:', topics.data);
        yield put({ type: 'SET_COMMENTS', payload: topics.data });

    } catch {
        console.log('get all topics error');
    }
        
}

function* addComment(action) {
    // adding users topic
    try {
        console.log('erroryooooo', action.payload)
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        };
        yield axios.post('/api/comments/', action.payload, config);
    } catch (error) {
        console.log('Error with adding comment', error)
    }
}

function* deleteTopic(action) {
    console.log('inside deletetopic', action.payload)
    try {
        yield axios.delete(`/api/topics/${action.payload}`)
        yield put({ 
            type: 'FETCH_MY_TOPICS', 
        });

    } catch {
        console.log('delete topic error');
    }

}



function* TopicsSaga() {
    yield takeEvery('FETCH_TOPICS', fetchAllTopics);
    yield takeEvery('ADD_TOPIC', addTopic);
    yield takeEvery('FETCH_COMMENTS', fetchAllComments);
    yield takeEvery('ADD_COMMENT', addComment);
    yield takeEvery('FETCH_MY_TOPICS', fetchMyTopics);
    yield takeEvery('FETCH_IND_TOPIC', fetchIndTopic);
    yield takeLatest('DELETE_TOPIC', deleteTopic);
    yield takeLatest('EDIT_TOPIC', editTopic);
}

export default TopicsSaga;