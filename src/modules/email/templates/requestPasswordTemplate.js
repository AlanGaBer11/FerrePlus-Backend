const emailHelpers = require("../utils/emailHelpers");

const generate = (data) => {
  const { name, resetToken, tokenExpiration } = data;

  const subject = "Solicitud de reseteo de contraseña - FerrePlus";

  const text = `Hola ${name}, tu código para resetear la contraseña es: ${resetToken}. Este código expira en 15 minutos.`;

  const html = `
    ${emailHelpers.getEmailHeader()}
    <div style="${emailHelpers.getContainerStyles()}">
      <h1 style="color: #007bff; text-align: center;">Reseteo de Contraseña</h1>
      <p>Hola <strong>${name}</strong>,</p>
      <p>Has solicitado resetear tu contraseña. Tu código de verificación es:</p>
      
      <div style="${emailHelpers.getCodeBoxStyles()}">
        <p style="${emailHelpers.getCodeStyles()}">${resetToken}</p>
      </div>
      
      <div style="background-color: #fff3cd; border: 1px solid #ffeeba; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0; color: #856404;">
          <strong>⏰ Este código expirará el ${tokenExpiration.toLocaleString()}</strong>
        </p>
      </div>
      
      <p>Si no solicitaste este reseteo, puedes ignorar este correo.</p>
      <p>Por razones de seguridad, no compartas este código con nadie.</p>
      ${emailHelpers.getEmailFooter()}
    </div>
  `;

  return { subject, text, html: emailHelpers.sanitizeHtml(html) };
};

module.exports = { generate };
