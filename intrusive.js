class IntrusiveSystem {
  constructor(rate) {
    this.rate = rate;
    this.thoughts = [];
  }

  update() {
    if (frameCount % this.rate === 0) {
      this.thoughts.push({
        text: random([
          "You're too slow.",
          "They think you're awkward.",
          "Why did you say that?",
          "Did you forget something?",
          "You're messing up.",
        ]),
        x: random(width),
        y: random(height),
      });
    }
  }

  display() {
    for (let t of this.thoughts) {
      fill(255, 200);
      rect(t.x, t.y, 200, 40, 5);
      fill(0);
      text(t.text, t.x + 10, t.y + 20);
    }
  }

  handleClick(mx, my) {
    this.thoughts = this.thoughts.filter(
      (t) => !(mx > t.x && mx < t.x + 200 && my > t.y && my < t.y + 40),
    );
  }
}
