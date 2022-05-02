import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL

const initialState = {
	products: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
}

export const getProducts = createAsyncThunk(
	'product/getProducts',
	async (_, thunkAPI) => {
		try {
			const response = await axios.get(`${ROOT_URL}`)
			return response.data
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const addComment = createAsyncThunk(
	'product/addComment',
	async (commentData, thunkAPI) => {
		try {
			console.log(commentData)
			const [id, comments] = commentData
			const commentsPayload = { ...product.comments, comments }
			console.log(id)
			const response = await axios.put(`${ROOT_URL}/${id}`, commentsPayload)
			response.data
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.products = action.payload
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(addComment.pending, (state) => {
				state.isLoading = true
			})
			.addCase(addComment.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.products = action.payload
			})
			.addCase(addComment.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

export const { reset } = productSlice.actions
export default productSlice.reducer
