import { Task } from "../../shared/interfaces/Task";
import { BaseService } from "./baseService";

export type UpdateParams = Omit<Partial<Task>, 'id'>

export class TaskService extends BaseService {
    private static instance: TaskService | null

    constructor() {
        super()

        if (!TaskService.instance) {
            TaskService.instance = this
        }
        
        return this
    }

    async getTasks(): Promise<Task[]> {
        const response = await fetch('http://localhost:3000/tasks', {
            headers: {
                'Authorization': `Bearer ${this.userToken}`
            }
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return await response.json()
    }

    async getTask(id: number):Promise<Task> {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.userToken}`
            }
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    }

    async updateTask(id: number, updates: UpdateParams): Promise<Task> {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.userToken}`
            },
            body: JSON.stringify(updates)
        })
        
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    }
}

export const taskService = new TaskService()