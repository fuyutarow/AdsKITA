export const obtainChannelBasic = async (channelId: string) => {
    const url = (`https://us-central1-ozone3-c270e.cloudfunctions.net/obtain_channel_basic?channelId=${channelId}`);
    await fetch(url);
};

export const obtainChannelProfileV2 = async (channelId: string) => {
    const url = (`https://us-central1-ozone3-c270e.cloudfunctions.net/obtain_channel_profile_v2?channelId=${channelId}`);
    await fetch(url);
};

export const obtainChannelAudienceV2 = async (channelId: string) => {
    const url = (`https://us-central1-ozone3-c270e.cloudfunctions.net/obtain_channel_audience_v2?channelId=${channelId}`);
    await fetch(url);
};
