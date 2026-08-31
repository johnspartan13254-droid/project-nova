import pygame
import math
import sys

pygame.init()

WIDTH = 960
HEIGHT = 540
FPS = 60

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Comm-Array — Twilight Field")

clock = pygame.time.Clock()

# --------------------------------------------------
# TWILIGHT PALETTE
# top -> bottom
# --------------------------------------------------

PALETTE = [
    (245, 168, 118),   # sunset peach
    (216, 111, 137),   # rose
    (132, 87, 145),    # violet
    (61, 72, 125),     # indigo
    (12, 28, 55),      # deep ocean blue
]


# --------------------------------------------------
# COLOR HELPERS
# --------------------------------------------------

def lerp(a, b, amount):
    return int(a + (b - a) * amount)


def blend_color(color_a, color_b, amount):
    return (
        lerp(color_a[0], color_b[0], amount),
        lerp(color_a[1], color_b[1], amount),
        lerp(color_a[2], color_b[2], amount),
    )


def palette_color(position):
    """
    position:
        0.0 = top of field
        1.0 = bottom of field
    """

    position = max(0.0, min(1.0, position))

    sections = len(PALETTE) - 1
    scaled = position * sections

    index = min(int(scaled), sections - 1)
    local_amount = scaled - index

    return blend_color(
        PALETTE[index],
        PALETTE[index + 1],
        local_amount
    )


# --------------------------------------------------
# BLACKOUT + PARTICLE MASK SETUP
# --------------------------------------------------

blackout = pygame.Surface((WIDTH, HEIGHT))
blackout.fill((0, 0, 0))

particle_mask = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)

def draw_particles(mask_surface):
    mask_surface.fill((0, 0, 0, 0))  # clear previous frame

    for _ in range(40):  # number of particles
        x = random.randint(0, WIDTH)
        y = random.randint(0, HEIGHT)
        r = random.randint(4, 10)

        # draw white circles (these become "holes" in the blackout)
        pygame.draw.circle(mask_surface, (255, 255, 255, 180), (x, y), r)

    # blur effect using smoothscale trick
    small = pygame.transform.smoothscale(mask_surface, (WIDTH//4, HEIGHT//4))
    blurred = pygame.transform.smoothscale(small, (WIDTH, HEIGHT))
    return blurred


	
# --------------------------------------------------
# STATIC TWILIGHT GRADIENT
# --------------------------------------------------

def create_gradient():
    surface = pygame.Surface((WIDTH, HEIGHT))

    for y in range(HEIGHT):
        position = y / (HEIGHT - 1)
        color = palette_color(position)

        pygame.draw.line(
            surface,
            color,
            (0, y),
            (WIDTH, y)
        )

    return surface


gradient = create_gradient()

# --------------------------------------------------
# MOVING FIELD
# --------------------------------------------------

def draw_wave(surface, time_value,
              center_y,
              amplitude,
              wavelength,
              speed,
              thickness,
              alpha):

    wave_surface = pygame.Surface(
        (WIDTH, HEIGHT),
        pygame.SRCALPHA
    )

    upper_points = []
    lower_points = []

    for x in range(0, WIDTH + 8, 8):

        phase = (
            (x / wavelength)
            + time_value * speed
        )

        y = (
            center_y
            + math.sin(phase) * amplitude
            + math.sin(phase * 0.47 + 1.8)
            * amplitude * 0.35
        )

        upper_points.append(
            (x, y - thickness)
        )

        lower_points.append(
            (x, y + thickness)
        )

    polygon = upper_points + lower_points[::-1]

    pygame.draw.polygon(
        wave_surface,
        (255, 220, 210, alpha),
        polygon
    )

    surface.blit(wave_surface, (0, 0))


# --------------------------------------------------
# MAIN LOOP
# --------------------------------------------------

# ----------------------------------------------
# BACKGROUND (Twilight Field)
# ----------------------------------------------
screen.blit(gradient, (0, 0))

# ----------------------------------------------
# WAVES (your resonance field)
# ----------------------------------------------
draw_wave(screen, time_value, 220, 20, 115, 0.45, 28, 20)
draw_wave(screen, time_value, 310, 28, 150, -0.32, 38, 18)
draw_wave(screen, time_value, 400, 16, 90, 0.24, 45, 14)

# ----------------------------------------------
# PARTICLE MASK (snowflakes / raindrops)
# ----------------------------------------------
blurred_mask = draw_particles(particle_mask)

# ----------------------------------------------
# BLACKOUT COMPOSITING
# ----------------------------------------------
# Where mask is bright → show Twilight Field
# Where mask is dark → show blackout
screen.blit(blackout, (0, 0))
screen.blit(blurred_mask, (0, 0), special_flags=pygame.BLEND_RGBA_SUB)


    # ----------------------------------------------
    # TIME
    # ----------------------------------------------

    dt = clock.tick(FPS) / 1000.0
    time_value += dt


    # ----------------------------------------------
    # BACKGROUND
    # ----------------------------------------------

    screen.blit(gradient, (0, 0))


    # ----------------------------------------------
    # THREE SLOW SWELLS
    # ----------------------------------------------

    draw_wave(
        screen,
        time_value,
        center_y=220,
        amplitude=20,
        wavelength=115,
        speed=0.45,
        thickness=28,
        alpha=20
    )

    draw_wave(
        screen,
        time_value,
        center_y=310,
        amplitude=28,
        wavelength=150,
        speed=-0.32,
        thickness=38,
        alpha=18
    )

    draw_wave(
        screen,
        time_value,
        center_y=400,
        amplitude=16,
        wavelength=90,
        speed=0.24,
        thickness=45,
        alpha=14
    )


    pygame.display.flip()


pygame.quit()
sys.exit()

# comm-array
# Heartbeat 01: Twilight Field
from pathlib import Path
from renderer import save_frame

OUTPUT = Path(__file__).parent / "output"
OUTPUT.mkdir(exist_ok=True)

filename = OUTPUT / "comm_array_twilight.png"

print("Saving to:")
print(filename.resolve())

save_frame(
    filename,
    width=960,
    height=540,
    time=0.0
)

print("Finished.")