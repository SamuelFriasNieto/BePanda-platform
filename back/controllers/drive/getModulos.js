import { getModulosDB } from "../../model/modelVideos.js";

export async function getModulos(req, res) {
    const modulos = await getModulosDB(req.query.idCurso)
    res.send({succes: true, message: modulos})
}