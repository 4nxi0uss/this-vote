
export const userAcountType: UsersStatusType = {
  User: "User",
  Editor: "Editor",
  Admin: "Admin"
}

export interface ModalProp {
  children: React.ReactChild,
  isOpen: boolean,
  handleOnClose?: () => void,
  shouldBeCloseOnOutsideClick?: boolean,
}

export interface optionListType {
  name: string,
  color: string,
  vote: number
}

export interface PollProp {
  id: number,
  name: string,
  question: string,
  options: string,
  number: number,
  poolCreator?: string
}

export interface ObjectPushType {
  [key: string]: any;
}

export interface UsersStatusType {
  [key: string]: string;
}

export interface VoteType {
  vote: number,
  color?: string
}

export interface EditProp {
  id: number,
  name: string,
  question: string,
  number: number,
  options: string,
}

export interface EditArg {
  isOpen: boolean,
  edit: any,
  pro: EditProp
}

export interface OptionValueJson {
  name: string,
  id: number,
  vote: number,
  color: string
}

export interface PollType {
  number: number,
  id: number,
  name: string,
  question: string,
  options: string,
  user_id: string
}