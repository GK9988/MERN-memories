import axios from 'axios'
import API from '../url'
import {URL} from '../url'
import {createAPI} from '../url'
axios.defaults.timeout = 50000

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req
})

createAPI.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req
})

export const fetchPosts = () => API.get('/posts')

export const createPost = (newPost) => createAPI({
  method: 'POST',
  data: newPost
})

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const postImage = (formData) => axios({
    method: "POST",
    url: `${URL}/posts/images`,
    data: formData,
  })

export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)