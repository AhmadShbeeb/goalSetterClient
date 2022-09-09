import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// create goal
export const createGoal = createAsyncThunk('goals/createGoal', async (goalData, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user
    return await goalService.createGoal(goalData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// get goal
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user
    return await goalService.getGoals(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
// delete goal
export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (goalId, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user
    return await goalService.deleteGoal(goalId, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(createGoal.pending, state => {
        state.isLoading = true
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload)
      })
      .addCase(getGoals.pending, state => {
        state.isLoading = true
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.goals = action.payload
      })
      .addCase(deleteGoal.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.goals = state.goals.filter(goal => goal._id !== action.payload.id)
      })
  },
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
