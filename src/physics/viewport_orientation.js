export function normalizeOrientation(beta, gamma) {
  const clampedBeta = Math.max(-45, Math.min(45, beta || 0));
  const clampedGamma = Math.max(-45, Math.min(45, gamma || 0));
  return {
    pitch: clampedBeta / 45,
    roll: clampedGamma / 45
  };
}
