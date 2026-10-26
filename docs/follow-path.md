# sigue el camino

Hace que un sprite recorra una lista de posiciones del mapa.

```sig
tileUtil.followPath(mySprite, camino, 50)
```

El sprite se mueve de tesela en tesela siguiendo el camino indicado. El camino se puede
crear con el bloque **camino desde**. Si el sprite no está sobre el camino, primero
busca un camino hasta la tesela más cercana del recorrido.

## Parámetros

* **sprite**: el sprite que recorre el camino.
* **camino**: la lista de posiciones que debe recorrer, por ejemplo la que devuelve
  **camino desde**.
* **velocidad** (opcional): la velocidad a la que se recorre el camino, por ejemplo
  `50`.

## Ejemplo

```blocks
let camino = tileUtil.aStar(tiles.getTileLocation(0, 0), tiles.getTileLocation(9, 7))
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
tileUtil.followPath(miSprite, camino, 50)
```

## Ver también

[camino desde](a-star),
[está siguiendo un camino](sprite-is-following-path)

```package
tile-util-plus=github:LautaroCeballos/tile-util-plus
```
