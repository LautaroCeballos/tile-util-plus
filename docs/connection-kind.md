# tipo de conexión

Obtiene un identificador de conexión a partir de un tipo de conexión.

```sig
tileUtil._connectionKind(MapConnectionKind.Door1)
```

## Parámetros

* **kind**: un tipo de conexión, como `Door1` o `Door2`.

## Devuelve

* el identificador de conexión del valor de **kind** indicado.

## Ejemplo

Crea 3 mapas de teselas distintos. Conéctalos con 2 conexiones. Dentro de un bucle, cambia el mapa actual cada segundo usando los identificadores de cada tipo de conexión.

```blocks
let nextMap = 0
let mapIndex = 0
let tilemap1 = tilemap`level1`
let tilemap2 = tilemap`level2`
let tilemap3 = tilemap`level3`
tiles.setCurrentTilemap(tilemap1)
tileUtil.connectMaps(tilemap1, tilemap2, MapConnectionKind.Door1)
tileUtil.connectMaps(tilemap2, tilemap3, MapConnectionKind.Door2)
tileUtil.connectMaps(tilemap3, tilemap1, MapConnectionKind.Door3)
game.onUpdateInterval(1000, function () {
    info.setScore(mapIndex)
    if (mapIndex == 0) {
        nextMap = MapConnectionKind.Door1
    } else if (mapIndex == 1) {
        nextMap = MapConnectionKind.Door2
    } else {
        nextMap = MapConnectionKind.Door3
    }
    tileUtil.loadConnectedMap(nextMap)
    if (mapIndex > 1) {
        mapIndex = 0
    } else {
        mapIndex += 1
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
    "tile2": {
        "data": "hwQQABAAAAAREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREQ==",
        "mimeType": "image/x-mkcd-f4",
        "tilemapTile": true,
        "displayName": "myTile0"
    },
    "tile3": {
        "data": "hwQQABAAAADu7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7g==",
        "mimeType": "image/x-mkcd-f4",
        "tilemapTile": true,
        "displayName": "myTile1"
    },
    "tile1": {
        "data": "hwQQABAAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3Q==",
        "mimeType": "image/x-mkcd-f4",
        "tilemapTile": true,
        "displayName": "myTile"
    },
    "tile4": {
        "data": "hwQQABAAAAAiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIg==",
        "mimeType": "image/x-mkcd-f4",
        "tilemapTile": true,
        "displayName": "myTile2"
    },
    "level1": {
        "id": "level1",
        "mimeType": "application/mkcd-tilemap",
        "data": "MTAwYTAwMDgwMDAxMDIwMTAyMDEwMjAxMDIwMTAyMDIwMTAyMDEwMjAxMDIwMTAyMDEwMTAyMDEwMjAxMDIwMTAyMDEwMjAyMDEwMjAxMDIwMTAyMDEwMjAxMDEwMjAxMDIwMTAyMDEwMjAxMDIwMjAxMDIwMTAyMDEwMjAxMDIwMTAxMDIwMTAyMDEwMjAxMDIwMTAyMDIwMTAyMDEwMjAxMDIwMTAyMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA==",
        "tileset": [
            "myTiles.transparency16",
            "myTiles.tile3",
            "myTiles.tile1"
        ],
        "displayName": "level1"
    },
    "level2": {
        "id": "level2",
        "mimeType": "application/mkcd-tilemap",
        "data": "MTAwYTAwMDgwMDAyMDEwMjAxMDIwMTAyMDEwMjAxMDEwMjAxMDIwMTAyMDEwMjAxMDIwMjAxMDIwMTAyMDEwMjAxMDIwMTAxMDIwMTAyMDEwMjAxMDIwMTAyMDIwMTAyMDEwMjAxMDIwMTAyMDEwMTAyMDEwMjAxMDIwMTAyMDEwMjAyMDEwMjAxMDIwMTAyMDEwMjAxMDEwMjAxMDIwMTAyMDEwMjAxMDIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA==",
        "tileset": [
            "myTiles.transparency16",
            "myTiles.tile1",
            "myTiles.tile4"
        ],
        "displayName": "level2"
    },
    "level3": {
        "id": "level3",
        "mimeType": "application/mkcd-tilemap",
        "data": "MTAwYTAwMDgwMDAxMDIwMTAyMDEwMjAxMDIwMTAyMDIwMTAyMDEwMjAxMDIwMTAyMDEwMTAyMDEwMjAxMDIwMTAyMDEwMjAyMDEwMjAxMDIwMTAyMDEwMjAxMDEwMjAxMDIwMTAyMDEwMjAxMDIwMjAxMDIwMTAyMDEwMjAxMDIwMTAxMDIwMTAyMDEwMjAxMDIwMTAyMDIwMTAyMDEwMjAxMDIwMTAyMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA==",
        "tileset": [
            "myTiles.transparency16",
            "myTiles.tile2",
            "myTiles.tile1"
        ],
        "displayName": "level3"
    },
    "*": {
        "mimeType": "image/x-mkcd-f4",
        "dataEncoding": "base64",
        "namespace": "myTiles"
    }
}
```