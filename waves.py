#waves
# waves.py
# Comm-Array wave-field mathematics

import math


def sine_wave(
    x,
    time=0.0,
    amplitude=1.0,
    wavelength=100.0,
    speed=1.0,
    phase=0.0
):
    """
    Generate one traveling sine wave.
    """

    angle = (
        (x / wavelength) * math.tau
        + (time * speed)
        + phase
    )

    return math.sin(angle) * amplitude


def layered_wave(x, y, time=0.0):
    """
    Combine several gentle wave frequencies
    into one Comm-Array field.
    """

    wave_1 = sine_wave(
        x,
        time,
        amplitude=18,
        wavelength=260,
        speed=0.35
    )

    wave_2 = sine_wave(
        x,
        time,
        amplitude=10,
        wavelength=130,
        speed=-0.22,
        phase=1.4
    )

    wave_3 = sine_wave(
        x + y * 0.25,
        time,
        amplitude=6,
        wavelength=80,
        speed=0.15,
        phase=2.2
    )

    return wave_1 + wave_2 + wave_3


def normalized_wave(x, y, time=0.0):
    """
    Convert the combined wave field
    approximately into the range -1.0 to 1.0.
    """

    value = layered_wave(x, y, time)

    maximum_amplitude = 34.0

    return max(
        -1.0,
        min(1.0, value / maximum_amplitude)
    )