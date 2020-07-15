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

export type PubId = string
export type PublishedFlyer = Flyer & {
  pubId: PubId;
  numShards: number;
  targetDoamin: string;
}

export type PubRecord = Record<PubId, PublishedFlyer | undefined>

export interface UserInfoCore {
  id: UserId;
  displayName: string | null;
  photoURL: string | null;
}

export type UserInfo = UserInfoCore & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  domains: Array<string>;
}

export interface DomainSpace {
  domain: string;
  ownerId: UserId;
  createdAt: Timestamp;
  pulledAt: Timestamp;
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
