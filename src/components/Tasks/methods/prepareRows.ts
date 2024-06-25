import { Task } from "../../../shared/interfaces/Task";
import { Tag } from "../../../shared/interfaces/Tag";

export type TaskRow = {
    id: number,
    title: string,
    solution: string,
    level: string,
    tags: {task: Task}
}

export const prepareRows = (tasks: Task[]) => {
    const rows: TaskRow[] = [];

    tasks.forEach(el => {
        rows.push({
            id: el.id,
            title: el.title,
            solution: `/tasks/${el.id}`,
            level: el.level.title,
            tags: {task: el}
        })
    })

    return rows
}