// 10円消費してでもデータ取得する価値があるか否かのしきい値
// 2,0000,000位以内が適当にみえる
// chrome拡張のupdateを通して緩和するのは容易だが，制限するのは難しい
// はじめは十分な余裕をもって設定

export const enoughGlobalRank = 1 * 1e6

// channelBasicの更新間隔
// 6週間に設定
export const daysToUpdateChannelBasic = 90

// channelProfileの更新間隔
export const hoursToUpdateChannelProfile = 21
