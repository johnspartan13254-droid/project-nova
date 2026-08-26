// -------------------------------------------------------------
//  KUTULU RESONANCE ENGINE
//  Travis + Copilot — Project Nova / Kutulu System
// -------------------------------------------------------------

//  Z-Axis Outcomes
export const OUTCOME = {
  MATCH: "match",          // control / clarity
  OPPOSITION: "opposition",// disruption / break
  NEUTRAL: "neutral",      // stabilization / damping
  UV: "uv"                 // corruption / wildcard
};

//  Archetype Bias Map (from your confirmed binding layer)
export const ARCHETYPE_BIAS = {
  warner: OUTCOME.MATCH,
  combs: OUTCOME.OPPOSITION,
  zann: OUTCOME.NEUTRAL,
  marduk: OUTCOME.UV
};

// -------------------------------------------------------------
//  RESONANCE CALCULATION
//  Interaction = Color vs Color + Intensity → Outcome
// -------------------------------------------------------------

export function calculateResonance(playerColor, entityColor, intensity = 1) {
  // White = Neutral stabilizer
  if (playerColor === "white" || entityColor === "white") {
    return OUTCOME.NEUTRAL;
  }

  // UV corruption overrides everything
  if (playerColor === "uv" || entityColor === "uv") {
    return OUTCOME.UV;
  }

  // Same color → MATCH
  if (playerColor === entityColor) {
    return OUTCOME.MATCH;
  }

  // Opposing colors → OPPOSITION
  // (You can expand this into a full color-wheel later)
  return OUTCOME.OPPOSITION;
}

// -------------------------------------------------------------
//  APPLY OUTCOME TO SYSTEM LAYERS
//  Behavior, Visual, Sound, Perception
// -------------------------------------------------------------

export function applyBehavior(outcome, entityState) {
  switch (outcome) {
    case OUTCOME.MATCH:
      return { ...entityState, aggression: 0, clarity: 1 };
    case OUTCOME.OPPOSITION:
      return { ...entityState, aggression: 1, distortion:
	  
  // optional hover flip behavior
  document.querySelector('.flip-card').addEventListener('mouseenter', () => {
    document.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
  });
  document.querySelector('.flip-card').addEventListener('mouseleave', () => {
    document.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
  });	  