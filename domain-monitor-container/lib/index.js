"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.screenshotDomain = exports.obtainSiteMetadata = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Timestamp = admin.firestore.Timestamp;
const screenshot_1 = require("./screenshot");
const captureOgp_1 = require("./captureOgp");
if (!admin.apps.length) {
    admin.initializeApp(functions.config().firebase);
}
const db = admin.firestore().collection('stage').doc('domains');
exports.obtainSiteMetadata = functions.https.onRequest(async (req, res) => {
    const { domain } = req.query;
    if (domain) {
        const domain = req.query.domain;
        // const domain = data.domain as string;
        const url = `https://${domain}`;
        const ogp = await captureOgp_1.captureOgp(url);
        // const screenshotDataUri = await screenshotUrl(url);
        const metadata = Object.assign(Object.assign({}, ogp), { 
            // screenshotDataUri,
            domain, updatedAt: Timestamp.now() });
        await db.collection('domainMetadataList').doc(domain).set(metadata, { merge: true });
        await res.send('ok');
        return;
    }
    else {
        await res.send('Require qeruy: [domain]');
        return;
    }
});
exports.screenshotDomain = functions.https.onRequest(async (req, res) => {
    const { domain } = req.query;
    if (domain) {
        const domain = req.query.domain;
        const url = `https://${domain}`;
        const screenshotDataUri = await screenshot_1.screenshotUrl(url);
        await db.collection('domainScreenshots').doc(domain).set({
            domain,
            screenshotDataUri,
            updatedAt: Timestamp.now(),
        }, { merge: true });
        // await res.send(screenshotDataUri);
        await res.send('ok');
        return;
    }
    else {
        await res.send('Require qeruy: [domain]');
        return;
    }
});
//# sourceMappingURL=index.js.map