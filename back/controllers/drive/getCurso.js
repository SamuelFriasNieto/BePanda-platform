import { getCursoDB } from "../../model/modelCursos.js";
import { drive } from "./driveAuth.js";


export async function getCurso (req,res) {
    const curso = await getCursoDB(req.query.idCurso);

    const video =await drive.files.get({
        fileId:'1vkjJ1hSZS1q7jKcKw1MCTR-IgHBEpA5P', alt:'media'
    },
    {
        responseType:'arraybuffer'
    })
    console.log(video)
    const buffer = Buffer.from(video.data);
    const base64Image = buffer.toString("base64");

    res.send({success:true, message: curso, video:base64Image})
}