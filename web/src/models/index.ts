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

export type StatusPublish = 'going' | 'pending' | 'blocked'

export type PubId = string
export type PublishedFlyer = Flyer & {
  pubId: PubId;
  numShards: number;
  targetDoamin: string;
  createdAt: Timestamp;
  budget: number;
  days: number;
  budgetPerDay: number;
}
export type PubRecord = Record<PubId, PublishedFlyer | undefined>

export type PublishedFlyerWithStatus = PublishedFlyer & {
  statusPublish: StatusPublish;
}
export type PubRecordWithStatus = Record<PubId, PublishedFlyerWithStatus | undefined>

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

export interface PubPlan {
  pubId: PubId;
  budgetPerDay: number;
}
export type PubPlanRecord = Record<PubId, PubPlan | 'DELETED' | undefined>

export interface DomainSpace {
  domain: string;
  ownerId: UserId;
  createdAt: Timestamp;
  pulledAt: Timestamp;
  defaultStatusPublish: StatusPublish;
  pubPlanRecord: PubPlanRecord;
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
