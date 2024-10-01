// api/server.js
import session from 'express-session';
import express from 'express';
import cors from 'cors'; 
import { insertUser } from './controllers/users/createUser.js';
import { loginUser } from './controllers/users/loginUser.js';
import { passreset } from './controllers/passreset.js';
import { verifyResetLink } from './controllers/verifyResetLink.js';
import { resetPassword } from './controllers/resetPassword.js';
import { verifyToken } from './controllers/verifyToken.js';


import path from 'path'
import fs from 'fs'
import { crearCurso } from './controllers/drive/crearCurso.js';
import multer from "multer";
import { getCursos } from './controllers/drive/getCursos.js';
import { getCurso } from './controllers/drive/getCurso.js';
import { createVideo } from './controllers/drive/createVideo.js';
import { getModulos } from './controllers/drive/getModulos.js';
import { getVideo } from './controllers/drive/getVideo.js';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });








/*// Function to upload a video

const uploadVideo = async () => {
  try {
    const filePath = path.join(__dirname, 'myVideo.mp4'); // Path to the video file
    const fileMetadata = {
      name: 'myVideo.mp4', // Name of the file in Google Drive
      parents: ['parentFolderId'] // Optional: the ID of the folder where the video will be uploaded
    };
    const media = {
      mimeType: 'video/mp4', // MIME type for video
      body: fs.createReadStream(filePath) // Stream the video file
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name', // Return only the file ID and name
    });

    console.log('Video uploaded:', response.data);
  } catch (error) {
    console.error('Error uploading video:', error);
  }
};

uploadVideo(); */





const app = express();
app.use(cors({
  credentials:true,
  origin:'http://localhost:3000'
}));
app.use(express.json());
app.use(session({
    secret: 'holaquetal',
    resave:false,
    saveUninitialized:false,
    cookie: {secure: false}
}))





app.post('/login', loginUser);
app.post('/crearCurso',upload.single('file'), crearCurso);


app.post('/crearVideo',upload.fields([
  {name:'video',maxCount:1},
  {name:'audio', maxCount:1},
   {name: 'PDF', maxCount:1 }
  
]), createVideo);


app.get('/getCursos', getCursos);
app.get('/getCurso', getCurso);
app.get('/getModulos', getModulos);
app.get('/getVideo', getVideo);

app.get('/check-session', (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });

    } else {
      res.send({ loggedIn: false });
    }
  });


  app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
     
      if (err) {
        return res.status(500).send({ error: "No se pudo cerrar la sesión correctamente." });
      }
      res.clearCookie('connect.sid', { path: '/', httpOnly: true, secure: false }); // Match the cookie name and path 
      return res.send({ success: true, message: "Sesión cerrada correctamente." });
    });
    
  });


  app.post('/check-mail', passreset)

  app.get('/verify-reset', verifyResetLink); 

  app.post('/reset-password', resetPassword);

  app.post('/verify-token', verifyToken); 

app.post('/createUser', insertUser);

app.listen(3001, () => {
    console.log('hola')
})




export default app;