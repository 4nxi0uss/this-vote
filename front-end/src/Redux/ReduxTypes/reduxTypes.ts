export const LOADING_STATUS = "LOADING";
export const SUCCESS_STATUS = "SUCCESS";
export const FAILED_STATUS = "FAILED";
export const IDLE_STATUS = "IDLE";


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
                name: string;
                surname: string;
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
    option: object
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

export interface putPollsInfo {
    statusPutPoll: string,
    infoPutPoll: {
        message: string,
        error: string
    },
}

export interface putOptionType {
    id: number,
    options?: string,
    optionId: number
}

export interface registerDataType {
    email: string,
    password: string
}

export interface deletingDataType {
    creatorId: string,
    id: number
}


export interface deletingInfo {
    deletingStatus: string
    deletingInfo: {
        message: string,
        error: string,
    }
}

export interface editSlice {
    isOpenEdit: boolean
}