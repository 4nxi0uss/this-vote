import * as React from 'react';

export const userAcountType: UsersStatusType = {
  0: "Standar user",
  1: "Admin",
  2: "Super Admin"
}

export const userAcountActivated: UsersStatusType = {
  0: "Unactivated",
  1: "Activated",
}

export interface dataTypes {
  fields: [...{
    name: string
  }[]],
  rows: [{
    Id: number,
    bus_number: number,
    departure_time: string,
    destination: string
  }]
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
  btn?: boolean
}

export interface ObjectPushType {
  [key: string]: any;
}

export interface UsersStatusType {
  [key: number]: any;
}

export interface VoteType {
  vote: number,
  color?: string
}

export interface editProp {
  id: number,
  name: string,
  question: string,
  number: number,
  options: string,
}

export interface editArg {
  isOpen: boolean,
  edit: any,
  pro: editProp
}

export interface optionValueJson {
  name: string,
  id: number,
  vote: number,
  color: string
}