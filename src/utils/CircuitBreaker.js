class CircuitBreaker {
  constructor(threshold, resetTime) {
    this.threshold = threshold;
    this.resetTime = resetTime;
    this.failures = 0;
    this.open = false;
  }

  success() {
    this.failures = 0;
    this.open = false;
  }

  fail() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.open = true;
      console.log("Circuit breaker opened");
      setTimeout(() => this.reset(), this.resetTime);
    }
  }

  canRequest() {
    return !this.open;
  }

  reset() {
    console.log("Circuit breaker reset");
    this.failures = 0;
    this.open = false;
  }
}

module.exports = { CircuitBreaker };
