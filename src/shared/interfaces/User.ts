import type { Task } from "./Task";

export interface User {
    id: number;
    email: string;
    image: string,
    username: string;
    views: number;
    solvedTasks: Task[];
    discuss: number;
    reputation: number;
    favorite: boolean
  };