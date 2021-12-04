export const LOADING = 'LOADING'
export const SUCCESS = 'SUCCESS'
export const FAILED = 'FAILED'


export interface infoLoginType {
    email: string,
    password: string
}

export interface userLoginStatus {
    statusLogin: string
    statusUpdateInfo: string
    statusUserData: string
}

export interface userLoginInfo {
    infoLogin: {
        message: string,
        login: boolean
        rows: any
    }
    infoUpdate: {
        message: string,
        rows: any,
        error: any,
    }
    userData: {
        message: string,
        data: any,
        error: any
    }
}
export interface infoUpdate {
    userId: string,
    name: string,
    surname: string,
    dateOfBirth: string
}