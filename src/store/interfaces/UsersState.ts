import { User } from "../../shared/interfaces/User";
import { BaseState } from "./BaseState";

export interface UsersState {
    loading: boolean,
    users: User[]
}