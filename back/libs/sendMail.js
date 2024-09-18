import nodemailer from 'nodemailer'


export const sendMail = (verificationUrl, email) => {
  let transporter1 = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Ejemplo: smtp.ejemplo.com
    port: 587, // El puerto para conexión segura, puede ser 465 para SSL
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: 'abastospruebajon@gmail.com', // Tu usuario SMTP
        pass: 'jsdg nxpf vuhi xesd', // Tu contraseña SMTP
    },
    tls: {
        // No fallar en certificados inválidos (esto es un ejemplo, en producción deberías tenerlo en true)
        rejectUnauthorized: false
    }
  });
  
  // Opciones del correo electrónico
  let mailOptions = {
    from: '"Fitai" <abastospruebajon@gmail.com>', // Dirección del remitente
    to: email, // Lista de destinatarios
    subject: 'Verifica tu cuenta', // Asunto
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #6ca26b; text-align: center;">Bienvenido a Fitai!</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            Gracias por registrarte en Fitai. Estamos encantados de tenerte con nosotros.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            Por favor, haz clic en el siguiente enlace para verificar tu cuenta:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <p>${verificationUrl}</p>
          </div>
          <p style="font-size: 14px; line-height: 1.5; color: #888;">
            Si el enlace no funciona, copia y pega la siguiente URL en tu navegador:
          </p>
       
          <p style="font-size: 14px; line-height: 1.5; color: #888;">
            Si no te has registrado en Fitai, por favor ignora este correo.
          </p>
        </div>
      </div>
    ` // cuerpo del correo en HTML
  };
  
  // Enviar el correo electrónico
  transporter1.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Mensaje enviado: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  
  
  }