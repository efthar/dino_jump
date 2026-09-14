namespace SpriteKind {
    export const Obstacle = SpriteKind.create()
    export const Ground = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (hero.y >= 106) {
        hero.vy = -200
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    if (hero.overlapsWith(otherSprite)) {
        sprites.destroy(otherSprite, effects.ashes, 100)
    }
})
info.onScore(20, function () {
    game.gameOver(true)
    game.reset()
})
// =============================
// DÜŞMAN VURUŞU
// =============================
sprites.onOverlap(SpriteKind.Player, SpriteKind.Obstacle, function (hero_sprite, enemy_sprite) {
    info.changeLifeBy(-1)
    enemy_sprite.destroy(effects.disintegrate, 200)
})
let block: Sprite = null
let coin: Sprite = null
let ground: Sprite = null
let hero: Sprite = null
info.setScore(0)
info.setLife(3)
scene.setBackgroundColor(0)
game.splash("Untitled")
hero = sprites.create(img`
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    cccccccccccccccccccc
    `, SpriteKind.Player)
hero.setPosition(28, 108)
hero.ay = 360
for (let i = 0; i <= 10; i++) {
    ground = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        d d d d d d d d d d d d d d d d 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        `, SpriteKind.Ground)
    ground.setFlag(SpriteFlag.Ghost, true)
    ground.z = -10
    ground.x = i * 16 + 8
    ground.top = 108
}
hero.setImage(img`
    ..............ccccccccc........
    ............cc555555555cc......
    ...........c5555555555555c.....
    ..........c55555555555555dc....
    .........c555555555555b5bdc....
    .........555bc1555555555bdcccc.
    ........c555ccc55555555bbdccddc
    ........c555bcb5555555ccddcdddc
    .......c555555555551ccccddbdddc
    .......c555555b555c1cccbddbbdbc
    .......c5555555bbc33333ddddbcc.
    .......c555555555bc333555ddbc..
    .......c5555555555555555555c...
    .......cd555555555555cccc555c..
    .......cd55555555555c555c555c..
    .......cdd555555555b5555b555c..
    .......cddd55555ddbb555bb555c..
    .......cdddd55555555555b5555c..
    .......cddddd5555555ddb5555dc..
    c......cdddddd555555555555dcc..
    cc...ccddddddd555555555555dc...
    cdccccdddddd555555d55555ddcc...
    cdddddddddbd5555555ddddddccccc.
    ccdddddddbb55555555bddddccbddc.
    .ccddddddbd55555555bdddccdddc..
    ..cccddddbd5555555cddcccddbc...
    ....ccccccd555555bcccc.cccc....
    .........cc555555bc............
    .........cc55555555c...........
    ..........cccccccccc...........
    `)
game.onUpdate(function () {
    if (hero.y > 108) {
        hero.y = 108
        hero.vy = 0
    }
})
game.onUpdateInterval(1000, function () {
    coin = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . c c c . . . . . . . . . 
        . . . c 4 4 4 c . . . . . . . . 
        . . c 4 e c b b c c c c c . . . 
        . . c 4 c . e 4 1 4 4 4 4 c . . 
        . . c e e e 4 e 1 c e e e c . . 
        . . . c e 4 e c . c c c e . . . 
        . . . . c c c . . . . f f . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    coin.setVelocity(-90, 0)
    coin.setPosition(160, 80)
})
game.onUpdateInterval(1200, function () {
    block = sprites.createProjectile(img`
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        6 6 6 6 6 6 
        `, -90, 0, SpriteKind.Obstacle)
    block.setPosition(scene.screenWidth(), 108)
})
