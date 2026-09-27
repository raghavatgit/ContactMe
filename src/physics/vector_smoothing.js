export class VectorSmoothing {
  constructor(alpha = 0.15) {
    this.alpha = alpha;
    this.current = { x: 0, y: 0 };
  }

  update(targetX, targetY) {
    this.current.x += (targetX - this.current.x) * this.alpha;
    this.current.y += (targetY - this.current.y) * this.alpha;
    return this.current;
  }
}
