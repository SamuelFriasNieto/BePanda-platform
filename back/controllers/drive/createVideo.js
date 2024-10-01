import { insertVideo } from "../../model/modelVideos.js";
import { insertCurso } from "../../model/modelCursos.js";
import { drive } from "./driveAuth.js";
import { Readable } from 'stream';

function bufferToStream(buffer) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Signal the end of the stream
    return stream;
}



export async function createVideo(req, res) {

    console.log(req.files)
    const response = await drive.files.create({
        requestBody: {
            name: req.body.nombre,
            mimeType: "application/vnd.google-apps.folder",
            parents: [req.body.cursoId]
        }
    })
    console.log(response)
    const fileStream = bufferToStream(req.files.video[0].buffer);



  const response2 = await drive.files.create({
    requestBody: {
      name: req.files.video[0].originalname,
      parents: [response.data.id]
      // Optional: the ID of the folder where the video will be uploaded
    },
    media: {
      mimeType: req.files.video[0].mimetype, // Set the correct MIME type
      body: fileStream // Pass the file buffer (since it's in memory)
    }
  })
  const fileStreamAudio = bufferToStream(req.files.video[0].buffer);


  const guardarAudio = await drive.files.create({
    requestBody: {
        name: req.files.audio[0].originalname,
        parents: [response.data.id]
        // Optional: the ID of the folder where the video will be uploaded
      },
      media: {
        mimeType: req.files.audio[0].mimetype, // Set the correct MIME type
        body: fileStreamAudio // Pass the file buffer (since it's in memory)
      }
  })

  const fileStreamPDF = bufferToStream(req.files.PDF[0].buffer);


  const guardarPDF = await drive.files.create({
    requestBody: {
        name: req.files.PDF[0].originalname,
        parents: [response.data.id]
        // Optional: the ID of the folder where the video will be uploaded
      },
      media: {
        mimeType: req.files.PDF[0].mimetype, // Set the correct MIME type
        body: fileStreamPDF // Pass the file buffer (since it's in memory)
      }
  })
  console.log(response2)
  const video = await insertVideo(response2.data.id, guardarAudio.data.id, guardarPDF.data.id, req.body.nombre,req.body.cursoId);

  res.send({success:true})
}


