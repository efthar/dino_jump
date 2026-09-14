@namespace
class SpriteKind:
    Obstacle = SpriteKind.create()
    Ground = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    game.reset()
sprites.on_overlap(SpriteKind.player, SpriteKind.Obstacle, on_on_overlap)

def on_a_pressed():
    if hero.y >= 106:
        hero.vy = -145
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

block: Sprite = None
ground: Sprite = None
hero: Sprite = None
scene.set_background_color(3)
game.splash("Untitled")
hero = sprites.create(img("""
        . c c c c c c c c c c c c c c .
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        . c c c c c c c c c c c c c c .
        """),
    SpriteKind.player)
hero.set_position(28, 108)
hero.ay = 360
for i in range(11):
    ground = sprites.create(img("""
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            """),
        SpriteKind.Ground)
    ground.set_flag(SpriteFlag.GHOST, True)
    ground.z = -10
    ground.x = i * 16 + 8
    ground.top = 108

def on_on_update():
    if hero.y > 108:
        hero.y = 108
        hero.vy = 0
game.on_update(on_on_update)

def on_update_interval():
    global block
    block = sprites.create_projectile(img("""
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            2 2 2 2 2 2
            """),
        -90,
        0,
        SpriteKind.Obstacle)
    block.set_position(scene.screen_width(), 108)
game.on_update_interval(1200, on_update_interval)
