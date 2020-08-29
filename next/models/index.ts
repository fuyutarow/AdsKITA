import { firestore } from 'firebase';

export type Timestamp = firestore.Timestamp;
export const Timestamp = firestore.Timestamp;

export interface DomainInfo {
  domain: string;
  lastFetched: Timestamp;
  // pvlist?: Array<DomainPVInfo> | undefined;
}

export type Domain = string;
export type DomainRecord = Record<Domain, DomainInfo | undefined>;

export interface DomainPVInfo {
  atFetched: Timestamp;
  avgVisitDuration: number;
  bounceRate: number;
  doamin: Domain;
  pageViews: number;
  pagesPerVisit: number;
  totalVisits: number;
  totalVisitsIsLT: boolean;
}

export type Pvlist = Array<DomainPVInfo>;

export type PawnId = string;
export interface Pawn {
  id: PawnId;
  player: 'red' | 'blue';
}
export type PawnRecord = Record<PawnId, Pawn | undefined>;

export type FetchingStatus = 'fetching' | 'fetched' | 'notFound';

export type Area = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'heaven' | 'hell';

export type PresenceStatus = 'active' | 'absence';

export type UserId = string;
export interface UserInfoCore {
  id: UserId;
  displayName: string | null;
  photoURL: string | null;
}
export type UserInfoForRecord = UserInfoCore & {
  presenceStatus: PresenceStatus;
};
export type UserRecord = Record<UserId, UserInfoForRecord | undefined>;
export type UserInfo = UserInfoCore & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type RoomId = string;
export interface Room {
  id: RoomId;
  name: string;
}

export type RoomForContext = Room & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userRecord: UserRecord;
};

export type FlyerId = string;
export interface Flyer {
  id: FlyerId;
  imageURL: string;
  size: Array<number>;
  linkURL: string;
  ownerId: UserId;
}

export type StatusPublish = 'going' | 'pending' | 'blocked';

export type PubId = string;
export type PublishedFlyer = Flyer & {
  pubId: PubId;
  numShards: number;
  targetDoamin: string;
  createdAt: Timestamp;
  budget: number;
  days: number;
  budgetPerDay: number;
};
export type PubRecord = Record<PubId, PublishedFlyer | undefined>;

export type PublishedFlyerWithStatus = PublishedFlyer & {
  statusPublish: StatusPublish;
};
export type PubRecordWithStatus = Record<PubId, PublishedFlyerWithStatus | undefined>;

export interface UserInfoCore {
  id: UserId;
  displayName: string | null;
  photoURL: string | null;
}

export interface PubPlanWithoutRate {
  pubId: PubId;
  budgetPerDay: number;
}
export interface PubPlan {
  pubId: PubId;
  budgetPerDay: number;
  rate: number;
}
export type PubPlanRecord = Record<PubId, PubPlan | undefined>;
export type PubPlanRecordWithoutRate = Record<PubId, PubPlanWithoutRate | undefined>;

export interface DomainSpace {
  domain: string;
  ownerId: UserId;
  createdAt: Timestamp;
  pulledAt: Timestamp;
  defaultStatusPublish: StatusPublish;
  pubPlanRecord: PubPlanRecord;
  totalAmountPerDay: number;
}

export enum TicketStatus {
  onSale = 'onSale',
  soldOut = 'soldOut',
}

export type TicketId = string;
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
};

export interface NewTicket {
  id: TicketId;
  providerUser: UserInfo;
  title: string;
  description: string;
  status: TicketStatus.onSale;
  price: number | null;
}
