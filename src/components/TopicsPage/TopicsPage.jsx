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
import './/topics.css';

function TopicsPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const topics = useSelector((store) => store.topics);
  console.log("heres the topics", topics);

  useEffect(() => {
    dispatch({ type: "FETCH_TOPICS" });
  }, []);

  const imageStyle = {
    width: "100%", // Adjust as needed
    height: "auto", // Adjust as needed
    position: "relative",
  };

  const textOverlayStyle = {
    position: "absolute",
    top: "50%", // Adjust to position text vertically
    left: "50%", // Adjust to position text horizontally
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0)", // Adjust the background color and opacity
    color: "black", // Text color
    padding: "16px", // Adjust padding as needed
    borderRadius: "8px", // Adjust border radius as needed
    textAlign: "center",
    marginTop: '-20px',
    fontWeight: 'bold',
  };

  const cardStyle = {
    position: "relative",
    borderRadius:'10%',
    backgroundColor: 'transparent',
    maxWidth: '360px'
  };
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
        <Grid 
        alignItems={"center"} 
        container xs={12} spacing={0} columnGap={4} rowGap={5}>
          {topics.map((topic) => (
            <Card className="noOutlineCard"
              key={topic.id}
              onClick={() => history.push(`/indtopic/${topic.id}`)}
              style={cardStyle}
            >
              <img src={require('./grad2.png')} alt={topic.topic_name} style={imageStyle} />
              <CardContent>
                <Typography variant="h5" component="div">
                {topic.topic_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {topic.topic_description}
                </Typography>
                <div style={textOverlayStyle}>
        <Typography variant="h6" style={{ fontSize: '26px', fontWeight: 'bold'  }}>{topic.topic_name} </Typography>
        {/* <Typography variant="body2" style={{ fontSize: '12px' }}>{topic.topic_description}</Typography> */}
      </div>
                {/* <p>User ID: {topic.user_id}</p> */}
              </CardContent>
            </Card>
          ))}
        </Grid>
      </section>
    </main>
  );
}
export default TopicsPage;
