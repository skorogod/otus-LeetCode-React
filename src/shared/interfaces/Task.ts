import type { Level } from "./Level";

export interface Task {
    id: number;
    title: string;
    description: string;
    level: Level;
    tags: string[];
    links: string[];
}