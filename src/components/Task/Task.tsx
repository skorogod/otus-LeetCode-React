import React, { FC, useState } from "react";
import { taskService } from "../../api/services/taskService";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import type { Task } from "../../shared/interfaces/Task";
import ReactCodeMirror from "@uiw/react-codemirror";
import "./Task.css"
import { Form } from "react-router-dom";

type Params = {
    id: number
}

export const loader: ({params}: LoaderFunctionArgs<{params: Params}>) => Promise<Task> = async ({params}) =>  {
    const task = await taskService.getTask(Number(params.id))
    return task
}

export const TaskComponent:FC = () => {
    const task = useLoaderData() as Task
    const [code, setCode] = useState('')

    return (
        <div className="task-container">
            <div>
                <h1 className="">{task.title}</h1>
                <p className="">{task.description}</p>
            </div>
            <div className="user-actions">
                <Form action="edit">
                    <button type="submit">Edit</button>
                </Form>
                <Form
                    method="post"
                    action="destroy"
                    onSubmit={(event) => {
                    if (
                        !confirm(
                        "Please confirm you want to delete this record."
                        )
                    ) {
                        event.preventDefault();
                    }
                    }}
                >
                    <button type="submit">Delete</button>
                </Form>
             </div>
            <ReactCodeMirror
                style={{border: '1px solid black'}}
                height="400px"
                value={code}
                onChange={setCode}
            />
            <div>
                <button type="submit">Submit</button>
            </div>
        </div>
    )
}