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
import { blue } from "@mui/material/colors";

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
    <><Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Card elevation={24} sx={{  backgroundColor: "beige",borderRadius: 5, p: 4, textAlign: "center", marginBottom: 4, marginTop: 3 }}>
      <CardContent sx={{  display: 'flex', backgroundColor: "beige", padding: -30, marginTop: -6.5, marginBottom: -7.5, maxWidth: 330}}>
        <h1>
          What's On Your Mind?
        </h1>
        </CardContent>
      </Card>

      <Card elevation={20} sx={{ 
        backgroundColor: "beige",
         marginRight: 10, 
         marginLeft: 10,  
         marginBottom: 4,
         minHeight: 200,
         minWidth: 400,
         marginTop: 1,
         borderRadius: 4,
         p: 3,
         textAlign: "center"}}> 
        <div>
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
            rows={10}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            sx={{ marginBottom: 2 }} />
        </div>
      </Card>
      <form onSubmit={handleSubmit}>
        <Button onClick={handleSubmit} elevation={24} sx={{ borderRadius: 3, marginTop: 1,  fontSize: "20px", // Increase the font size as needed
          padding: "12px 24px"}}type="submit" variant="contained" color="secondary">
          Share!!
        </Button>
      </form>  
        </Container><>
      </></>
  );
}

export default CreateTopicPage