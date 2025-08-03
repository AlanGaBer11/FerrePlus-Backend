const emailHeplers = require("../utils/emailHelpers");

const generate = (userData) => {
  const { name, email, reactiveAt } = userData;

  const subject = "Tu cuenta ha sido reactivada - FerrePlus";

  const text = `Hola ${name}, tu cuenta de FerrePlus (${email}) ha sido reactivada.`;

  const html = `
    ${emailHeplers.getEmailHeader()}
    <div style="${emailHeplers.getContainerStyles()}">
      <h1 style="color: #28a745; text-align: center;">Cuenta Reactivada</h1>
      <p>Hola <strong>${name}</strong>,</p>
      <p>Nos complace informarte que tu cuenta de FerrePlus ha sido reactivada.</p>

      <p><strong>Correo asociado:</strong> ${email}</p>
      
      <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0; color: #155724;"><strong>✅ Cuenta reactivada el ${new Date(
          reactiveAt
        ).toLocaleDateString("es-ES")}</strong></p>
      </div>
      
      <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
      <p>¡Gracias por seguir con nosotros!</p>
      
      ${emailHeplers.getEmailFooter()}
    </div>
  `;

  return { subject, text, html };
};

module.exports = { generate };
