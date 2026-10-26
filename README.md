# Tile Util Plus

Extensión para **MakeCode Arcade** basada en [microsoft/arcade-tile-util](https://github.com/microsoft/arcade-tile-util)
que agrega una subcategoría **Seguidor de Caminos** con bloques de *pathfinding* (A\*),
seguimiento de caminos y un bloque para que un sprite persiga a otro automáticamente.

El pathfinding está basado en [jwunderl/arcade-tilemap-a-star](https://github.com/jwunderl/arcade-tilemap-a-star).

## Instalar la extensión

1. Abre [https://arcade.makecode.com](https://arcade.makecode.com) y crea un proyecto nuevo.
2. Haz clic en el engranaje ⚙️ → **Extensiones**.
3. Pega `https://github.com/LautaroCeballos/tile-util-plus` y presiona **Importar**.

También puedes probarla desde el editor de MakeCode con **Importar → Importar URL**.

## Bloques

La extensión mantiene todos los bloques de **Tile Util** (mapas de teselas, teselas,
eventos, conexiones y cámara) y agrega el grupo **Seguidor de Caminos** al final de la
categoría:

### `sprite [mySprite] sigue a [otherSprite] en el mapa de teselas con velocidad (100)`

Hace que un sprite persiga a otro por el mapa de teselas:

* busca el camino más corto hasta el otro sprite (esquivando paredes),
* lo sigue a la velocidad indicada,
* y **cada vez que llega al objetivo vuelve a buscar un camino nuevo**. Así el sprite
  sigue persiguiendo al objetivo aunque se mueva.

Se llama una sola vez (por ejemplo en `al iniciar`) y el sprite sigue persiguiendo al
objetivo hasta que lo detengas con **dejar de seguir**, o hasta que alguno de los dos
sprites sea destruido.

### `sprite [mySprite] deja de seguir`

Detiene la persecución y frena al sprite.

### `camino desde [inicio] hasta [fin] || en teselas de [tipo]`

Devuelve el camino más corto entre dos posiciones del mapa como una lista de posiciones
de tesela. Opcionalmente se puede limitar el camino a un tipo de tesela.

### `sprite [mySprite] sigue el camino [camino] || con velocidad (50)`

Hace que un sprite recorra una lista de posiciones (por ejemplo, la que devuelve
**camino desde**).

### `sprite [mySprite] está siguiendo un camino`

Devuelve verdadero si el sprite está recorriendo un camino en este momento.

### `porcentaje del camino completado por el sprite [mySprite]`

Devuelve un número entre 0 y 100 con el avance del sprite en su camino.

### `cuando el sprite [sprite] de tipo [Enemy] completa un camino en [posición]`

Ejecuta código cuando un sprite de ese tipo termina de recorrer un camino.

## Ejemplo: un enemigo que persigue al jugador

```blocks
let jugador = sprites.create(img`
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

tiles.setCurrentTilemap(tilemap`level1`)
tiles.placeOnTile(jugador, tiles.getTileLocation(1, 1))
controller.moveSprite(jugador)
scene.cameraFollowSprite(jugador)

let enemigo = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
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
`, SpriteKind.Enemy)

tiles.placeOnTile(enemigo, tiles.getTileLocation(10, 8))
tileUtil.followSprite(enemigo, jugador, 60)
```

## Créditos

* Bloques de Tile Util: [microsoft/arcade-tile-util](https://github.com/microsoft/arcade-tile-util) (MIT).
* A\* y seguimiento de caminos: [jwunderl/arcade-tilemap-a-star](https://github.com/jwunderl/arcade-tilemap-a-star) (MIT).
* Bloque **sigue a**: implementado en esta extensión replicando el comportamiento del
  proyecto de referencia de MakeCode Arcade.

## Licencia

MIT. Consulta el archivo [LICENSE](LICENSE).
