import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost} from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();


  const user = JSON.parse(localStorage.getItem("profile"));

  

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const imagePostData = (e) => {

    // const imageObject = {
    //   image: e.target.files[0],
    // };

    // const imageUrl = await imagePost(imageObject);

    setPostData({ ...postData, selectedFile:e.target.files[0] });






  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(postData)


    // console.log(user?.result?.name)
    

    
    // console.log(postData)


    // console.log({ ...postData, 'name': user?.result?.name })

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, 'name': user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, 'name': user?.result?.name }));
    }
    clear();
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (currentId) {
  //     dispatch(
  //       updatePost(currentId, { ...postData, name: user?.result?.name })
  //     );
  //   } else {
  //     dispatch(createPost({ ...postData, name: user?.result?.name }));
  //   }
  //   clear();
  // };

  if (!user) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        action=""
        autoComplete="off"
        noValidate
        className={`${classes.root}${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a memory
        </Typography>
        <TextField
          className={classes.TextField}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value })
          }}
        ></TextField>
        <TextField
          className={classes.TextField}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>{
            setPostData({ ...postData, message: e.target.value })
          }}
        ></TextField>
        <TextField
          className={classes.TextField}
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>{
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }}
        ></TextField>
        <div className={classes.fileInput}>
          <label>Choose Image</label>
          <input
            type="file"
            name="post-image"
            accept="image/*"
            onChange={imagePostData}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
