import { BaseState } from "./interfaces/BaseState";
import { tagService } from "../api/services/tagService";
import { createAppSlice } from "./thunk/thunk";
import { error } from "console";
import { action } from "../components/EditUser/EditUser";

const initialState: BaseState = {
    loading: false,
    levels: [],
    tags: [],
    taskTypes: []
}

export const baseSlice = createAppSlice({
    name: 'base',
    initialState,
    reducers: (create) => ({
        fetchTags: create.asyncThunk(
            async () => {
                const tags = await tagService.getTags()
                return {tags}
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
                    state.tags = action.payload.tags
                }
            }
        )
    }) 
})

export const baseActions = baseSlice.actions
export const baseReducer = baseSlice.reducer