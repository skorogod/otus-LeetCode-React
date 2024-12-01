import React, { FC } from "react";
import { taskService } from "../../api/services/taskService";
import { ActionFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";
import type { Task } from "../../shared/interfaces/Task";

import './EditTask.css'
import { Level } from "../../shared/interfaces/Level";

type ActionParams = {
    id: number
}

export async function action({request,params} : ActionFunctionArgs<{request: Request, params: ActionParams}>) {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    await taskService.updateTask(Number(params.id), updates)
}

export const EditTask:FC =() => {
    const task = useLoaderData() as Task;
    const navigate = useNavigate()

    const levels: Level[] = [
        {
            id: 1,
            title: 'Легко'
        },
        {
            id: 2,
            title: 'Средне'
        },
        {
            id: 3,
            title: 'Сложно'
        }
    ]

    return (
        <div className="edit-task-container">
            <Form className="form" method="post" id="contact-form">
                <div className="edit-task-form__body">
                    <label htmlFor="username">Title:</label>
                    <input
                        id="title"
                        placeholder="title"
                        aria-label="title"
                        type="text"
                        name="title"
                        defaultValue={task.title}
                    />
                    <div className="form__field-group">
                        <label htmlFor="task-type">Task type:</label>
                        <select name="task-type" id="task-type">
                            <option value="">no selected</option>
                        </select>
                    
                        <label htmlFor="task-type">Level:</label>
                        <select name="task-type" id="task-type">
                            <option value="">no selected</option>
                        </select>
                    </div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        rows={20}
                        cols={100}
                        id="description"
                        placeholder="description"
                        aria-label="description"
                        name="email"
                        defaultValue={task.description}
                    />
                    <p className="form__buttons">
                        <button type="submit">Save</button>
                        <button onClick={
                            () => {
                                navigate(-1)
                            }
                        } type="button">Cancel</button>
                    </p>
                </div>
            </Form>
        </div>
    )
}