import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { baseReducer } from './baseSlice'
import { tasksReducer } from './tasksReducer'
import { usersReducer } from './usersReducer'

export const store = configureStore({
  reducer: combineReducers({
    base: baseReducer,
    tasks: tasksReducer,
    users: usersReducer
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch