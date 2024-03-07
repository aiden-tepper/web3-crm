// const fs = require('fs').promises;
// const path = require('path');
// const process = require('process');
// const {authenticate} = require('@google-cloud/local-auth');
// const {google} = require('googleapis');

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

// /**
//  * Reads previously authorized credentials from the save file.
//  *
//  * @return {Promise<OAuth2Client|null>}
//  */
// async function loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials);
//   } catch (err) {
//     return null;
//   }
// }

// /**
//  * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async function saveCredentials(client) {
//   const content = await fs.readFile(CREDENTIALS_PATH);
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: 'authorized_user',
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

// /**
//  * Load or request or authorization to call APIs.
//  *
//  */
// async function authorize() {
//   let client = await loadSavedCredentialsIfExist();
//   if (client) {
//     return client;
//   }
//   client = await authenticate({
//     scopes: SCOPES,
//     keyfilePath: CREDENTIALS_PATH,
//   });
//   if (client.credentials) {
//     await saveCredentials(client);
//   }
//   return client;
// }

// /**
//  * Lists the labels in the user's account.
//  *
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// async function listLabels(auth) {
//   const gmail = google.gmail({version: 'v1', auth});
//   const res = await gmail.users.labels.list({
//     userId: 'me',
//   });
//   const labels = res.data.labels;
//   if (!labels || labels.length === 0) {
//     console.log('No labels found.');
//     return;
//   }
//   console.log('Labels:');
//   labels.forEach((label) => {
//     console.log(`- ${label.name}`);
//   });
// }

// authorize().then(listLabels).catch(console.error);

import { action } from "./_generated/server";

export const doSomething = action({
  args: {},
  handler: async () => {
    const accessToken =
      "ya29.a0Ad52N38OMkWtkF0iv9t5OsUVpKnr_VQsjSZd6TNVGtp123-4e605mRp1-DEjRTwNIjVdxwg2Fo0hc7-IETxX8DRG4MAQyKXgbVg1FnPsCYd1sc720P7cBaKHtZbzLk_c8CWDK8RgkgSp2RU7N-Gp6fIVhEfxTwwYgwIKaCgYKAbQSARESFQHGX2MiK0-USN62KwRB5JEimDmW0A0171"; // Replace with your actual access token
    const apiUrl = "https://gmail.googleapis.com/gmail/v1/users/yaniv@angelenogroup.com/threads";
    const queryParams = new URLSearchParams({
      maxResults: "100", // Adjust the maximum number of threads to return as needed
      // pageToken: 'PAGE_TOKEN', // Uncomment and set this if you're retrieving a specific page of results
      q: "from:yaniv@angelenogroup.com", // Example query
      // labelIds: 'Label_123', // Uncomment and set this to filter by label IDs
      includeSpamTrash: "false", // Whether to include SPAM and TRASH in the results
    }).toString();

    const url = `${apiUrl}?${queryParams}`;

    await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  },
});
