import * as React from 'react';

export const userAcountType = {
  0: 'Standar user',
  1: "Admin",
  2: "Super Admin"
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
}

export interface PoolProp {
  id: number | string,
  name: string,
  question: string,
  options: string,
  index: number
}

export interface ObjectPushType {
  [key: string]: any;
}