/* ===== script.js: 3D Spatial Environment & Interactions ===== */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// ── Three.js Elite Galaxy Background ─────────────────────
const canvas = document.getElementById('particles');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const particlesCount = 3500;
const positions = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

const colorPalette = [
  new THREE.Color('#c13584'),
  new THREE.Color('#5865F2'),
  new THREE.Color('#0077b5'),
  new THREE.Color('#f77737'),
  new THREE.Color('#e0c3fc')
];

for(let i = 0; i < particlesCount * 3; i+=3) {
    // Generate particles in a spherical/galactic distribution
    const r = 15 * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i] = r * Math.sin(phi) * Math.cos(theta);
    positions[i+1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i+2] = r * Math.cos(phi);

    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i] = color.r;
    colors[i+1] = color.g;
    colors[i+2] = color.b;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const particlesMesh = new THREE.Points(geometry, material);
scene.add(particlesMesh);

camera.position.z = 5;

const clock = new THREE.Clock();
let currentRotationX = 0;
let currentRotationY = 0;
let targetRotationX = 0;
let targetRotationY = 0;

function animateParticles() {
    requestAnimationFrame(animateParticles);
    const elapsedTime = clock.getElapsedTime();
    
    // Interactive parallax tied to mouse (much more pronounced now)
    const normalizedMouseX = (mouseX / window.innerWidth) - 0.5;
    const normalizedMouseY = (mouseY / window.innerHeight) - 0.5;
    
    // Subtle movement
    targetRotationX = normalizedMouseY * 0.5;
    targetRotationY = normalizedMouseX * 1.0;
    
    // Smoothly interpolate current rotation towards target
    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;
    
    // Apply smooth mouse tracking + continuous slow galactic spin
    particlesMesh.rotation.x = currentRotationX;
    particlesMesh.rotation.y = (elapsedTime * 0.08) + currentRotationY;
    particlesMesh.rotation.z = elapsedTime * 0.02;
    
    renderer.render(scene, camera);
}
animateParticles();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ── Vanilla Tilt 3D Effects ──────────────────────────────

// Profile panel: hero card with pronounced 3D tilt
VanillaTilt.init(document.querySelector("#profile-panel"), {
  max: 15,
  speed: 600,
  glare: true,
  "max-glare": 0.2,
  scale: 1.03,
  perspective: 1200,
  easing: "cubic-bezier(.03,.98,.52,.99)",
  transition: true,
  gyroscope: true
});

// Other interactive cards: subtler tilt
VanillaTilt.init(document.querySelectorAll(".link-card, .currently-card, .bio, .quote-section, .chip"), {
  max: 10,
  speed: 800,
  glare: true,
  "max-glare": 0.12,
  scale: 1.02,
  perspective: 1500,
  easing: "cubic-bezier(.03,.98,.52,.99)",
  transition: true
});

// ── Ripple on click (Elite style) ─────────────────────────
const cards = document.querySelectorAll('.link-card, .currently-card');
cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect   = card.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%);
      transform: translate(-50%, -50%) scale(0);
      left: ${e.clientX - rect.left}px;
      top:  ${e.clientY - rect.top}px;
      animation: eliteRipple 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
      pointer-events: none;
      z-index: 10;
    `;

    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  });
});

// Inject ripple keyframe with single-instance DOM guard
if (!document.getElementById('elite-ripple-style')) {
  const style = document.createElement('style');
  style.id = 'elite-ripple-style';
  style.textContent = `
    @keyframes eliteRipple {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}
