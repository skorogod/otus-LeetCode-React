import { createAppSlice } from "./thunk/thunk";
import { TasksState } from "./interfaces/TasksState";
import { taskService } from "../api/services/taskService";
import { truncateSync } from "fs";
import { error } from "console";
import { action } from "../components/EditUser/EditUser";
import type { UpdateParams } from "../api/services/taskService";

const initialState: TasksState = {
    loading: false,
    tasks: []
}

const tasksSlice = createAppSlice({
    name: 'tasks',
    initialState,
    reducers: (create) => ({
        fetchTasks: create.asyncThunk(async () => {
            const tasks = await taskService.getTasks()
            return {tasks}
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
                state.tasks = action.payload.tasks
            }

        }
    ),
    updateTask: create.asyncThunk(async (props: {id: number, updates: UpdateParams}, {dispatch}) => {
        const task = await taskService.updateTask(props.id, props.updates)
        return {task}
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
            const index = state.tasks.findIndex(el => el.id === action.payload.task.id)
            if (index !== -1)
                state.tasks[index] = action.payload.task
        }
    }
)
})
})

export const tasksActions = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer