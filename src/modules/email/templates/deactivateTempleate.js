const emailHelpers = require("../utils/emailHelpers");

const generate = (userData) => {
  const { name, disabledAt } = userData;

  const subject = "Tu cuenta ha sido desactivada - FerrePlus";

  const text = `Hola ${name}, tu cuenta de FerrePlus ha sido desactivada.`;

  const html = `
    ${emailHelpers.getEmailHeader()}
    <div style="${emailHelpers.getContainerStyles()}">
      <h1 style="color: #dc3545; text-align: center;">Cuenta Desactivada</h1>
      <p>Hola <strong>${name}</strong>,</p>
      <p>Te informamos que tu cuenta de FerrePlus ha sido desactivada.</p>
      
      <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0; color: #721c24;"><strong>⚠️ Cuenta desactivada el ${new Date(
          disabledAt
        ).toLocaleDateString("es-ES")}</strong></p>
      </div>
      
      <p>Si crees que esto es un error, por favor contacta con nuestro equipo de soporte.</p>
      <p>Lamentamos cualquier inconveniente.</p>
      
      ${emailHelpers.getEmailFooter()}
    </div>
  `;

  return { subject, text, html };
};

module.exports = { generate };
