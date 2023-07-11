import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/blogs'

const initialState = {
  blogs: [],
  status: 'idle',
  error: null,
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.blogs = action.payload.sort((a, b) =>
          a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0
        )
      })
      .addCase(getBlogs.rejected, (state) => {
        state.status = 'failed'
        state.error = state.error.message
      })
      .addCase(createBlog.pending, (state) => {
        state.status = 'idle'
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.blogs.push(action.payload)
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.blogs = state.blogs
          .map((blog) =>
            blog.id !== action.payload.id ? blog : action.payload
          )
          .sort((a, b) => (a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0))
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.blogs = state.blogs.filter((blog) => blog.id !== action.meta.arg)
      })
      .addCase(commentBlog.fulfilled, (state, action) => {
        console.log(action.payload)
        state.blogs = state.blogs.map((blog) =>
          blog.id !== action.payload.id ? blog : action.payload
        )
      })
  },
})

export const getBlogs = createAsyncThunk('blogs/getBlogs', async () => {
  try {
    console.log('is it fetching : ')
    const response = await axios.get(baseUrl)
    console.log(response.data)
    return response.data.data
  } catch (err) {
    return err.message
  }
})

export const createBlog = createAsyncThunk(
  'blogs/createBlogs',
  async (newBlog) => {
    try {
      const token = `Bearer ${
        JSON.parse(localStorage.getItem('loggedInUser')).token
      }`
      const config = {
        headers: { Authorization: token },
      }
      const response = await axios.post(baseUrl, newBlog, config)
      return response.data.data
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
)

export const updateBlog = createAsyncThunk('blogs/updateBlog', async (data) => {
  try {
    const response = await axios.put(`${baseUrl}/${data.id}`, data.updatingBlog)
    console.log(data.updatingBlog)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)
    return err.message
  }
})

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
  try {
    const token = `Bearer ${
      JSON.parse(localStorage.getItem('loggedInUser')).token
    }`
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const commentBlog = createAsyncThunk(
  'blogs/commentBlog',
  async (data) => {
    const response = await axios.post(
      `${baseUrl}/${data.id}/comments`,
      data.updatedComment
    )
    console.log(response.data)
    return response.data
  }
)

export default blogSlice.reducer
