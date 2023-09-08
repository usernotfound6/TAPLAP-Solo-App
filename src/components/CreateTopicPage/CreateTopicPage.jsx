import React from 'react';
import { useState } from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function CreateTopicPage() {

  const [topic, setTopic] = useState('');

  return (
    <form>
    <div className="container">
      <h2>Whats On Your Mind?</h2>
      <input 
      placeholder='Topic Title'
      type="text" />
      </div>

      <div>
      <textarea 
      placeholder='Can You Elaborate?'
      type="text" />
      </div>

      <button>share!</button>
  </form>
  );
}

export default CreateTopicPage;
