import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as React from "react";
import Grid  from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function TopicsPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const topics = useSelector((store) => store.topics);
  console.log("heres the topics", topics);

  useEffect(() => {
    dispatch({ type: "FETCH_TOPICS" });
  }, []);

  
  return (
    //   <div>
    //     <div className="container">
    //       <h2>Welcome, {user.username}!</h2>
    //       <p>Your ID is: {user.id}</p>
    //       <LogOutButton className="btn" />
    //     </div>

    <main>
      <h1>Topics</h1>
      <section className="topics">
        <Grid container
        xs={12}
        spacing={3}
        columnGap={4}
        rowGap={5}>
        {topics.map((topic) => (
          <Card>
          <div
            key={topic.id}
            onClick={() => history.push(`/indtopic/${topic.id}`)}
          >
            <h1>{topic.topic_name}</h1>
            <p>{topic.topic_description}</p>
            {/* <p>User ID: {topic.user_id}</p> */}
          </div>
          </Card>
        ))}
        </Grid>
      </section>
    </main>
  );
}
export default TopicsPage;
