#renderer
# renderer.py
# Comm-Array image renderer

from PIL import Image

from palettes import get_color
from waves import normalized_wave


def clamp(value, minimum=0, maximum=255):
    return max(minimum, min(maximum, int(value)))


def modify_color(color, wave_value):
    """
    Shift brightness according to the wave field.

    Positive wave values brighten the field.
    Negative values deepen it.
    """

    strength = wave_value * 24

    red = clamp(color[0] + strength)
    green = clamp(color[1] + strength * 0.75)
    blue = clamp(color[2] + strength * 1.15)

    return red, green, blue


def render_frame(
    width=960,
    height=540,
    time=0.0
):
    """
    Render one Comm-Array twilight field.
    """

    image = Image.new(
        "RGB",
        (width, height)
    )

    pixels = image.load()

    for y in range(height):

        vertical_position = y / (height - 1)

        base_color = get_color(
            vertical_position
        )

        for x in range(width):

            wave = normalized_wave(
                x,
                y,
                time
            )

            final_color = modify_color(
                base_color,
                wave
            )

            pixels[x, y] = final_color

    return image


def save_frame(
    filename,
    width=960,
    height=540,
    time=0.0
):
    """
    Render and save one frame.
    """

    image = render_frame(
        width,
        height,
        time
    )

    image.save(filename)

    print(
        f"Comm-Array rendered: {filename}"
    )