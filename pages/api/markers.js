import path from 'path';
import getConfig from 'next/config';
import request from 'request';
import unzipper from 'unzipper';
import { DOMParser } from 'xmldom';
import togeojson from 'togeojson';

export default async function handler(req, res) {
  const json = await toKML().then(toJSON);

  res.status(200).json(json);
}

const serverPath = staticFilePath => {
  return path.join(getConfig().publicRuntimeConfig.PROJECT_ROOT, staticFilePath);
};

const isDevelopment = process.env.NODE_ENV === 'development';
const BASE_URL = isDevelopment ? 'http://localhost:3000' : 'https://we-eat-map.vercel.app';

function toKML() {
  return new Promise((resolve, reject) => {
    request(
      'https://firebasestorage.googleapis.com/v0/b/bulchimbun.appspot.com/o/test.kmz?alt=media&token=2fbdc19e-31aa-47c0-ab27-8743d173ce04'
    )
      .pipe(unzipper.Parse())
      .on('entry', entry => {
        if (!entry.path.includes('.kml')) {
          entry.autodrain();
          return;
        }

        let data = '';
        entry.on('error', reject);
        entry.on('data', chunk => (data += chunk));
        entry.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

async function toJSON(data) {
  return new Promise(async (resolve, reject) => {
    const parser = new DOMParser();

    const doc = await parser.parseFromString(data);
    const json = togeojson.kml(doc);

    return resolve(json);
  });
}
