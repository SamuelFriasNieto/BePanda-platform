//1IbhmyTaJWfDv10gu5ZKSxrnFPC8fVm9C
//18X7siSRtWHqGYM6P6rYUIle9egbDP515
import { drive } from "./driveAuth.js";
import { getCursosDB } from "../../model/modelCursos.js";

export async function getCursos(req, res) {
  try {
    const cursos = await getCursosDB();
    console.log(cursos, "BEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")

    // Crear un array de promesas para obtener las imágenes en paralelo
    const promises = cursos.map(async (curso) => {
      const response = await drive.files.get(
        { fileId: curso.idThumbnail, alt: "media" },
        { responseType: "arraybuffer" } // Obtener el archivo como arraybuffer
      );

      // Convertir los datos a Buffer y luego a una cadena Base64
      const buffer = Buffer.from(response.data);
      const base64Image = buffer.toString("base64");

      return {
        ...curso, // Incluye otros datos del curso si es necesario
        image: base64Image,
      };
    });

    // Esperar a que todas las promesas se resuelvan
    const cursosResponse = await Promise.all(promises);

    // Enviar la respuesta con todas las imágenes codificadas en Base64
    res.send({ response: cursosResponse });
  } catch (error) {
    console.error("Error retrieving the images:", error);
    res.status(500).send("Error retrieving the images");
  }
}



/*



const response = await drive.files.list({
      q: `'1IbhmyTaJWfDv10gu5ZKSxrnFPC8fVm9C' in parents and trashed=false`, // Query to list files in the specified folder
      fields: 'files(id, name, mimeType)' // Specify the fields you want to return
      });
    console.log(response.data.files, 'driveeeeeeeeeeeeeeeeeeeee')
    res.send({success:true, message: response });






    

    const files = response.data.files;

    if (files.length === 0) {
      return res.send({
        success: true,
        message: 'No files found in this folder.',
        files: []
      });
    }

    // Return the list of files
    res.send({
      success: true,
      message: 'Files retrieved successfully!',
      files: files
    });
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).send({
      success: false,
      message: 'Failed to retrieve files!',
      error: error.message,
    });
  }
}

// Define a route to list files in a folder
app.get('/listFiles/:folderId', listFilesInFolder);  */