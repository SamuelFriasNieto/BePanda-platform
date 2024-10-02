import { getModuloDB } from "../../model/modelVideos.js";
import { drive } from "./driveAuth.js";





export async function getVideo(req, res) {
  try {

    const range = req.headers.range;
    const videoId = req.query.idVideo;

    const modulo = await getModuloDB(videoId)
    console.log(modulo)

    if (!req.query.module) {
      if (!range) {
        return res.status(400).send("Requires Range header");
      }

      // Obtén los metadatos del archivo (incluido el tamaño)
      const metadata = await drive.files.get({
        fileId: videoId,
        fields: 'size',
      });

      const videoSize = parseInt(metadata.data.size, 10);
      const CHUNK_SIZE = 10 ** 6; // Tamaño del chunk de 1MB
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, headers);

      // Obtener el segmento de video desde Google Drive
      const videoStream = await drive.files.get(
        { fileId: videoId, alt: 'media' },
        {
          responseType: 'stream',
          headers: {
            Range: `bytes=${start}-${end}`,
          },
        }
      );
      videoStream.data.pipe(res);

    } else {
      res.send({ message: modulo })

    }



    // Transmitir los datos al cliente

  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching video");
  }
}

// export async function getVideo (req,res) {
//     const video =await drive.files.get({
//         fileId:req.query.idVideo, alt:'media'
//     },
//     {
//         responseType:'arraybuffer'
//     })
//     console.log(video)
//     const buffer = Buffer.from(video.data);
//     const base64Image = buffer.toString("base64");

//     res.send({success:true,  video:base64Image})
// }



