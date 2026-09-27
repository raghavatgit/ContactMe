export class DampedSpringIntegrator {
  constructor(stiffness = 120, damping = 14) {
    this.stiffness = stiffness;
    this.damping = damping;
    this.pos = 0;
    this.vel = 0;
  }

  step(target, dt) {
    const force = -this.stiffness * (this.pos - target);
    const dampingForce = -this.damping * this.vel;
    const accel = force + dampingForce;
    this.vel += accel * dt;
    this.pos += this.vel * dt;
    return this.pos;
  }
}
