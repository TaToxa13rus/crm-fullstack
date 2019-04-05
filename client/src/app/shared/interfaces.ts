export interface IUser {
  email: string;
  password: string;
}

export interface ICategory {
  name: string;
  imageSrc?: string;
  user?: string;
  _id?: string;
}

export interface IPosition {
  name: string;
  cost: number;
  user?: string;
  category: string;
  _id?: string;
  quantity?: number;
}

export interface IOrder {
  date?: Date;
  order?: number;
  user?: string;
  list: any[];
  _id?: string;
}

export interface IOrderPosition {
  name: string;
  cost: number;
  quantity?: number;
  _id?: string;
}

export interface IMessage {
  message: string;
}
