import { Task } from "../../../shared/interfaces/Task";

export type TaskRow = {
    id: number,
    title: string,
    solution: string,
    level: string
}

export const prepareRows = (tasks: Task[]) => {
    const rows: TaskRow[] = [];

    tasks.forEach(el => {
        rows.push({
            id: el.id,
            title: el.title,
            solution: '',
            level: el.level.title
        })
    })

    return rows
}