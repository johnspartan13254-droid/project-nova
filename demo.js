/* =========================================================
   PROJECT NOVA — Lava → Orange → Cyan
   Companion JavaScript

   Motion Grammar:
   ATTACK → DECAY → SUSTAIN → RELEASE → RETURN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const orb = document.querySelector(".nova-orb");

  if (!orb) {
    console.warn("Project Nova: .nova-orb not found.");
    return;
  }


  /* =======================================================
     CONFIGURATION
     Keep this synchronized with --nova-cycle in the CSS.
     ======================================================= */

  const NOVA = {
    cycle: 2200,

    phases: [
      {
        name: "ATTACK",
        label: "Ignition",
        start: 0
      },
      {
        name: "DECAY",
        label: "Rise",
        start: 0.25
      },
      {
        name: "SUSTAIN",
        label: "Resonance Peak",
        start: 0.50
      },
      {
        name: "RELEASE",
        label: "Cyan Dissipation",
        start: 0.75
      }
    ]
  };const NOVA = {
  phaseDuration: 2200,
  cycle: 8800,

  phases: [
    {
      name: "ATTACK",
      label: "Ignition",
      start: 0
    },
    {
      name: "DECAY",
      label: "Rise",
      start: 0.25
    },
    {
      name: "SUSTAIN",
      label: "Resonance Peak",
      start: 0.50
    },
    {
      name: "RELEASE",
      label: "Cyan Dissipation",
      start: 0.75
    }
  ]
};


  /* =======================================================
     STATE
     ======================================================= */

  let cycleStart = performance.now();
  let currentPhase = null;
  let running = true;
  let animationFrame = null;


  /* =======================================================
     DETERMINE ADSR PHASE
     ======================================================= */

  function getPhase(progress) {

    if (progress < 0.25) {
      return NOVA.phases[0];
    }

    if (progress < 0.50) {
      return NOVA.phases[1];
    }

    if (progress < 0.75) {
      return NOVA.phases[2];
    }

    return NOVA.phases[3];
  }


  /* =======================================================
     PHASE CHANGE
     ======================================================= */

  function changePhase(phase) {

    if (currentPhase === phase.name) {
      return;
    }

    currentPhase = phase.name;

    orb.dataset.phase = phase.name.toLowerCase();

    /*
      Dispatch a custom event so other Nova systems
      can react without being tightly coupled to the orb.
    */

    orb.dispatchEvent(
      new CustomEvent("novaPhaseChange", {
        detail: {
          phase: phase.name,
          label: phase.label
        }
      })
    );
  }


  /* =======================================================
     ANIMATION CLOCK
     ======================================================= */

  function update(time) {

    if (!running) {
      return;
    }

    const elapsed = time - cycleStart;

    const cyclePosition =
      (elapsed % NOVA.cycle) / NOVA.cycle;

    const phase = getPhase(cyclePosition);

    changePhase(phase);

    /*
      Expose normalized progress to CSS / other systems.

      0.000 → 1.000
    */

    orb.style.setProperty(
      "--nova-progress",
      cyclePosition.toFixed(3)
    );

    animationFrame =
      requestAnimationFrame(update);
  }


  /* =======================================================
     PLAY / PAUSE
     ======================================================= */

  function pauseNova() {

    running = false;

    cancelAnimationFrame(animationFrame);

    orb.style.animationPlayState = "paused";

    orb.dataset.state = "paused";
  }


  function playNova() {

    if (running) {
      return;
    }

    running = true;

    cycleStart = performance.now();

    orb.style.animationPlayState = "running";

    orb.dataset.state = "running";

    animationFrame =
      requestAnimationFrame(update);
  }


  /* =======================================================
     INTERACTION

     Click the orb to pause/resume the motion grammar.
     ======================================================= */

  orb.addEventListener("click", () => {

    if (running) {
      pauseNova();
    } else {
      playNova();
    }

  });


  /* =======================================================
     NOVA PHASE EVENT

     This is where sound, particles, fractals, gradients,
     text, or other Project Nova systems can eventually
     synchronize with the ADSR envelope.
     ======================================================= */

  orb.addEventListener("novaPhaseChange", (event) => {

    const { phase, label } = event.detail;

    console.log(
      `[NOVA] ${phase} — ${label}`
    );

  });


  /* =======================================================
     START
     ======================================================= */

  orb.dataset.state = "running";

  animationFrame =
    requestAnimationFrame(update);

});