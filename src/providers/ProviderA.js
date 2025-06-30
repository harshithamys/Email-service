class ProviderA {
  async sendEmail(to, subject, body) {
    console.log(`ProviderA sending to ${to}`);
    if (Math.random() < 0.7) return true;
    throw new Error("ProviderA failed");
  }
}

module.exports = { ProviderA };
