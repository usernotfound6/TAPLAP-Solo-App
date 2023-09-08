import React from "react";
import { useState } from "react";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function CreateTopicPage(props) {

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createTopic(topic, description);
    clearTopicFields();
  };

  const clearTopicFields = () => {
    setTopic("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <h2>Whats On Your Mind?</h2>
        <input
        onChange={(event) => setTopic(event.target.value)} 
        placeholder="Topic Title"
        type="text" />
        
      </div>

      <div>
        <textarea placeholder="Can You Elaborate?" type="text" />
      </div>

      <button>share!</button>
    </form>
  );
}

export default CreateTopicPage;
