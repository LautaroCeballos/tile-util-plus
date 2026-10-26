# cuando se descarga el mapa de teselas

Ejecuta código cuando un mapa de teselas se descarga de la escena.

```sig
tileUtil.onMapUnloaded(function (null) {})
```

Este evento se activa cuando un mapa de teselas se descarga de la escena. El objeto del mapa se pasa como parámetro al código del evento.

## Parámetros

* **cb**: el código que se ejecuta cuando se descarga un mapa de teselas.
>* **tilemap**: el mapa de teselas que se acaba de descargar.

## Ejemplo

Crea un sprite en pantalla para mostrar mensajes. Con el controlador, carga un mapa de teselas en la escena al presionar el botón `A` y descárgalo con el botón `B`. Muestra un mensaje cuando el mapa se carga o se descarga.

```blocks
let mySprite: Sprite = null
mySprite = sprites.create(img`
    ....................ccfff...........
    ..........fffffffffcbbbbf...........
    .........fbbbbbbbbbfffbf............
    .........fbb111bffbbbbff............
    .........fb11111ffbbbbbcff..........
    .........f1cccc11bbcbcbcccf.........
    ..........fc1c1c1bbbcbcbcccf...ccccc
    ............c3331bbbcbcbccccfccddbbc
    ...........c333c1bbbbbbbcccccbddbcc.
    ...........c331c11bbbbbcccccccbbcc..
    ..........cc13c111bbbbccccccffbccf..
    ..........c111111cbbbcccccbbc.fccf..
    ...........cc1111cbbbfdddddc..fbbcf.
    .............cccffbdbbfdddc....fbbf.
    ..................fbdbbfcc......fbbf
    ...................fffff.........fff
    `, SpriteKind.Player)
    tileUtil.onMapUnloaded(function (tilemap) {
    mySprite.sayText("Tilemap Unloaded!")
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    tileUtil.unloadTilemap()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    tiles.setCurrentTilemap(tilemap`level1`)
})
tileUtil.onMapLoaded(function (tilemap) {
    mySprite.sayText("Tilemap Loaded!")
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
        "level1": {
        "id": "level1",
        "mimeType": "application/mkcd-tilemap",
        "data": "MTAwYzAwMGEwMDAxMDIwMTAyMDEwMjAxMDIwMTAyMDEwMjAyMDEwMjAxMDIwMTAyMDEwMjAxMDIwMTAxMDIwMTAyMDEwMjAxMDIwMTAyMDEwMjAyMDEwMjAxMDIwMTAyMDEwMjAxMDIwMTAxMDIwMTAyMDEwMjAxMDIwMTAyMDEwMjAyMDEwMjAxMDIwMTAyMDEwMjAxMDIwMTAxMDIwMTAyMDEwMjAxMDIwMTAyMDEwMjAyMDEwMjAxMDIwMTAyMDEwMjAxMDIwMTAxMDIwMTAyMDEwMjAxMDIwMTAyMDEwMjAyMDEwMjAxMDIwMTAyMDEwMjAxMDIwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA==",
        "tileset": [
            "myTiles.transparency16",
            "myTiles.tile3",
            "myTiles.tile1"
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