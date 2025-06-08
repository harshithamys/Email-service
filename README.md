
```markdown
# 📧 Resilient Email Sending Service (JavaScript)

A robust and resilient email sending service built in JavaScript, designed to handle failures gracefully while ensuring reliable email delivery. This project implements modern resilience patterns such as retry with exponential backoff, provider fallback, rate limiting, circuit breaking, and idempotency to create a production-ready email service.

---

## 🚀 Features

- **Retry with Exponential Backoff**: Retries failed emails with increasing delays.
- **Provider Fallback**: Switches between two mock email providers.
- **Rate Limiting**: Controls the frequency of email sends.
- **Circuit Breaker**: Halts repeated failures and auto-recovers.
- **Idempotency**: Ensures each email is sent only once.
- **Status Tracking**: Tracks the delivery status.
- **Logging**: Logs all actions with timestamps.
- **Unit Testing**: Jest-based test suite.

---



---

## 🛠️ Installation

### 📌 Prerequisites

- Node.js (v14+)
- npm

### 📦 Install Dependencies

```bash
npm install
````

---

## 📤 Usage

### Create an Email Object

```javascript
const email = {
  id: 'email-001',
  to: 'user@example.com',
  subject: 'Hello',
  body: 'This is a test email'
};
```

### Initialize and Send Email

```javascript
const { EmailService } = require('./EmailService');
const service = new EmailService();

service.sendEmail(email).then(() => {
  console.log(`Final Status: ${service.getStatus(email.id)}`);
});
```

### Example Terminal Output

```
[2025-06-07T00:27:00.000Z] ProviderA sending to user@example.com
[2025-06-07T00:27:00.010Z] Sent via ProviderA
Final Status: Sent
```

---

## 🧪 Testing

Unit tests are included using **Jest**.

### Run Tests

```bash
npm test
```

### Example Test Case

```javascript
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
```

---

## 🛡️ Resilience Patterns in Action

* **Retry with Exponential Backoff**: Retries up to 3 times (500ms, 1000ms, 2000ms).
* **Provider Fallback**: From Provider A (70% success) to Provider B (80% success).
* **Rate Limiting**: 5 emails per 10 seconds.
* **Circuit Breaker**: Stops sending after 3 failures, 30s cooldown.
* **Idempotency**: Prevents duplicate sends using email IDs.

---

## 🖥️ Technologies Used

* JavaScript (ES6+)
* Node.js
* Jest

No external email services required — uses mock providers.

---

## 📈 Future Improvements

* Integrate real email services (SendGrid, AWS SES).
* Advanced logging (Winston, Loggly).
* Metrics monitoring (success/failure rates, latency).
* Bulk email batching.
* Use environment variables for config.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo.
2. Create a branch:

   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes:

   ```bash
   git commit -m "Add your feature"
   ```
4. Push and open a Pull Request:

   ```bash
   git push origin feature/your-feature
   ```

Please run `npm test` before submitting.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 📞 Contact

For issues or suggestions, please open an issue via GitHub.

---

Happy Email Sending! 📧

```

---


