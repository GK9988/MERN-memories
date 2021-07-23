import * as api from '../api'
import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes'

// Action Creators

export const getPosts = ()  => async (dispatch) => {

    try {
        const {data} = await api.fetchPosts()

        dispatch({type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const imagePost = async (imgObject) => {
    const fObject = new FormData();
    fObject.append(
        "post-image",
        imgObject.image
    );

    
    const {data} = await api.postImage(fObject);
    return data
    

}

// export const createPost = (post) => async (dispatch) => {
//     try {
//         const {data} = await api.createPost(post)

//         dispatch({type: CREATE, payload: data})

//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
// }

export const createPost = (post) => async (dispatch) => {


    console.log(post)
    let formObj = new FormData()
    formObj.append(
        'post-image', 
        post.selectedFile
        );
    formObj.append(
        "name", 
        post.name
        );
    formObj.append(
        "message", 
        post.message
        );
    formObj.append(
        "title", 
        post.title
        );
    formObj.append(
        "tags", 
        post.tags
        );
    // console.log(formObj.entries())

    // const {data} = await api.createPost(post)
    try {
        const {data} = await api.createPost(formObj)

        dispatch({type: CREATE, payload: data})

        // console.log(data)
    } catch (error) {
        console.log(error)
    }
    



}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post)

        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)

        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id)

        dispatch({type: LIKE, payload: data})
    } catch (error) {
        console.log(error);
    }
}