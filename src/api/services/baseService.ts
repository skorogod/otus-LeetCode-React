export class BaseService {
    userToken: string | null
    constructor() {
        this.userToken = localStorage.getItem('userToken')
    }
}

