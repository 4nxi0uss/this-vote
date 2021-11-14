export const LOADING = 'LOADING'
export const SUCCESS = 'SUCCESS'
export const FAILED = 'FAILED'


export interface userDataType {
    email: string,
    password: string
}

export interface userLoginStatus {
    statusLogin: string
    statusUpdateInfo: string
}

export interface userLoginInfo {
    info: {
        message: string,
        login: boolean
        rows: any
    }
    infoUpdate: {
        message: string,
        rows: any
    }
}
export interface infoUpdate {
    userId: string,
    name: string,
    surname: string,
    dateOfBirth: string
}