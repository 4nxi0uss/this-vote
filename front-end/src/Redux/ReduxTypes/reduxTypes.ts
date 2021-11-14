export const LOADING = 'LOADING'
export const SUCCESS = 'SUCCESS'
export const FAILED = 'FAILED'


export interface userDataType {
    email: string,
    password: string
}

export interface userLoginStatus {
    status: string,
    info: any
}