import type { Level } from "./Level";
import { Tag } from "./Tag";
import { TaskType } from "./TaskType";

export interface Task {
    id: number;
    title: string;
    description: string;
    level: Level;
    type: TaskType,
    tags: Tag[];
    links: string[];
}