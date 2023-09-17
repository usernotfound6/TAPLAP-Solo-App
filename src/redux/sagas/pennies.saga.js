import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchIndPennies(action) {
    // get individual pennies from the DB
    try {
        const pennies = yield axios.get(`/api/pennies/${action.payload}`);
        console.log('get individual comment pennies:', pennies.data);
        yield put({ type: 'SET_PENNIES', payload: pennies.data});

    } catch {
        console.log('get individual topic pennies error');
    }
        
}

function* PenniesSaga() {
yield takeEvery('FETCH_PENNIES', fetchIndPennies);

}

export default PenniesSaga;