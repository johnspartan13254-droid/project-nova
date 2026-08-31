# comm-array
# Heartbeat 01: Twilight Field
import pygame
import math
import random
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
# PARTICLES
# --------------------------------------------------

particles = []

for _ in range(40):
    particles.append({
        "x": random.uniform(0, WIDTH),
        "y": random.uniform(0, HEIGHT),
        "speed": random.uniform(20, 55),
        "drift": random.uniform(-10, 10),
        "radius": random.randint(4, 10),
    })


def update_particles(dt):
    for particle in particles:
        particle["y"] += particle["speed"] * dt
        particle["x"] += particle["drift"] * dt

        # wrap vertically
        if particle["y"] > HEIGHT + 10:
            particle["y"] = -10
            particle["x"] = random.uniform(0, WIDTH)

        # wrap horizontally
        if particle["x"] < -10:
            particle["x"] = WIDTH + 10

        elif particle["x"] > WIDTH + 10:
            particle["x"] = -10

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

def draw_particles(mask_surface):
    mask_surface.fill((0, 0, 0, 0))

    for particle in particles:
        pygame.draw.circle(
            mask_surface,
            (255, 255, 255, 180),
            (
                int(particle["x"]),
                int(particle["y"])
            ),
            particle["radius"]
        )

    small = pygame.transform.smoothscale(
        mask_surface,
        (WIDTH // 4, HEIGHT // 4)
    )

    blurred = pygame.transform.smoothscale(
        small,
        (WIDTH, HEIGHT)
    )

    return blurred

# --------------------------------------------------
# MAIN LOOP
# --------------------------------------------------

running = True
time_value = 0.0

while running:

    # ----------------------------------------------
    # EVENTS
    # ----------------------------------------------

    for event in pygame.event.get():

        if event.type == pygame.QUIT:
            running = False

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                running = False


    # ----------------------------------------------
    # TIME
    # ----------------------------------------------

    dt = clock.tick(FPS) / 1000.0
    time_value += dt


    # ----------------------------------------------
    # UPDATE PARTICLES
    # ----------------------------------------------

    update_particles(dt)


    # ----------------------------------------------
    # TWILIGHT FIELD
    # ----------------------------------------------

    screen.blit(gradient, (0, 0))


    # ----------------------------------------------
    # RESONANCE WAVES
    # ----------------------------------------------

    draw_wave(
        screen,
        time_value,
        220,
        20,
        115,
        0.45,
        28,
        20
    )

    draw_wave(
        screen,
        time_value,
        310,
        28,
        150,
        -0.32,
        38,
        18
    )

    draw_wave(
        screen,
        time_value,
        400,
        16,
        90,
        0.24,
        45,
        14
    )


    # ----------------------------------------------
    # DISPLAY
    # ----------------------------------------------

    pygame.display.flip()


pygame.quit()
sys.exit()
