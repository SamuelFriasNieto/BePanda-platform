import { google } from 'googleapis';
import credentials from '../../libs/googleCredentials.json' assert { type: 'json' }


const oauth2client = new google.auth.OAuth2(credentials.web.client_id,credentials.web.client_secret,credentials.web.redirect_uri)

oauth2client.setCredentials({refresh_token:credentials.web.refresh_token})


export  const drive = google.drive({ 
  version: 'v3', 
  auth: oauth2client
})