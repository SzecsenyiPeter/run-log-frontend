export enum UserTypes {
    COACH,
    ATHLETE,
}

export interface RegisterUser {
    username: string;
    password: string;
    userType: UserTypes;
}
