const { EmailService } = require('./EmailService');

const service = new EmailService();

const email = {
  id: 'email-001',
  to: 'user@example.com',
  subject: 'Hello',
  body: 'This is a test email'
};

service.sendEmail(email).then(() => {
  console.log(`Final Status: ${service.getStatus(email.id)}`);
});
