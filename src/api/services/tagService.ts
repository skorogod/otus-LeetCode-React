import { Tag } from "../../shared/interfaces/Tag";
import { BaseService } from "./baseService";

export class TagService extends BaseService {
    private static instance: TagService | null

    constructor() {
        super()

        if (!TagService.instance) {
            TagService.instance = this
        }
        
        return this
    }

    async getTags(): Promise<Tag[]> {
        const response = await fetch('http://localhost:3000/tags', {
            headers: {
                'Authorization': `Bearer ${this.userToken}`
            }
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return await response.json()
    }

    async getTag(id: number):Promise<Tag> {
        const response = await fetch(`http://localhost:3000/tags/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.userToken}`
            }
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    }

}

export const tagService = new TagService()