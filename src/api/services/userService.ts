import { User } from "../../shared/interfaces/User";
import { BaseService } from "./baseService";

export type UpdateParams = Omit<Partial<User>, 'id'>

export class UserService extends BaseService{
    private static instance: any
    constructor() {
        super()
        if (!UserService.instance) {
            UserService.instance = this
        }
        return this
    }

    async getUsers(): Promise<User[]> {
        const response = await fetch('http://localhost:3000/users',
            {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            }
        )
        
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    }

    async getUser(id: number): Promise<User> {
        const response = await fetch(`http://localhost:3000/users/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            }
        )
        
        if (!response.ok)
            throw new Error (response.statusText)

        return await response.json()
    }

    async updateUser(id: number, updates: UpdateParams): Promise<User> {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.userToken}`
            },
            body: JSON.stringify(updates)
        })

        if (!response.ok) {
            throw  new Error(response.statusText)
        }

        return await response.json()
    }
}

export const userService = new UserService();