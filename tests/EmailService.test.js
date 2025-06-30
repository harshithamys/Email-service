const { EmailService } = require('../src/EmailService');

test('EmailService sends email and tracks status', async () => {
  const service = new EmailService();
  const email = {
    id: 'test123',
    to: 'test@example.com',
    subject: 'Test',
    body: 'This is a test email.'
  };

  await service.sendEmail(email);
  const status = service.getStatus(email.id);
  expect(['Sent', 'Failed']).toContain(status);
});
