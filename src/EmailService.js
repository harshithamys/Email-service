const { ProviderA } = require('./providers/ProviderA');
const { ProviderB } = require('./providers/ProviderB');
const { RateLimiter } = require('./utils/RateLimiter');
const { CircuitBreaker } = require('./utils/CircuitBreaker');

class EmailService {
  constructor() {
    this.providerA = new ProviderA();
    this.providerB = new ProviderB();
    this.rateLimiter = new RateLimiter(5, 10000); // 5 emails per 10 sec
    this.circuitBreaker = new CircuitBreaker(3, 30000); // fail threshold 3
    this.sentEmails = new Set();
    this.statusMap = new Map();
  }

  async sendEmail(email) {
    if (this.sentEmails.has(email.id)) {
      console.log("Idempotent: Email already sent.");
      return;
    }

    if (!this.rateLimiter.isAllowed()) {
      console.log("Rate limit exceeded.");
      this.statusMap.set(email.id, "RateLimited");
      return;
    }

    if (!this.circuitBreaker.canRequest()) {
      console.log("Circuit breaker open.");
      this.statusMap.set(email.id, "SkippedDueToCircuitBreaker");
      return;
    }

    this.statusMap.set(email.id, "InProgress");

    try {
      await this.trySendWithRetry(email);
      this.sentEmails.add(email.id);
      this.statusMap.set(email.id, "Sent");
      this.circuitBreaker.success();
    } catch {
      this.statusMap.set(email.id, "Failed");
      this.circuitBreaker.fail();
    }
  }

  async trySendWithRetry(email, retries = 3, delay = 500) {
    try {
      await this.providerA.sendEmail(email.to, email.subject, email.body);
      console.log("Sent via ProviderA");
    } catch {
      console.log("ProviderA failed, trying ProviderB...");
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          await this.sleep(delay * Math.pow(2, attempt));
          await this.providerB.sendEmail(email.to, email.subject, email.body);
          console.log(`Sent via ProviderB on attempt ${attempt}`);
          return;
        } catch (err) {
          if (attempt === retries) throw err;
        }
      }
    }
  }

  getStatus(id) {
    return this.statusMap.get(id) || "Unknown";
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = { EmailService };
