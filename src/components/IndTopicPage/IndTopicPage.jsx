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
  styled
} from "@mui/material";
import ".//IndTopicPage.css";

const CommentPaper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  maxWidth: 1045,
  minHeight: 30,
}));

const ShareCommentButton = styled(Button)({
  position: "relative",
  bottom: "20px", // Adjust the distance from the bottom as needed
  right: "-280px",  // Adjust the distance from the right as needed
});

function IndTopicPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const indtopic = useSelector((store) => store.indtopic);
  const comments = useSelector((store) => store.comments);

  const [text, setText] = useState("");

  console.log("indtopic:", indtopic);
  console.log("comments:", comments);

  useEffect(() => {
    dispatch({ type: "FETCH_IND_TOPIC", payload: params.id });
    dispatch({ type: "FETCH_COMMENTS", payload: params.id });
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

  //    history.push('/indtopic/:id')

  return (
    <main>
      <section className="indtopic">
        <div className="indTopicCard">
          <Card sx={{ maxWidth: 1045, minWidth: 300, borderRadius: 6 }}>
            <CardContent>
              <div className="centered-content">
                <h1>{indtopic.topic_name}</h1>
                <p>{indtopic.topic_description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <CommentPaper sx={{ maxWidth: 170, minHeight: 10, maxHeight: 100, borderRadius: 2 }}>
      <CardContent>
        <h2>Comments</h2>
      </CardContent>
      </CommentPaper>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <CommentPaper elevation={9}>{comment.text}</CommentPaper>
        </div>
      ))}

      <TextareaAutosize
        onChange={(event) => setText(event.target.value)}
        placeholder="Add comment..."
        color="dark"
        value={text}
        minRows={7}
        style={{ width: "50%" }}
      />
     <ShareCommentButton variant="contained" color="secondary" sx={{
    fontSize: "25px", // Increase the font size as needed
    padding: "12px 24px", // Adjust the padding to make the button larger
  }} onClick={handleComment}>
        Share Comment
      </ShareCommentButton>
    </main>
  );
}
export default IndTopicPage;
