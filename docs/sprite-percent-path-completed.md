# porcentaje del camino

Devuelve cuánto del camino lleva recorrido un sprite.

```sig
tileUtil.spritePercentPathCompleted(mySprite)
```

El resultado es un número entre `0` y `100`. Si el sprite no está siguiendo ningún
camino, devuelve `100` (un camino vacío ya está completo).

## Parámetros

* **sprite**: el sprite que se quiere consultar.

## Ejemplo

Crear un sprite y mostrar todo el tiempo el porcentaje del camino que completó.

```blocks
let miSprite = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . 5 5 5 5 . . . . .
    . . . . . . 5 5 5 5 5 5 . . . .
    . . . . . 5 5 5 5 5 5 5 5 . . .
    . . . . . 5 5 5 5 5 5 5 5 . . .
    . . . . . 5 5 5 5 5 5 5 5 . . .
    . . . . . 5 5 5 5 5 5 5 5 . . .
    . . . . . . 5 5 5 5 5 5 . . . .
    . . . . . . . 5 5 5 5 . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
game.onUpdate(function () {
    miSprite.say(tileUtil.spritePercentPathCompleted(miSprite))
})
```

## Ver también

[está siguiendo un camino](sprite-is-following-path)

```package
tile-util-plus=github:LautaroCeballos/tile-util-plus
```
