import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

import mailingRouter from './src/routes/mailing.js';

admin.initializeApp(functions.config().firebase);

dotenv.config({ path: path.join(process.cwd(), 'functions', '.env') });
const appMail = express();
const PORT = process.env.PORT || 3001;

appMail.use(express.json());
appMail.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
appMail.use('/api/mailing', mailingRouter);

appMail.listen(PORT, () => console.log('Listening server on port ' + PORT));
export const app = functions.https.onRequest(appMail);
