import axios from 'axios'
import URL from '../url'
axios.defaults.timeout = 50000

// export const url = 'http://localhost:8000/posts'
// export const url = 'https://memories-project-0101.herokuapp.com/posts'

const url = URL

export const fetchPosts = () => axios.get(url)
// console.log(axios.get(url))

export const createPost = (newPost) => axios.post(url, newPost)

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)

export const deletePost = (id) => axios.delete(`${url}/${id}`)

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)