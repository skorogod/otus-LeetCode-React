import { Task } from "../../shared/interfaces/Task";
import { BaseState } from "./BaseState";

export interface TasksState {
    loading: boolean,
    tasks: Task[]
}