# cubrir todas las teselas

Cubre todas las teselas de una imagen con otra tesela.

```sig
tileUtil.coverAllTiles(null, null)
```

## Parámetros

* **tileKind**: la imagen de las teselas del mapa que se van a cubrir.
* **cover**: la imagen de la tesela que se usa para cubrir.

## Ejemplo

Pon en la escena un mapa de teselas con un tablero de ajedrez de teselas marrones y blancas. Al presionar el botón `A`, cubre las teselas blancas con teselas negras y las marrones con teselas transparentes.

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    tileUtil.coverAllTiles(assets.tile`myTile0`, assets.tile`myTile2`)
    tileUtil.coverAllTiles(assets.tile`myTile1`, assets.tile`transparency16`)
})
tiles.setCurrentTilemap(tilemap`level1`)
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
        "data": "hwQQABAAAAAREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREQ==",
        "mimeType": "image/x-mkcd-f4",
        "tilemapTile": true,
        "displayName": "myTile0"
    },
    "tile2": {
        "data": "hwQQABAAAADu7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7g==",
        "mimeType": "image/x-mkcd-f4",
        "tilemapTile": true,
        "displayName": "myTile1"
    },
    "tile3": {
        "data": "hwQQABAAAAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////w==",
        "mimeType": "image/x-mkcd-f4",
        "tilemapTile": true,
        "displayName": "myTile2"
    },
    "level1": {
        "id": "level1",
        "mimeType": "application/mkcd-tilemap",
        "data": "MTAwYzAwMGEwMDAyMDEwMjAxMDIwMTAyMDEwMjAxMDIwMTAxMDIwMTAyMDEwMjAxMDIwMTAyMDEwMjAyMDEwMjAxMDIwMTAyMDEwMjAxMDIwMTAxMDIwMTAyMDEwMjAxMDIwMTAyMDEwMjAyMDEwMjAxMDIwMTAyMDEwMjAxMDIwMTAxMDIwMTAyMDEwMjAxMDIwMTAyMDEwMjAyMDEwMjAxMDIwMTAyMDEwMjAxMDIwMTAxMDIwMTAyMDEwMjAxMDIwMTAyMDEwMjAyMDEwMjAxMDIwMTAyMDEwMjAxMDIwMTAxMDIwMTAyMDEwMjAxMDIwMTAyMDEwMjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA==",
        "tileset": [
            "myTiles.transparency16",
            "myTiles.tile1",
            "myTiles.tile2",
            "myTiles.tile3"
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