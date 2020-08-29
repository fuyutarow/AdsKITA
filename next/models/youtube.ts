import { Timestamp } from 'models';

export type YoutubeChannelId = string;

export type YoutubeChannelBasicRecord = Record<YoutubeChannelId, YoutubeChannelBasic | undefined>;

export interface YoutubeChannelBasic {
  id: YoutubeChannelId;
  title: string;
  description: string;
  // publishedAt: Timestamp;
  // updatedAt: Timestamp;
  publishedAt: Date;
  updatedAt: Date;
  topicIds: Array<string>;
  countryCode: string;
  thumbnailUrl: string;
  customUrl: string | null;
}

export interface YoutubeChannelProfileV2 {
  id: YoutubeChannelId;
  numSubscribers: number;
  totalViews: number;
  totalVideos: number;
  noxScore: number;
  estOneVideoEarning: number;
  estOneVideoCpm: number;
  estMonthEarning: number;
  estMonthCpm: number;
  areaRank: number;
  globalRank: number;
  socialContacts: Array<string>;
  updatedAt: Timestamp;
}

export interface YoutubeChannelProfile {
  id: string;
  title: string;
  subscribers: number;
  totalViews: number;
  averageViews: number;
  totalVideos: number;
  categories: Array<number>;
  countryCode: string;
  noxScore: number;
  lastThirtyVideoViews: number;
  lastThirtyVideoLikes: number;
  lastThirtyVideoDisLikes: number;
  estMonthEarning: number;
  estMonthCPM: number;
  estOneVideoEarning: number;
  estOneVideoCPM: number;
  languages: string;
  tags: Array<string>;
  socialContacts: Array<string>;
}

export interface AgeAndGenderWithViewPercentUnit {
  age: 'age13-17' | 'age18-24' | 'age25-34' | 'age35-44' | 'age45-54' | 'age55-64' | 'age65+';
  gender: 'male' | 'female';
  value: number;
}

export interface ViewPercentWithCountryUnit {
  countryCode: string;
  value: number;
}

export interface Comment {
  content: string;
  pubTime: number;
  videoId: string;
}

export interface ActiveObserver {
  channelId: string;
  commentDetails: Array<Comment>;
  comments: number;
  title: string;
  totalVideos: number;
}

export interface CommonSubscriberChannel {
  commonRatio: number;
  channelId: string;
  commonSubscriber: Array<string>;
}

export interface WeekActive {
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sat: number;
  sun: number;

}

export interface YoutubeChannelAudienceV2 {
  ageAndGenderWithViewPercent: Array<AgeAndGenderWithViewPercentUnit>;
  viewPercentWithCountry: Array<ViewPercentWithCountryUnit>;
  weekActive?: WeekActive | undefined;
  hourTimeActive?: Record<number, number> | undefined;
  commonSubscriberChannels: Array<CommonSubscriberChannel>;
  activeObservers: Array<ActiveObserver>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface YoutubeChannelAudience {
  ageAndGenderWithViewPercent: Array<AgeAndGenderWithViewPercentUnit>;
  viewPercentWithCountry: Array<ViewPercentWithCountryUnit>;
  weekActive?: WeekActive | undefined;
  hourTimeActive?: Record<number, number> | undefined;
  commonSubscriberChannels: Array<CommonSubscriberChannel>;
  activeObservers: Array<ActiveObserver>;
}

export interface DataXYUnit {
  x: string;
  y: number;
}

export interface YoutubeChannelTrending {
  recentYearsSubscribersIncrement: Array<DataXYUnit>;
  recentYearsViews: Array<DataXYUnit>;
  recentYearsViewsIncrement: Array<DataXYUnit>;
  futureMonthSubscribersPredicted: Array<DataXYUnit>;
  futureMonthViewsPredicted: Array<DataXYUnit>;
  last30daysEstimatedIncome: Array<DataXYUnit>;
  last30daysEstimatedPerDayVideoPublishCount: Array<DataXYUnit>;
}
