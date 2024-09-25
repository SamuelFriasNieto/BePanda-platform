import { drive } from "./driveAuth.js";
import { Readable } from 'stream';


function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null); // Signal the end of the stream
  return stream;
}

export async function crearCurso(req, res)  { 
    console.log(req.body.text)
    const response = await drive.files.create({
        requestBody: {
            name:req.body.text,
            mimeType: "application/vnd.google-apps.folder"
        }
    })
    console.log(response.data.id)

    const fileStream = bufferToStream(req.file.buffer);


    const response2 = await drive.files.create({
        requestBody: {
            name:req.file.originalname,
            parents: [response.data.id]
         // Optional: the ID of the folder where the video will be uploaded
    },
    media: {
        mimeType: req.file.mimetype, // Set the correct MIME type
        body: fileStream // Pass the file buffer (since it's in memory)
  }
    })
    console.log('File uploaded successfully:', response2.data);
    
      res.send({success:true, message: 'Login successful' });

}


/*

// Use memory storage instead of disk storage


// Handle the file upload and text data in your route
app.post('/crearCurso', upload.single('file'), async (req, res) => {
  try {
    // Access the uploaded file as a buffer in req.file.buffer
 // The file buffer
    console.log("File original name:", req.file.originalname); // Original file name
 // The text input from the form

    // Here you can upload the file buffer to your cloud service
    // Example: Upload to AWS S3, Google Cloud Storage, etc.

    res.send({
      success: true,
      message: 'File and data uploaded successfully!',
    });
  } catch (error) {
    console.error('Error uploading the file:', error);
    res.status(500).send({
      success: false,
      message: 'File upload failed!',
    });
  }
});



*/