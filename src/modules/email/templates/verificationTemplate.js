const emailHelpers = require("../utils/emailHelpers");

const generate = (userData) => {
  const { name, verificationCode } = userData;

  const subject = "Código de Verificación - FerrePlus";

  const text = `Tu código de verificación es: ${verificationCode}. Este código expira en 15 minutos.`;

  const html = `
    ${emailHelpers.getEmailHeader()}
    <div style="${emailHelpers.getContainerStyles()}">
      <h1 style="${emailHelpers.getTitleStyles()}">Código de Verificación</h1>
      <p>Hola <strong>${name}</strong>,</p>
      <p>Tu código de verificación para FerrePlus es:</p>
      
      <div style="${emailHelpers.getCodeBoxStyles()}">
        <h2 style="${emailHelpers.getCodeStyles()}">${verificationCode}</h2>
      </div>
      
      <p><strong>Este código expira en 15 minutos.</strong></p>
      <p>Si no solicitaste este código, puedes ignorar este correo.</p>
      ${emailHelpers.getEmailFooter()}
    </div>
  `;

  return { subject, text, html };
};

module.exports = { generate };
