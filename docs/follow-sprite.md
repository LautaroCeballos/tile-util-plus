# sigue a

Hace que un sprite persiga a otro por el mapa de teselas.

```sig
tileUtil.followSprite(mySprite, otherSprite, 100)
```

El sprite busca el camino más corto hasta el otro sprite (esquivando las paredes del
mapa) y lo recorre a la velocidad indicada. Cada vez que llega al objetivo vuelve a
buscar un camino nuevo, así que sigue persiguiéndolo aunque se mueva.

Solo hace falta llamar al bloque una vez, por ejemplo en `al iniciar`. El sprite sigue
persiguiendo al objetivo hasta que se use **sprite [mySprite] deja de seguir** o hasta
que uno de los dos sprites sea destruido.

## Parámetros

* **sprite**: el sprite que persigue.
* **otherSprite**: el sprite que es perseguido.
* **velocidad**: la velocidad con la que se recorre el camino, por ejemplo `100`.

## Ejemplo

Crear un jugador que se mueve con los controles y un enemigo que lo persigue.

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
scene.cameraFollowSprite(jugador)
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
tiles.placeOnTile(enemigo, tiles.getTileLocation(10, 8))
tileUtil.followSprite(enemigo, jugador, 60)
```

## Ver también

[camino desde](a-star),
[deja de seguir](stop-following-sprite)

```package
tile-util-plus=github:LautaroCeballos/tile-util-plus
```
