/* ============================================================
   REGIONAL.JS — TRINITY CONTROLLER
   Magnetar (structure)
   Comm-Array (signal)
   Viromancy (reactive)
   ------------------------------------------------------------
   This file coordinates the three subsystems and provides
   cross-system dispatch, synchronization, and shared state.
   ============================================================ */

const Regional = (() => {

    /* --------------------------------------------------------
       INTERNAL STATE
    -------------------------------------------------------- */
    let currentSubsystem = null;
    let lastEvent = null;

    const state = {
        magnetar: { active: false },
        comm: { active: false },
        viro: { active: false }
    };

    /* --------------------------------------------------------
       LOGGING (cosmic-tech style)
    -------------------------------------------------------- */
    function log(msg) {
        console.log(`[Regional] ${msg}`);
        lastEvent = msg;
    }

    /* --------------------------------------------------------
       SUBSYSTEM ACTIVATION
    -------------------------------------------------------- */
    function activate(subsystem) {
        if (!["Magnetar", "CommArray", "Viromancy"].includes(subsystem)) {
            log(`Unknown subsystem '${subsystem}'`);
            return;
        }

        currentSubsystem = subsystem;

        // Update internal state
        Object.keys(state).forEach(key => state[key].active = false);

        if (subsystem === "Magnetar") state.magnetar.active = true;
        if (subsystem === "CommArray") state.comm.active = true;
        if (subsystem === "Viromancy") state.viro.active = true;

        log(`Activated subsystem: ${subsystem}`);
    }

    /* --------------------------------------------------------
       DISPATCH (cross-subsystem communication)
    -------------------------------------------------------- */
    function dispatch(target, payload = {}) {
        log(`Dispatch → ${target}`);

        switch (target) {

            /* ---------------- Magnetar ---------------- */
            case "Magnetar.pulse":
                if (typeof Magnetar !== "undefined") {
                    Magnetar.pulse(payload.strength || 1);
                }
                break;

            case "Magnetar.highlight":
                if (typeof Magnetar !== "undefined") {
                    Magnetar.highlight(payload.id);
                }
                break;

            /* ---------------- Comm-Array ---------------- */
            case "CommArray.signal":
                if (typeof CommArray !== "undefined") {
                    CommArray.activateNode(payload.node);
                }
                break;

            case "CommArray.route":
                if (typeof CommArray !== "undefined") {
                    CommArray.activateRoute(payload.index);
                }
                break;

            /* ---------------- Viromancy ---------------- */
            case "Viromancy.corrupt":
                if (typeof Viromancy !== "undefined") {
                    Viromancy.corrupt(payload.id);
                }
                break;

            case "Viromancy.mutate":
                if (typeof Viromancy !== "undefined") {
                    Viromancy.mutate(payload.id);
                }
                break;

            case "Viromancy.cleanse":
                if (typeof Viromancy !== "undefined") {
                    Viromancy.cleanse(payload.id);
                }
                break;

            /* ---------------- Unknown ---------------- */
            default:
                log(`Unknown dispatch target '${target}'`);
        }
    }

    /* --------------------------------------------------------
       SYNCHRONIZED EVENTS (Trinity fusion behaviors)
    -------------------------------------------------------- */
    function syncPulse(id) {
        log(`Sync pulse triggered for '${id}'`);

        // Magnetar pulse
        if (typeof Magnetar !== "undefined") {
            Magnetar.pulse(0.8);
        }

        // Comm-Array signal
        if (typeof CommArray !== "undefined") {
            CommArray.activateNode("node-1");
        }

        // Viromancy mutation
        if (typeof Viromancy !== "undefined") {
            Viromancy.mutate(id);
        }
    }

    function syncCorrupt(id) {
        log(`Sync corruption triggered for '${id}'`);

        if (typeof CommArray !== "undefined") {
            CommArray.errorNode("node-4");
        }

        if (typeof Viromancy !== "undefined") {
            Viromancy.corrupt(id);
        }
    }

    /* --------------------------------------------------------
       PUBLIC API
    -------------------------------------------------------- */
    return {
        activate,
        dispatch,
        syncPulse,
        syncCorrupt,
        state
    };

})();
