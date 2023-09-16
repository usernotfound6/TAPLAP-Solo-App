import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Card from "@mui/material/Card";
import {
  CardContent,
  Paper,
  Typography,
  TextareaAutosize,
  CardActions,
  Button,
  styled,
} from "@mui/material";

function MyTopicsPage() {
  // const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // const edittopic = useSelector((store) => store.edittopic);
  const history = useHistory();
  const mytopics = useSelector((store) => store.mytopics);
  console.log("heres my topics", mytopics);
//  console.log("topic clicked:", edittopic);
  useEffect(() => {
    dispatch({ type: "FETCH_MY_TOPICS" });
  }, []);

  // const handleEditClick = () => {
 
  //   // console.log(e)
  //   dispatch({type:'SET_EDIT_TOPIC', payload: mytopics.id})
  //   history.push('/edit')
  // }

  return (
    //   <div>
    //     <div className="container">
    //       <h2>Welcome, {user.username}!</h2>
    //       <p>Your ID is: {user.id}</p>
    //       <LogOutButton className="btn" />
    //     </div>

    <main>
      <div className="indTopicCard">
        <Card 
          elevation={24}
          sx={{
            backgroundColor: "beige",
            maxHeight: 70,
            maxWidth: 205,
            
            borderRadius: 3,
            marginBottom: 4,
            marginTop: 3,
          }}
        >
          <CardContent sx={{ marginTop: -3}}>
            <div className="centered-content">
              <h1>My Topics:</h1>
            </div>
          </CardContent>
        </Card>
      </div>
      <section className="mytopics">
        {mytopics.map((mytopic) => (
          <Card key={mytopic.id} elevation={24} sx={{ backgroundColor: "beige", marginBottom: 5, borderRadius: 4 }}>
            <CardContent sx={{ padding: -4, marginLeft: 1.5, marginTop: -4, marginBottom: 1 }}>
              <div>
                <h1>{mytopic.topic_name}</h1>
                <p>{mytopic.topic_description}</p>
              </div>
            </CardContent>
            <CardActions sx={{ marginBottom: 1, marginLeft: 1.5 }}>
              <Button
                sx={{ marginTop: -3, borderRadius: 1 }}
                variant="outlined"
                color="primary"
                onClick={() => {
                  dispatch({ type: "SET_EDIT_TOPIC", payload: mytopic });
                  history.push(`/edit/${mytopic.id}`);
                }}
              >
                Edit
              </Button>
              <Button
                sx={{ marginTop: -3, borderRadius: 1 }}
                variant="contained"
                color="secondary"
                onClick={() =>
                  dispatch({ type: "DELETE_TOPIC", payload: mytopic.id })
                }
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </section>
    </main>
  );
}

export default MyTopicsPage;