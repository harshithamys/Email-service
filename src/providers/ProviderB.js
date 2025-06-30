class ProviderB {
  async sendEmail(to, subject, body) {
    console.log(`ProviderB sending to ${to}`);
    if (Math.random() < 0.8) return true;
    throw new Error("ProviderB failed");
  }
}

module.exports = { ProviderB };
