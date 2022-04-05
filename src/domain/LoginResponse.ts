import { UserTypes } from './RegisterUser';

export interface LoginResponse {
    username: string;
    userType: UserTypes;
}
