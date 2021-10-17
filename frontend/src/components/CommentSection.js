import { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { commentPost } from "../actions/posts";

const useStyles = makeStyles(theme => ({
  commentsOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  commentsInnerContainer: {
    height: "200px",
    overflowY: "auto",
    marginRight: "30px",
  },
}));
const CommentSection = ({ post, user }) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const handleComment = async () => {
    const otherComments = await dispatch(
      commentPost(post._id, `${user?.user.name}: ${comment}`)
    );
    setComment("");
    setComments(otherComments);
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment-
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment.length}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
