import prismadb from '../libs/prismadb.js'

export async function insertCurso (idCurso,nombre, idThumbnail) {
  
    const curso = await prismadb.cursos.create({
        data: {
            nombre: nombre,
            idCurso: idCurso,
            idThumbnail:idThumbnail
        }
    })
}

export async function getCursosDB () {
    const cursos = await prismadb.cursos.findMany()

    return cursos;
}

export async function getCursoDB (idCurso) {
    const curso = await prismadb.cursos.findUnique({
        where: {
            idCurso: idCurso
        }
    })

    return curso;
}