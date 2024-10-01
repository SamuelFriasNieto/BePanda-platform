import { drive } from "./driveAuth.js";

export async function getVideo (req,res) {
    const video =await drive.files.get({
        fileId:req.query.idVideo, alt:'media'
    },
    {
        responseType:'arraybuffer'
    })
    console.log(video)
    const buffer = Buffer.from(video.data);
    const base64Image = buffer.toString("base64");

    res.send({success:true,  video:base64Image})
}



/*




export async function getVideo (req,res) {
    const video =await drive.files.get({
        fileId:req.query.idVideo, alt:'media'
    },
    {
        responseType:'arraybuffer'
    })
    console.log(video)
    const buffer = Buffer.from(video.data);
    const base64Image = buffer.toString("base64");

    res.send({success:true,  video:base64Image})
}

app.get('/getVideo', (req, res) => {
  const videoPath = path.resolve(__dirname, 'videos', 'your-video.mp4');
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head); // Partial content
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});*/