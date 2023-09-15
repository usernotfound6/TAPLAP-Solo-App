import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
} from "@mui/material";

function CreateTopicPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let newTopic = {
      topic_name: topic,
      topic_description: description,
    };
    dispatch({
      type: "ADD_TOPIC",
      payload: newTopic,
    });
    history.push("/topics");
  };

  return (
    <><Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Card elevation={24} sx={{ borderRadius: 5, p: 4, textAlign: "center", marginBottom: 4, marginTop: -18  }}>
      <CardContent sx={{ padding: -20, marginTop: -6.5, marginBottom: -7.5, maxWidth: 330}}>
        <h1>
          What's On Your Mind?
        </h1>
        </CardContent>
      </Card>

      <Card elevation={20} sx={{ 
         marginRight: 10, // Auto margin on the right side
         marginLeft: 10,  // Auto margin on the left side
         marginBottom: 4,
         minHeight: 500,
         minWidth: 400,
         marginTop: 1,
         borderRadius: 4,
         p: 3,
         textAlign: "center"}}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Topic Title"
            variant="outlined"
            fullWidth
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            sx={{ marginBottom: 2 }} />
          <TextField
            label="Can You Elaborate?"
            variant="outlined"
            fullWidth
            multiline
            rows={17}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            sx={{ marginBottom: 2 }} />
        </form>
      </Card>
    
        <Button elevation={24} sx={{ borderRadius: 3, marginTop: 1,  fontSize: "20px", // Increase the font size as needed
          padding: "12px 24px"}}type="submit" variant="contained" color="secondary">
          Share!
        </Button>
        </Container><>
      </></>
  );
}

export default CreateTopicPage