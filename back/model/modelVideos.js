import { drive } from '../controllers/drive/driveAuth.js';
import prismadb from '../libs/prismadb.js'

export async function insertVideo (idVideo, idAudio,idPDF, nombre,cursoId) {
    const numeroDeVideos = await prismadb.videos.count({
        where: {
            idCurso:cursoId
        }
    })
    const orden = numeroDeVideos + 1;
    const video = await prismadb.videos.create({
        data: {
            idVideo:idVideo,
            idAudio:idAudio,
            idPDF:idPDF,
            nombre:nombre,
            idCurso:cursoId,
            orden:orden
        }
    })
}

export async function getModulosDB(idCurso) {
    const modulos = await prismadb.videos.findMany({
        where:{
            idCurso:idCurso
        }
    })

    return modulos;
}

export async function getModuloDB(idVideo) {
    const modulo = await prismadb.videos.findMany({
        where:{
            idVideo:idVideo
        }
    })

    return modulo;
}