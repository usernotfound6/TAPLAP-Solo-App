import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';

function IndTopicPage() {

    const params = useParams();
    const dispatch = useDispatch();
    // const history = useHistory();
    const indtopic = useSelector(store => store.indtopic);
    console.log('indtopic:', indtopic);

    useEffect(() => {
        dispatch({ type: 'FETCH_IND_TOPIC', payload: params.id });
    }, [dispatch, params.id]);

    return (
        <main>
            <section className="indtopic">
            <h1>{indtopic.topic_name}</h1>
            <p>{indtopic.topic_description}</p>
            </section>
            <textarea placeholder="add comment..."></textarea>
            <button>share comment!</button>
        </main>
    )
}

export default IndTopicPage;