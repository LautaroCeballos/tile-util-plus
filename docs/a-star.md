# camino desde

Calcula el camino más corto entre dos posiciones del mapa de teselas.

```sig
tileUtil.aStar(tiles.getTileLocation(0, 0), tiles.getTileLocation(9, 7))
```

Devuelve una lista con las posiciones de tesela que forman el camino, empezando por la
posición inicial y terminando en la posición final. El camino esquiva las paredes del
mapa y se puede limitar a un tipo de tesela.

Si no existe un camino, el bloque no devuelve ninguna posición.

## Parámetros

* **inicio**: la posición del mapa donde empieza el camino.
* **fin**: la posición del mapa donde termina el camino.
* **tipo de tesela** (opcional): si se indica, el camino solo pasa por teselas de ese
  tipo. Por ejemplo, se puede usar para que un barco solo navegue por agua.

## Ejemplo

Crear un camino entre dos posiciones y hacer que un sprite lo recorra.

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

[sigue el camino](follow-path)

```package
tile-util-plus=github:LautaroCeballos/tile-util-plus
```
