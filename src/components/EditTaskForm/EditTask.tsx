import React, { FC } from "react";
import { taskService } from "../../api/services/taskService";
import { useLoaderData } from "react-router-dom";

type ActionParams = {
    id: number
}

async function action({request,params} : {request: Request, params: ActionParams}) {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    await taskService.updateTask(params.id, updates)
}

export const EditTask:FC =() => {
    const task = useLoaderData()

    return (
        <div>

        </div>
    )
}