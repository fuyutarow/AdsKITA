import { firestore } from 'firebase';

export type Timestamp = firestore.Timestamp
export const Timestamp = firestore.Timestamp;

export type UserId = string

export type FlyerId = string
export interface Flyer {
  id: FlyerId;
  imageURL: string;
  size: Array<number>;
  linkURL: string;
  ownerId: UserId;
}

export interface UserInfo {
  id: UserId;
  displayName: string | null;
  photoURL: string | null;
  providerId: string;
  updatedAt: Timestamp;
}

export enum TicketStatus {
  onSale = 'onSale',
  soldOut = 'soldOut',
}

export type TicketId = string
export type Ticket = {
  id: TicketId;
  providerUser: UserInfo;
  title: string;
  description: string;
  status: TicketStatus.onSale;
  price: number;
} | {
  id: TicketId;
  providerUser: UserInfo;
  title: string;
  description: string;
  status: TicketStatus.soldOut;
  price: number;
  purchaserUser: UserInfo;
}

export interface NewTicket {
  id: TicketId;
  providerUser: UserInfo;
  title: string;
  description: string;
  status: TicketStatus.onSale;
  price: number | null;
}
