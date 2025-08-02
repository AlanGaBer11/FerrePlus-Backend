const nodemailer = require("nodemailer");
require("dotenv").config();

// Verificar que las variables de entorno estén configuradas
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error(
    "❌ Variables de entorno EMAIL_USER y EMAIL_PASS son requeridas"
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verificar la configuración del transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Error en configuración de email:", error);
  } else {
    console.log("✅ Servidor de email configurado correctamente");
  }
});

// FUNCIÓN PARA ENVIAR CORREOS
const sendEmail = async (to, subject, text, html) => {
  try {
    // Validar parámetros requeridos
    if (!to) {
      throw new Error("El destinatario (to) es requerido");
    }
    if (!subject) {
      throw new Error("El asunto (subject) es requerido");
    }

    const mailOptions = {
      from: `"FerrePlus" <${process.env.EMAIL_USER}>`, // Nombre más profesional
      to,
      subject,
      text,
      html,
    };

    console.log(`📧 Enviando correo a: ${to} con asunto: ${subject}`);

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado exitosamente:", info.messageId);

    return {
      success: true,
      message: "Correo enviado correctamente",
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error.message);
    return {
      success: false,
      message: `Error al enviar el correo: ${error.message}`,
    };
  }
};

module.exports = { sendEmail };
