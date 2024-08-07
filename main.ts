namespace SpriteKind {
    export const Ghost = SpriteKind.create()
    export const Extra = SpriteKind.create()
    export const Lives = SpriteKind.create()
    export const Berry = SpriteKind.create()
    export const Edible = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile3`)
    tiles.setTileAt(location, assets.tile`transparency8`)
    timer.after(500, function () {
        tiles.setTileAt(location, assets.tile`myTile0`)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    score += 10
    music.thump.play()
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . 5 5 5 5 . 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        . 5 5 5 5 . 
        `,img`
        . f f f f . 
        5 f f f f 5 
        5 5 f f 5 5 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        . 5 5 5 5 . 
        `],
    100,
    characterAnimations.rule(Predicate.MovingUp)
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Edible, function (sprite, otherSprite) {
    ghostsEaten += 1
    tiles.placeOnRandomTile(otherSprite, assets.tile`myTile6`)
    animation.stopAnimation(animation.AnimationTypes.All, otherSprite)
    otherSprite.setImage(img`
        . 4 4 4 4 4 4 . 
        4 4 4 4 4 4 4 4 
        4 4 8 4 4 8 4 4 
        4 4 8 4 4 8 4 4 
        4 4 1 4 4 1 4 4 
        4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 
        4 4 . 4 4 . 4 4 
        `)
    otherSprite.setKind(SpriteKind.Ghost)
    otherSprite.startEffect(effects.coolRadial, 500)
    score += 50
    scene.followPath(otherSprite, scene.aStar(tiles.locationOfSprite(otherSprite), tiles.locationOfSprite(mySprite2)), 22)
    timer.after(1000, function () {
        scene.followPath(otherSprite, scene.aStar(tiles.locationOfSprite(otherSprite), tiles.locationOfSprite(mySprite)), 22)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ghost, function (sprite, otherSprite) {
    if (life == 3) {
        life += -1
        lives.setImage(img`
            . 5 5 5 5 . . 5 5 5 5 
            5 5 5 5 . . 5 5 5 5 . 
            5 5 5 . . . 5 5 5 . . 
            5 5 5 . . . 5 5 5 . . 
            5 5 5 5 . . 5 5 5 5 . 
            . 5 5 5 5 . . 5 5 5 5 
            `)
    } else if (life == 2) {
        life += -1
        lives.setImage(img`
            . 5 5 5 5 
            5 5 5 5 . 
            5 5 5 . . 
            5 5 5 . . 
            5 5 5 5 . 
            . 5 5 5 5 
            `)
    } else if (life == 1) {
        life += -1
        lives.setImage(img`
            . . . . . 
            . . . . . 
            . . . . . 
            . . . . . 
            . . . . . 
            . . . . . 
            `)
        if (score >= blockSettings.readNumber("High Score")) {
            blockSettings.writeNumber("High Score", score)
        }
        info.setScore(score)
        game.gameOver(false)
    }
    music.wawawawaa.play()
    animation.runImageAnimation(
    mySprite,
    [img`
        . 5 5 5 5 . 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        . 5 5 5 5 . 
        `,img`
        . 5 5 5 5 . 
        5 5 5 5 f f 
        5 5 5 f f f 
        5 5 5 f f f 
        5 5 5 5 f f 
        . 5 5 5 5 . 
        `,img`
        . 5 5 f f . 
        5 5 5 f f f 
        5 5 5 f f f 
        5 5 5 f f f 
        5 5 5 f f f 
        . 5 5 f f . 
        `,img`
        . f f f f . 
        5 5 f f f f 
        5 5 5 f f f 
        5 5 5 f f f 
        5 5 f f f f 
        . f f f f . 
        `,img`
        . f f f f . 
        f f f f f f 
        f f f f f f 
        f f f f f f 
        f f f f f f 
        . f f f f . 
        `],
    500,
    false
    )
    controller.moveSprite(mySprite, 0, 0)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile5`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Ghost)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Edible)
    timer.after(2500, function () {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        mySprite.setImage(img`
            . 5 5 5 5 . 
            5 5 5 5 5 5 
            5 5 5 5 5 5 
            5 5 5 5 5 5 
            5 5 5 5 5 5 
            . 5 5 5 5 . 
            `)
        controller.moveSprite(mySprite, 30, 30)
        for (let value3 of tiles.getTilesByType(assets.tile`myTile6`)) {
            ghost = sprites.create(img`
                . 4 4 4 4 4 4 . 
                4 4 4 4 4 4 4 4 
                4 4 8 4 4 8 4 4 
                4 4 8 4 4 8 4 4 
                4 4 1 4 4 1 4 4 
                4 4 4 4 4 4 4 4 
                4 4 4 4 4 4 4 4 
                4 4 . 4 4 . 4 4 
                `, SpriteKind.Ghost)
            tiles.placeOnTile(ghost, value3)
            scene.followPath(ghost, scene.aStar(tiles.locationOfSprite(ghost), tiles.locationOfSprite(mySprite)), 22)
        }
    })
})
scene.onPathCompletion(SpriteKind.Edible, function (sprite, location) {
    scene.followPath(sprite, scene.aStar(tiles.locationOfSprite(sprite), tiles.locationOfSprite(mySprite)), 22)
})
function Next_Level () {
    music.powerUp.play()
    tiles.loadMap(tiles.createSmallMap(tilemap`level6`))
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile5`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Ghost)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Edible)
    sprites.destroyAllSpritesOfKind(SpriteKind.Berry)
    for (let value of tiles.getTilesByType(assets.tile`myTile6`)) {
        ghost = sprites.create(img`
            . 4 4 4 4 4 4 . 
            4 4 4 4 4 4 4 4 
            4 4 8 4 4 8 4 4 
            4 4 8 4 4 8 4 4 
            4 4 1 4 4 1 4 4 
            4 4 4 4 4 4 4 4 
            4 4 4 4 4 4 4 4 
            4 4 . 4 4 . 4 4 
            `, SpriteKind.Ghost)
        tiles.placeOnTile(ghost, value)
        scene.followPath(ghost, scene.aStar(tiles.locationOfSprite(ghost), tiles.locationOfSprite(mySprite)), 22)
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . 5 5 5 5 . 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        . 5 5 5 5 . 
        `,img`
        . 5 5 5 5 . 
        f f 5 5 5 5 
        f f f 5 5 5 
        f f f 5 5 5 
        f f 5 5 5 5 
        . 5 5 5 5 . 
        `],
    100,
    characterAnimations.rule(Predicate.MovingLeft)
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile0`)
    tiles.setTileAt(location, assets.tile`transparency8`)
    timer.after(500, function () {
        tiles.setTileAt(location, assets.tile`myTile3`)
    })
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . 5 5 5 5 . 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        . 5 5 5 5 . 
        `,img`
        . 5 5 5 5 . 
        5 5 5 5 f f 
        5 5 5 f f f 
        5 5 5 f f f 
        5 5 5 5 f f 
        . 5 5 5 5 . 
        `],
    100,
    characterAnimations.rule(Predicate.MovingRight)
    )
})
scene.onPathCompletion(SpriteKind.Food, function (sprite, location) {
    scene.followPath(sprite, scene.aStar(tiles.locationOfSprite(sprite), tiles.locationOfSprite(mySprite)), 22)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Berry, function (sprite, otherSprite) {
    music.jumpUp.play()
    otherSprite.destroy()
    berriesEaten += 1
    score += 50
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . 5 5 5 5 . 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        . 5 5 5 5 . 
        `,img`
        . 5 5 5 5 . 
        5 5 5 5 5 5 
        5 5 5 5 5 5 
        5 5 f f 5 5 
        5 f f f f 5 
        . f f f f . 
        `],
    100,
    characterAnimations.rule(Predicate.MovingDown)
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    score += 30
    music.sonar.play()
    if (whichFood == 0) {
        whichFood = 1
        for (let value2 of sprites.allOfKind(SpriteKind.Ghost)) {
            value2.setKind(SpriteKind.Food)
            value2.setImage(img`
                . 8 8 8 8 8 8 . 
                8 8 8 8 8 8 8 8 
                8 8 6 8 8 6 8 8 
                8 8 6 8 8 6 8 8 
                8 8 6 8 8 6 8 8 
                8 8 8 8 8 8 8 8 
                8 8 8 8 8 8 8 8 
                8 8 . 8 8 . 8 8 
                `)
            timer.after(4000, function () {
                if (value2.kind() == SpriteKind.Food) {
                    animation.runImageAnimation(
                    value2,
                    [img`
                        . 9 9 9 9 9 9 . 
                        9 9 9 9 9 9 9 9 
                        9 9 8 9 9 8 9 9 
                        9 9 8 9 9 8 9 9 
                        9 9 8 9 9 8 9 9 
                        9 9 9 9 9 9 9 9 
                        9 9 9 9 9 9 9 9 
                        9 9 . 9 9 . 9 9 
                        `,img`
                        . 8 8 8 8 8 8 . 
                        8 8 8 8 8 8 8 8 
                        8 8 6 8 8 6 8 8 
                        8 8 6 8 8 6 8 8 
                        8 8 6 8 8 6 8 8 
                        8 8 8 8 8 8 8 8 
                        8 8 8 8 8 8 8 8 
                        8 8 . 8 8 . 8 8 
                        `],
                    250,
                    true
                    )
                }
            })
            timer.after(5000, function () {
                if (value2.kind() == SpriteKind.Food) {
                    animation.stopAnimation(animation.AnimationTypes.All, value2)
                    value2.setKind(SpriteKind.Ghost)
                    value2.setImage(img`
                        . 4 4 4 4 4 4 . 
                        4 4 4 4 4 4 4 4 
                        4 4 8 4 4 8 4 4 
                        4 4 8 4 4 8 4 4 
                        4 4 1 4 4 1 4 4 
                        4 4 4 4 4 4 4 4 
                        4 4 4 4 4 4 4 4 
                        4 4 . 4 4 . 4 4 
                        `)
                    whichFood = 0
                }
            })
        }
    } else if (whichFood == 1) {
        whichFood = 0
        for (let value5 of sprites.allOfKind(SpriteKind.Ghost)) {
            value5.setKind(SpriteKind.Edible)
            value5.setImage(img`
                . 8 8 8 8 8 8 . 
                8 8 8 8 8 8 8 8 
                8 8 6 8 8 6 8 8 
                8 8 6 8 8 6 8 8 
                8 8 6 8 8 6 8 8 
                8 8 8 8 8 8 8 8 
                8 8 8 8 8 8 8 8 
                8 8 . 8 8 . 8 8 
                `)
            timer.after(4000, function () {
                if (value5.kind() == SpriteKind.Edible) {
                    animation.runImageAnimation(
                    value5,
                    [img`
                        . 9 9 9 9 9 9 . 
                        9 9 9 9 9 9 9 9 
                        9 9 8 9 9 8 9 9 
                        9 9 8 9 9 8 9 9 
                        9 9 8 9 9 8 9 9 
                        9 9 9 9 9 9 9 9 
                        9 9 9 9 9 9 9 9 
                        9 9 . 9 9 . 9 9 
                        `,img`
                        . 8 8 8 8 8 8 . 
                        8 8 8 8 8 8 8 8 
                        8 8 6 8 8 6 8 8 
                        8 8 6 8 8 6 8 8 
                        8 8 6 8 8 6 8 8 
                        8 8 8 8 8 8 8 8 
                        8 8 8 8 8 8 8 8 
                        8 8 . 8 8 . 8 8 
                        `],
                    250,
                    true
                    )
                }
            })
            timer.after(5000, function () {
                if (value5.kind() == SpriteKind.Edible) {
                    animation.stopAnimation(animation.AnimationTypes.All, value5)
                    value5.setKind(SpriteKind.Ghost)
                    value5.setImage(img`
                        . 4 4 4 4 4 4 . 
                        4 4 4 4 4 4 4 4 
                        4 4 8 4 4 8 4 4 
                        4 4 8 4 4 8 4 4 
                        4 4 1 4 4 1 4 4 
                        4 4 4 4 4 4 4 4 
                        4 4 4 4 4 4 4 4 
                        4 4 . 4 4 . 4 4 
                        `)
                    whichFood = 0
                }
            })
        }
    }
})
scene.onPathCompletion(SpriteKind.Ghost, function (sprite, location) {
    scene.followPath(sprite, scene.aStar(tiles.locationOfSprite(sprite), tiles.locationOfSprite(mySprite)), 22)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    ghostsEaten += 1
    tiles.placeOnRandomTile(otherSprite, assets.tile`myTile6`)
    animation.stopAnimation(animation.AnimationTypes.All, otherSprite)
    otherSprite.setImage(img`
        . 4 4 4 4 4 4 . 
        4 4 4 4 4 4 4 4 
        4 4 8 4 4 8 4 4 
        4 4 8 4 4 8 4 4 
        4 4 1 4 4 1 4 4 
        4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 
        4 4 . 4 4 . 4 4 
        `)
    otherSprite.setKind(SpriteKind.Ghost)
    otherSprite.startEffect(effects.coolRadial, 500)
    score += 50
    scene.followPath(otherSprite, scene.aStar(tiles.locationOfSprite(otherSprite), tiles.locationOfSprite(mySprite2)), 22)
    timer.after(1000, function () {
        scene.followPath(otherSprite, scene.aStar(tiles.locationOfSprite(otherSprite), tiles.locationOfSprite(mySprite)), 22)
    })
})
let berry: Sprite = null
let berriesEaten = 0
let ghostsEaten = 0
let gameStarted = false
let whichFood = 0
let life = 0
let lives: Sprite = null
let mySprite2: Sprite = null
let ghost: Sprite = null
let mySprite: Sprite = null
let score = 0
if (!(blockSettings.exists("High Score"))) {
    blockSettings.writeNumber("High Score", 0)
}
let level = 1
score = 0
tiles.loadMap(tiles.createSmallMap(tilemap`level6`))
mySprite = sprites.create(img`
    . 5 5 5 5 . 
    5 5 5 5 5 5 
    5 5 5 5 5 5 
    5 5 5 5 5 5 
    5 5 5 5 5 5 
    . 5 5 5 5 . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 30, 30)
tiles.placeOnRandomTile(mySprite, assets.tile`myTile5`)
for (let value4 of tiles.getTilesByType(assets.tile`myTile6`)) {
    ghost = sprites.create(img`
        . 4 4 4 4 4 4 . 
        4 4 4 4 4 4 4 4 
        4 4 8 4 4 8 4 4 
        4 4 8 4 4 8 4 4 
        4 4 1 4 4 1 4 4 
        4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 
        4 4 . 4 4 . 4 4 
        `, SpriteKind.Ghost)
    tiles.placeOnTile(ghost, value4)
    scene.followPath(ghost, scene.aStar(tiles.locationOfSprite(ghost), tiles.locationOfSprite(mySprite)), 22)
}
let textSprite = textsprite.create("" + score, 0, 1)
textSprite.setPosition(120, 45)
let textSprite2 = textsprite.create("" + blockSettings.readNumber("High Score"), 0, 8)
textSprite2.setPosition(125, 25)
mySprite2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Extra)
tiles.placeOnRandomTile(mySprite2, assets.tile`myTile6`)
lives = sprites.create(img`
    . 5 5 5 5 . . 5 5 5 5 . . 5 5 5 5 . 
    5 5 5 5 . . 5 5 5 5 . . 5 5 5 5 . . 
    5 5 5 . . . 5 5 5 . . . 5 5 5 . . . 
    5 5 5 . . . 5 5 5 . . . 5 5 5 . . . 
    5 5 5 5 . . 5 5 5 5 . . 5 5 5 5 . . 
    . 5 5 5 5 . . 5 5 5 5 . . 5 5 5 5 . 
    `, SpriteKind.Lives)
lives.changeScale(1, ScaleAnchor.Middle)
lives.setPosition(125, 105)
life = 3
let textSprite3 = textsprite.create("High Score:", 0, 8)
textSprite3.setPosition(123, 15)
let textSprite4 = textsprite.create("Score:")
textSprite4.setPosition(123, 35)
whichFood = 0
let textSprite5 = textsprite.create("Developed", 0, 7)
textSprite5.setPosition(123, 60)
let textSprite6 = textsprite.create("By Bruno ", 0, 7)
textSprite6.setPosition(123, 70)
game.setGameOverScoringType(game.ScoringType.HighScore)
timer.after(1000, function () {
    gameStarted = true
    timer.after(4000, function () {
        textSprite5.destroy()
        textSprite6.destroy()
    })
})
game.onUpdateInterval(randint(20000, 40000), function () {
    if (gameStarted) {
        berry = sprites.create(img`
            . . . . . 2 
            . . . . 2 . 
            . . . 2 . . 
            . 2 2 . 2 2 
            . 2 2 . 2 e 
            . e e . e e 
            `, SpriteKind.Berry)
        tiles.placeOnRandomTile(berry, assets.tile`myTile5`)
    }
})
forever(function () {
    textSprite.setText("" + score)
    if (score > blockSettings.readNumber("High Score")) {
        textSprite2.setText("" + score)
    }
    if ((score - (ghostsEaten * 50 + berriesEaten * 50)) / level == 750) {
        level += 1
        Next_Level()
    }
})
