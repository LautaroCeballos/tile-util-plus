# para cada tesela

Recorre cada posición del mapa de teselas y ejecuta el código en cada tesela.

```sig
tileUtil.forEachTileInMap(tileUtil.currentTilemap(), function (column, row, location) {
})
```

## Parámetros

* **tilemap**: el mapa de teselas que se recorre.
* **column**: la columna de la posición actual.
* **row**: la fila de la posición actual.
* **location**: la posición actual del mapa.

## Ejemplo

Este ejemplo toma un mapa sencillo donde las paredes están marcadas con una sola tesela y completa automáticamente la tesela de pared adecuada en cada posición según las teselas de alrededor.

```blocks
tiles.setCurrentTilemap(tilemap`level1`)
tileUtil.setWalls(assets.tile`myTile`, true)
tileUtil.forEachTileInMap(tileUtil.currentTilemap(), function (column, row, location) {
    if (tiles.tileAtLocationIsWall(location)) {
        if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(column + 1, row)))) {
            if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(column, row + 1)))) {
                tiles.setTileAt(location, sprites.dungeon.purpleInnerSouthEast)
            } else if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(column, row - 1)))) {
                tiles.setTileAt(location, sprites.dungeon.purpleInnerNorthEast)
            } else {
                tiles.setTileAt(location, sprites.dungeon.purpleOuterWest0)
            }
        } else if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(column - 1, row)))) {
            if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(column, row + 1)))) {
                tiles.setTileAt(location, sprites.dungeon.purpleInnerSouthWest)
            } else if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(column, row - 1)))) {
                tiles.setTileAt(location, sprites.dungeon.purpleInnerNorthWest)
            } else {
                tiles.setTileAt(location, sprites.dungeon.purpleOuterEast1)
            }
        } else if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(column, row + 1)))) {
            tiles.setTileAt(location, sprites.dungeon.purpleOuterNorth0)
        } else if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(column, row - 1)))) {
            tiles.setTileAt(location, sprites.dungeon.purpleOuterSouth1)
        } else if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(column + 1, row + 1)))) {
            tiles.setTileAt(location, sprites.dungeon.purpleOuterNorthWest)
        } else if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(column + 1, row - 1)))) {
            tiles.setTileAt(location, sprites.dungeon.purpleOuterSouthEast)
        } else if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(column - 1, row + 1)))) {
            tiles.setTileAt(location, sprites.dungeon.purpleOuterNorthEast)
        } else if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(column - 1, row - 1)))) {
            tiles.setTileAt(location, sprites.dungeon.purpleOuterSouthWest)
        }
    }
})

```

```package
tile-util-plus=github:LautaroCeballos/tile-util-plus
```

```jres
{
    "transparency16": {
        "data": "hwQQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
        "mimeType": "image/x-mkcd-f4",
        "tilemapTile": true
    },
    "tile1": {
        "data": "hwQQABAAAABmZmZmZmZmZmZmERFhZmZmZmZmZmFmZmZmZmYWYWZmZmZmZmZhZmZmZmYREWFmZmZmZmZmZmZmZmZmZhFhZmZmZmZmYWFmZmZmZmYRYWZmZmZmZmZhZmZmZmZmZmZmZmZmZhERYWZmZmZmZmZmZmZmZmYREWFmZmZmZmZmZmZmZg==",
        "mimeType": "image/x-mkcd-f4",
        "tilemapTile": true,
        "displayName": "myTile"
    },
    "level1": {
        "id": "level1",
        "mimeType": "application/mkcd-tilemap",
        "data": "MTAwYTAwMDgwMDAxMDEwMTAxMDIwMjAxMDEwMTAxMDEwMjAyMDIwMjAyMDIwMjAyMDEwMTAyMDIwMjAyMDIwMjAyMDIwMTAyMDIwMjAyMDEwMTAyMDIwMjAyMDIwMjAyMDIwMTAxMDIwMjAyMDIwMTAyMDIwMjAyMDIwMjAyMDIwMTAxMDIwMjAyMDIwMjAyMDIwMjAxMDEwMTAxMDEwMjAyMDEwMTAxMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA==",
        "tileset": [
            "myTiles.transparency16",
            "myTiles.tile1",
            "sprites.dungeon.floorLight0"
        ],
        "displayName": "level1"
    },
    "*": {
        "mimeType": "image/x-mkcd-f4",
        "dataEncoding": "base64",
        "namespace": "myTiles"
    }
}
```