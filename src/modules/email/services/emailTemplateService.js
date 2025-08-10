const welcomeTemplate = require("../templates/welcomeTemplate");
const verificationTemplate = require("../templates/verificationTemplate");
const confirmationTemplate = require("../templates/confirmationTemplate");
const deactivateTempleate = require("../templates/deactivateTempleate");
const reactivateTempleate = require("../templates/reactivateTemplate");
const requestPasswordTemplate = require("../templates/requestPasswordTemplate");
const resetPasswordTemplate = require("../templates/resetPasswordTemplate");

class EmailTemplateService {
  static getWelcomeEmail(userData) {
    return welcomeTemplate.generate(userData);
  }

  static getVerificationEmail(userData) {
    return verificationTemplate.generate(userData);
  }

  static getConfirmationEmail(userData) {
    return confirmationTemplate.generate(userData);
  }
  static getdeactivateEmail(userData) {
    return deactivateTempleate.generate(userData);
  }

  static getReactivateEmail(userData) {
    return reactivateTempleate.generate(userData);
  }
  static getRequestPasswordEmail(userData) {
    return requestPasswordTemplate.generate(userData);
  }
  static getResetPasswordEmail(userData) {
    return resetPasswordTemplate.generate(userData);
  }

  static getTemplate(templateName, data) {
    const templates = {
      welcome: this.getWelcomeEmail,
      verification: this.getVerificationEmail,
      confirmation: this.getConfirmationEmail,
      deactivate: this.getdeactivateEmail,
      reactivate: this.getReactivateEmail,
      requestPassword: this.getRequestPasswordEmail,
      resetPassword: this.getResetPasswordEmail,
    };

    const templateFunction = templates[templateName];
    if (!templateFunction) {
      throw new Error(`Template '${templateName}' no encontrado`);
    }

    return templateFunction(data);
  }
}

module.exports = EmailTemplateService;
