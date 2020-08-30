import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
type Timestamp = admin.firestore.Timestamp;
const Timestamp = admin.firestore.Timestamp;

import { screenshotUrl } from './screenshot';
import { captureOgp, OGP } from './captureOgp';

if (!admin.apps.length) {
  admin.initializeApp(functions.config().firebase);
}
const db = admin.firestore().collection('stage').doc('domains');

type SiteMetadata = OGP & {
  screenshotDataUri?: string | undefined
  domain: string
  updatedAt: Timestamp,
};

export const obtainSiteMetadata = functions.https.onRequest(async (req, res) => {
  const { domain } = req.query;
  if (domain) {
    const domain = req.query.domain as string;
    // const domain = data.domain as string;
    const url = `https://${domain}`;
    const ogp = await captureOgp(url);
    // const screenshotDataUri = await screenshotUrl(url);
    const metadata: SiteMetadata = {
      ...ogp,
      // screenshotDataUri,
      domain,
      updatedAt: Timestamp.now(),
    };
    await db.collection('domainMetadataList').doc(domain).set(metadata, { merge: true });
    await res.send('ok');
    return;
  } else {
    await res.send('Require qeruy: [domain]');
    return;
  }
});

// export const screenshotDomain = functions.runWith({ memory: '1GB' }).storage.object().onFinalize((object) => {
export const screenshotDomain = functions.runWith({ memory: '1GB' }).https.onRequest(async (req, res) => {
  const { domain } = req.query;
  if (domain) {
    const domain = req.query.domain as string;
    const url = `https://${domain}`;
    const screenshotDataUri = await screenshotUrl(url);
    await db.collection('domainScreenshots').doc(domain).set({
      domain,
      screenshotDataUri,
      updatedAt: Timestamp.now(),
    }, { merge: true });
    // await res.send(screenshotDataUri);
    await res.send('ok');
    return;
  } else {
    await res.send('Require qeruy: [domain]');
    return;
  }
});
