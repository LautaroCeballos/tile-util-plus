# deja de seguir

Detiene la persecución de un sprite.

```sig
tileUtil.stopFollowingSprite(mySprite)
```

Frena al sprite y cancela la persecución que se inició con el bloque
**sprite [mySprite] sigue a [otherSprite] en el mapa de teselas con velocidad [100]**.
También cancela cualquier camino que el sprite esté recorriendo en ese momento.

## Parámetros

* **sprite**: el sprite que deja de seguir.

## Ejemplo

Un enemigo persigue al jugador y deja de hacerlo cuando el jugador recoge una poción.

```blocks
let jugador = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . 5 5 5 5 . . . . .
    . . . . . . 5 5 5 5 5 5 . . . .
    . . . . . 5 5 5 5 5 5 5 5 . . .
    . . . . . 5 5 5 5 5 5 5 5 . . .
    . . . . . 5 5 5 5 5 5 5 5 . . .
    . . . . . . 5 5 5 5 5 5 . . . .
    . . . . . . . 5 5 5 5 . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`level1`)
tiles.placeOnTile(jugador, tiles.getTileLocation(1, 1))
controller.moveSprite(jugador)
let enemigo = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . f f f f . . . . .
    . . . . . . f 2 2 2 2 f . . . .
    . . . . . f 2 2 2 2 2 2 f . . .
    . . . . f 2 2 f 2 2 f 2 2 f . .
    . . . . f 2 2 2 2 2 2 2 2 f . .
    . . . . f 2 2 2 2 2 2 2 2 f . .
    . . . . . f 2 2 2 2 2 2 f . . .
    . . . . . . f f f f f f . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Enemy)
tileUtil.followSprite(enemigo, jugador, 60)
let pocion = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . 7 7 . . . . . .
    . . . . . . . 7 7 7 7 . . . . .
    . . . . . . . 7 7 7 7 . . . . .
    . . . . . . . d 7 7 d . . . . .
    . . . . . . . . d d . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Food)
tiles.placeOnTile(pocion, tiles.getTileLocation(9, 7))
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    tileUtil.stopFollowingSprite(enemigo)
})
```

## Ver también

[sigue a](follow-sprite)

```package
tile-util-plus=github:LautaroCeballos/tile-util-plus
```
