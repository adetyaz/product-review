import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const ROOT_URL = 'http://localhost:3004/data'

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

//not working

// export const addComment = createAsyncThunk(
// 	'product/addComment',
// 	async (commentData, thunkAPI) => {
// 		try {
// 			const [id, comments] = commentData
// 			const commentsPayload = {
// 				...title,
// 				comments,
// 			}
// 			console.log(commentsPayload)
// 			const response = await axios.put(
// 				`${ROOT_URL}/${id}`,
// 				commentsPayload.title
// 			)
// 			response.data
// 		} catch (error) {
// 			const message =
// 				(error.response &&
// 					error.response.data &&
// 					error.response.data.message) ||
// 				error.message ||
// 				error.toString()
// 			return thunkAPI.rejectWithValue(message)
// 		}
// 	}
// )

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		reset: (state) => initialState,
		addComment: (state, action) => {
			//not working
			// state.products[id].comments.push(action.payload)
		},
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
	},
})

export const { addComment, reset } = productSlice.actions
export default productSlice.reducer
