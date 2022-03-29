export enum UserTypes {
    ATHLETE,
    COACH
}

export interface RegisterUser {
    username: string;
    password: string;
    userType: UserTypes;
}
