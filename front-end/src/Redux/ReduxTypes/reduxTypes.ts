// import { optionListType } from "../../Types/Types";

export const LOADING = "LOADING";
export const SUCCESS = "SUCCESS";
export const FAILED = "FAILED";

export interface infoLoginType {
    email: string;
    password: string;
}

export interface userLoginStatus {
    statusLogin: string;
    statusUpdateInfo: string;
    statusUserData: string;
}

export interface userLoginInfo {
    infoLogin: {
        message: string;
        login: boolean;
        rows: any;
    };
    infoUpdate: {
        message: string;
        rows: any;
        error: any;
    };
    userData: {
        message: string;
        data: [
            {
                Name: string;
                Surname: string;
                active: number;
                date_of_birth: string;
                id: number;
                polls: string;
                type_of_account: number;
                user_id: string;
            }
        ];
        error: any;
    };
}
export interface infoUpdate {
    userId: string;
    name: string;
    surname: string;
    dateOfBirth: string;
}

export interface pollsData {
    name: string;
    question: string;
    number: number;
    // option: string[]
    option: string
    // option: optionListType[]
    // option: { name: string; color: string };
    id: string;
}

export interface postPollsInfo {
    statusPolls: string;
    infoPolls: {
        message: string;
        rows: string;
        error: string;
    },
}

export interface registerInfo {
    registerStatus: string
    registerInfo: {
        message: string,
        row: string,
        error: string,
    }
}

export interface getPollsInfo {
    statusGetPolls: string
    infoGetPolls: {
        message: string,
        data: [{
            id: number,
            creator_id: string,
            name: string,
            question: string,
            number: number,
            options: string
        }]
    }
}