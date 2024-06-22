import React, { FC } from "react";
import { taskService } from "../../api/services/taskService";
import { LoaderFunctionArgs } from "react-router-dom";
import type { Task } from "../../shared/interfaces/Task";

type Params = {
    id: number
}

export const loader: ({params}: LoaderFunctionArgs<{params: Params}>) => Promise<Task> = async ({params}) =>  {
    const task = await taskService.getTask(Number(params.id))
    return task
}

export const TaskComponent:FC = () => {
    return (
        <div>

        </div>
    )
}