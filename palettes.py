#palettes
# palettes.py
# Comm-Array color palettes


CAROLINA_TWILIGHT = [
    (250, 187, 122),   # sunset gold
    (239, 143, 118),   # coral
    (205, 101, 137),   # rose
    (139, 91, 153),    # violet
    (75, 76, 132),     # indigo
    (35, 53, 91),      # twilight blue
    (10, 25, 48),      # deep ocean
]


def lerp(a, b, amount):
    """Linear interpolation between two numbers."""
    return a + (b - a) * amount


def blend_color(color_a, color_b, amount):
    """Blend between two RGB colors."""

    return tuple(
        int(lerp(color_a[i], color_b[i], amount))
        for i in range(3)
    )


def get_color(position, palette=CAROLINA_TWILIGHT):
    """
    Return a color from the palette.

    position:
        0.0 = beginning of palette
        1.0 = end of palette
    """

    position = max(0.0, min(1.0, position))

    sections = len(palette) - 1
    scaled = position * sections

    index = min(int(scaled), sections - 1)
    local_position = scaled - index

    return blend_color(
        palette[index],
        palette[index + 1],
        local_position
    )