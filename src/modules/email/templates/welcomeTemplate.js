const emailHelpers = require("../utils/emailHelpers");

const generate = (userData) => {
  const { name, role } = userData;

  const subject =
    role === "USER"
      ? "Bienvenido a FerrePlus"
      : `Cuenta de ${role} creada en FerrePlus`;

  const text = `Hola ${name}, ${
    role === "USER"
      ? "gracias por registrarte en FerrePlus. Tu cuenta ha sido creada exitosamente."
      : `tu cuenta de ${role} ha sido creada en FerrePlus.`
  }`;

  const html = `
    ${emailHelpers.getEmailHeader()}
    <div style="${emailHelpers.getContainerStyles()}">
      <h1 style="${emailHelpers.getTitleStyles()}">
        ${
          role === "USER"
            ? `¡Bienvenido ${name} a FerrePlus!`
            : `¡Cuenta creada ${name}!`
        }
      </h1>
      <p>Tu cuenta ${
        role === "USER" ? "" : `con rol de <strong>${role}</strong>`
      } ha sido creada exitosamente.</p>
      ${
        role === "USER"
          ? "<p>Para usar nuestros servicios, por favor activa tu cuenta.</p>"
          : "<p>Ya puedes comenzar a usar nuestros servicios.</p>"
      }
      <p>Gracias por elegirnos.</p>
      ${emailHelpers.getEmailFooter()}
    </div>
  `;

  return { subject, text, html };
};

module.exports = { generate };
