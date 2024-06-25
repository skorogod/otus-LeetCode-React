import { createAppSlice } from "./thunk/thunk";
import { UsersState } from "./interfaces/UsersState";
import { userService } from "../api/services/userService";
import { truncateSync } from "fs";
import { error } from "console";
import { action } from "../components/EditUser/EditUser";
import type { UpdateParams } from "../api/services/userService";

const initialState: UsersState = {
    loading: false,
    users: []
}

const usersSlice = createAppSlice({
    name: 'users',
    initialState,
    reducers: (create) => ({
        fetchUsers: create.asyncThunk(async () => {
            const users = await userService.getUsers()
            return {users}
        },
        {
            pending: (state) => {
                state.loading = true
            },
            rejected: (state, error) => {
                state.loading = false
            },
            fulfilled: (state, action) => {
                state.loading = false,
                state.users = action.payload.users
            }

        }
    ),
    updateUser: create.asyncThunk(async (props: {id: number, updates: UpdateParams}, {dispatch}) => {
        const user = await userService.updateUser(props.id, props.updates)
        return {user}
    },
    {
        pending: (state) => {
            state.loading = true
        },
        rejected: (state, error) => {
            state.loading = false
        },
        fulfilled: (state, action) => {
            state.loading = false
            const index = state.users.findIndex(el => el.id === action.payload.user.id)
            if (index !== -1)
                state.users[index] = action.payload.user
        }
    }
)
})
})

export const usersActions = usersSlice.actions
export const usersReducer = usersSlice.reducer