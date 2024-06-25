import { Level } from "../../shared/interfaces/Level"
import { TaskType } from "../../shared/interfaces/TaskType"
import { Tag } from "../../shared/interfaces/Tag"

export type BaseState = {
    loading: boolean,
    levels: Level[],
    taskTypes: TaskType[],
    tags: Tag[]
}