import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";
import Card from "@mui/material/Card";
import {
  CardContent,
  Paper,
  Typography,
  TextareaAutosize,
  Button,
  styled,
  IconButton,
  ThumbUpIcon
} from "@mui/material";
import ".//IndTopicPage.css";

const CommentPaper = styled(Paper)(({ theme }) => ({
  marginBottom: 18,
  marginLeft: 190,
  marginRight: 30,
  padding: theme.spacing(2),
  maxWidth: 1045,
  minHeight: 30,
}));

const CommentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const CommentUsername = styled("div")({
  flex: 1,
  paddingRight: "10px",
});

const CommentText = styled("div")({
  flex: 3,
});

const ShareCommentButton = styled(Button)({
  position: "absolute",
  marginTop: 35,
  marginLeft: 30,
  marginRight: 60,
});

// Utility function to generate random colors
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function IndTopicPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const indtopic = useSelector((store) => store.indtopic);
  const comments = useSelector((store) => store.comments);
  const pennies = useSelector((store) => store.pennies);
  console.log('pennies', pennies)

  const [text, setText] = useState("");

  // Mapping of usernames to colors
  const usernameColors = {};

  useEffect(() => {
    dispatch({ type: "FETCH_IND_TOPIC", payload: params.id });
    dispatch({ type: "FETCH_COMMENTS", payload: params.id });
    dispatch({ type: "FETCH_PENNIES", payload: params.id });
  }, [dispatch, params.id]);

  const handleComment = async () => {
    let newComment = {
      text: text,
      topic_id: params.id,
    };

    try {
      // Dispatch the "ADD_COMMENT" action
      await dispatch({
        type: "ADD_COMMENT",
        payload: newComment,
      });

      // After the comment is added, fetch the updated comments
      await dispatch({ type: "FETCH_COMMENTS", payload: params.id });

      setText(""); // Clear the text area
    } catch (error) {
      console.error("Error adding or fetching comments:", error);
    }
  };
  

  const handlePenny = async (commentId) => {
    try {
      // Dispatch the "ADD_PENNY" action to like a comment
      await dispatch({ type: "ADD_PENNY"});
      await dispatch({ type: "FETCH_PENNIES", payload: params.id });
    } catch (error) {
      console.error("Error adding penny:", error);
    }
  };

  return (
    <main>
      <section className="indtopic">
        <div className="indTopicCard">
          <Card
            elevation={24}
            sx={{
              backgroundColor: "beige",
              maxWidth: 1045,
              minWidth: 300,
              borderRadius: 6,
              marginBottom: 4,
              marginTop: 2,
            }}
          >
            <CardContent>
              <div className="centered-content">
                <h1>{indtopic.topic_name}</h1>
                <p>{indtopic.topic_description}</p>
                <></>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <CommentPaper
        elevation={20}
        sx={{
          backgroundColor: "beige",
          minWidth: 130,
          marginRight: 90,
          marginLeft: 14,
          maxWidth: 130,
          maxHeight: 60,
          marginBottom: 4,
          borderRadius: 2,
        }}
      >
        <div className="indTopicCard">
          <Typography variant="h5" align="center" fontWeight="bold">
            Comments
          </Typography>
        </div>
      </CommentPaper>

      {comments.map((comment, index) => {
        // Generate a consistent color for each username
        if (!usernameColors[comment.username]) {
          usernameColors[comment.username] = getRandomColor();
        }

        return (
          <div key={comment.id}>
            <CommentPaper sx={{ backgroundColor: "beige" }} elevation={19}>
              <div style={{ display: "flex" }}>
                <div
                  className="comment-username-box"
                  style={{
                    backgroundColor: usernameColors[comment.username],
                    padding: "8px",
                    marginRight: "10px",
                    borderRadius: 9,
                  }}
                >
                  <div    style={{
                    backgroundColor: "white",
                    padding: "5px",
                    borderRadius: 6,
                  }} className="comment-username">{comment.username}</div>
                </div>
                <div className="comment-text">{comment.text}</div>
              </div>
            </CommentPaper>
          </div>
        );
      })}

      <TextareaAutosize
        onChange={(event) => setText(event.target.value)}
        placeholder="Add comment..."
        color="dark"
        value={text}
        minRows={7}
        style={{
          width: "50%",
          marginTop: 20,
          marginLeft: 275,
          borderRadius: 12,
        }}
      />
      <ShareCommentButton
        variant="contained"
        color="secondary"
        sx={{
          fontSize: "20px",
          padding: "26px 24px",
        }}
        onClick={handleComment}
      >
        Share!
      </ShareCommentButton>
    </main>
  );
}
export default IndTopicPage;
