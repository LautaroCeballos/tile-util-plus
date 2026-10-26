# está siguiendo un camino

Indica si un sprite está recorriendo un camino en este momento.

```sig
tileUtil.spriteIsFollowingPath(mySprite)
```

Devuelve `true` si el sprite está siguiendo un camino (por ejemplo, uno iniciado con
**sigue el camino** o con **sigue a**) y `false` si no.

## Parámetros

* **sprite**: el sprite que se quiere consultar.

## Ejemplo

Crear un sprite y consultar todo el tiempo si está siguiendo un camino.

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
    miSprite.say(tileUtil.spriteIsFollowingPath(miSprite))
})
```

## Ver también

[sigue el camino](follow-path),
[porcentaje del camino](sprite-percent-path-completed)

```package
tile-util-plus=github:LautaroCeballos/tile-util-plus
```
