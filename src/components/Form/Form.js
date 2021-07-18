import React, {  useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost, imagePost } from "../../actions/posts";



const Form = ({currentId, setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();


  const clear = () => {
    setCurrentId(null)
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    })
  };

  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null )

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const imagePostData = async (e) => {
    const imageObject = {
      image: e.target.files[0]
    }

    const imageUrl = imagePost(imageObject)

    imageUrl.then((data) => {
      setPostData({ ...postData, selectedFile: data })
    })

    // console.log(imagePost(imageObject))

    // console.log(imgURL)

    // return null

    // setPostData({ ...postData, selectedFile: imgUrl })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentId) {
      dispatch(updatePost(currentId, postData))
      
    } else {

      dispatch(createPost(postData));
      
    }
    clear()

  };


  return (
    <Paper className={classes.paper}>
      <form
        action=""
        autoComplete="off"
        noValidate
        className={`${classes.root}${classes.form}`}
        onSubmit={handleSubmit}

      >
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a memory</Typography>
        <TextField
          className={classes.TextField}
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        ></TextField>
        <TextField
          className={classes.TextField}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        ></TextField>
        <TextField
          className={classes.TextField}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        ></TextField>
        <TextField
          className={classes.TextField}
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        ></TextField>
        <div className={classes.fileInput}>
          <label>Choose Image</label>
          <input type="file" name="post-image" accept="image/*" onChange={imagePostData} />
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
