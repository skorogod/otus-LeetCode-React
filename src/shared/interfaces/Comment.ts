import type { Task } from "./Task";
import type { User } from "./User";

export interface Comment {
    id: number;
    date: string,
    text: string;
    task: Task;
    user: User;
}