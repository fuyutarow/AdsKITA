"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureOgp = void 0;
const { unfurl } = require('unfurl.js');
exports.captureOgp = async (url) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const result = await unfurl(url);
    const metadata = result;
    // console.log(metadata);
    const ogp = {
        // @ts-ignore
        url: (_a = metadata.open_graph) === null || _a === void 0 ? void 0 : _a.url,
        // @ts-ignore
        favicon: (metadata === null || metadata === void 0 ? void 0 : metadata.favicon) || null,
        // @ts-ignore
        siteName: ((_b = metadata.open_graph) === null || _b === void 0 ? void 0 : _b.site_name) || ((_c = metadata.twitter_card) === null || _c === void 0 ? void 0 : _c.site),
        // @ts-ignore
        title: ((_d = metadata.open_graph) === null || _d === void 0 ? void 0 : _d.title) || ((_e = metadata.twitter_card) === null || _e === void 0 ? void 0 : _e.title) || metadata.title,
        // @ts-ignore
        description: ((_f = metadata.open_graph) === null || _f === void 0 ? void 0 : _f.description) || ((_g = metadata.twitter_card) === null || _g === void 0 ? void 0 : _g.description),
        // @ts-ignore
        imageUrl: ((_h = metadata.open_graph) === null || _h === void 0 ? void 0 : _h.images[0].url) || ((_j = metadata.twitter_card) === null || _j === void 0 ? void 0 : _j.images[0].url),
        // @ts-ignore
        twitterCard: (_k = metadata.twitter_card) === null || _k === void 0 ? void 0 : _k.card,
    };
    return ogp;
};
//# sourceMappingURL=captureOgp.js.map