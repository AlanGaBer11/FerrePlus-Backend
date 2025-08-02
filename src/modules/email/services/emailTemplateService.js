const welcomeTemplate = require("../templates/welcomeTemplate");
const verificationTemplate = require("../templates/verificationTemplate");
const confirmationTemplate = require("../templates/confirmationTemplate");

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

  static getTemplate(templateName, data) {
    const templates = {
      welcome: this.getWelcomeEmail,
      verification: this.getVerificationEmail,
      confirmation: this.getConfirmationEmail,
    };

    const templateFunction = templates[templateName];
    if (!templateFunction) {
      throw new Error(`Template '${templateName}' no encontrado`);
    }

    return templateFunction(data);
  }
}

module.exports = EmailTemplateService;
