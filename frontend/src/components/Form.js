import { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import ChipInput from "material-ui-chip-input";
import { makeStyles } from "@material-ui/core/styles";
import { createPost, updatePost } from "../actions/posts";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));

const Form = ({ user, currentId, setCurrentId }) => {
  const classes = useStyles();
  const [postData, setPostData] = useState({
    title: "",
    body: "",
    tags: [],
    selectedFile: "",
    token: "",
  });
  const post = useSelector(state =>
    currentId ? state.posts.find(result => result._id === currentId) : null
  );
  const dispatch = useDispatch();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", body: "", tags: [], selectedFile: "" });
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createPost({ ...postData, name: user?.user.name })
      );
      clear();
    } else {
      dispatch(
        updatePost(currentId, {
          ...postData,
          name: user?.user.name
        })
      );
      clear();
    }
  };

  const handleAddChip = tag => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = chipToDelete => {
    setPostData({
      ...postData,
      tags: postData.tags.filter(tag => tag !== chipToDelete),
    });
  };
  if (!user) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please sign in to publish your own post and like other's posts.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post?.title}"` : "Publishing a Post"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={e => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="body"
          variant="outlined"
          label="Body"
          fullWidth
          multiline
          rows={4}
          value={postData.body}
          onChange={e => setPostData({ ...postData, body: e.target.value })}
        />
        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={chip => handleAddChip(chip)}
            onDelete={chip => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
