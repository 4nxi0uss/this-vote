export const LOADING_STATUS = "LOADING";
export const SUCCESS_STATUS = "SUCCESS";
export const FAILED_STATUS = "FAILED";
export const IDLE_STATUS = "IDLE";

export interface Login {
    email: string;
    password: string;
}

export interface UserData {
    message: string;
    data: [
        {
            name: string;
            surname: string;
            date_of_birth: string;
            id: number;
            type_of_account: string;
            user_id: string;
        }
    ];
};

export interface InfoUpdateUserData {
    userId: string;
    name: string;
    surname: string;
    dateOfBirth: string;
}

export interface PollsData {
    name: string;
    question: string;
    number: number;
    option: object;
    userId: string | boolean;
}

export interface SignUpInfo {
    message: string
}

export interface GetPollsInfo {
    message: string,
    data: [{
        id: number,
        userId: string,
        name: string,
        question: string,
        number: number,
        options: string
    }]
}

export interface SignUpDataType {
    email: string,
    password: string
}

export interface PaginationType {
    page: number,
}

export interface PaginationTypeForUser {
    userId: string,
    page: number,
}

export interface UserLogin {
    login: boolean,
    message: string,
    rows: [{
        id: number,
        user_id: string
    }]
}

export interface GetPolls {
    limit: number,
    message: string,
    numberOfPages: number,
    page: number,
    data: [{
        id: number,
        name: string,
        number: number,
        options: string,
        question: string,
        user_id: string
    }]
}