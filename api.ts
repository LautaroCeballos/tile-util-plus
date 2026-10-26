namespace MapConnectionKind {
    let nextKind: number
    export function create() {
        if (nextKind === undefined) nextKind = 1;
        return nextKind++;
    }

    //% isKind
    export const Door1 = create();

    //% isKind
    export const Door2 = create();

    //% isKind
    export const Door3 = create();

    //% isKind
    export const Door4 = create();
}

//% color=#879bff icon="\uf279"
//% block="Tile Util"
//% groups='["Mapas de teselas", "Teselas", "Eventos", "Conexiones", "Cámara", "Seguidor de Caminos"]'
namespace tileUtil {
    export enum TilemapProperty {
        //% block="número de columnas"
        Columns,
        //% block="número de filas"
        Rows,
        //% block="ancho"
        PixelWidth,
        //% block="alto"
        PixelHeight,
        //% block="ancho de tesela"
        TileWidth
    }

    /**
     * Lee una propiedad del mapa de teselas
     */
    //% blockId=tileUtil_tilemapProperty
    //% block="$data $prop"
    //% data.shadow=variables_get
    //% data.defl=tilemap
    //% group=Mapas de teselas
    //% help=github:tile-util-plus/docs/tilemap-property
    export function tilemapProperty(data: tiles.TileMapData, prop: TilemapProperty): number {
        switch (prop) {
            case TilemapProperty.Columns:
                return data.width;
            case TilemapProperty.Rows:
                return data.height;
            case TilemapProperty.PixelWidth:
                return data.width << data.scale;
            case TilemapProperty.PixelHeight:
                return data.height << data.scale;
            case TilemapProperty.TileWidth:
                return 1 << data.scale;
        }
    }

    /**
     * Obtiene el "tipo" de conexión del mapa de teselas
     */
    //% shim=KIND_GET
    //% blockId=tileUtil_connectionKind block="$kind"
    //% group="Conexiones" weight=0
    //% kindNamespace=MapConnectionKind kindMemberName=kind kindPromptHint="p. ej. Door1, Tunnel1, ..."
    //% help=github:tile-util-plus/docs/connection-kind
    export function _connectionKind(kind: number): number {
        return kind;
    }

    /**
     * Conecta dos mapas de teselas con un nombre o número de conexión.
     * Las conexiones funcionan en ambos sentidos y quedan guardadas en los dos mapas.
     */
    //% block="conectar $mapA y $mapB por $connectionId"
    //% blockId=tileUtil_connectMapById
    //% mapA.shadow=variables_get
    //% mapA.defl=tilemap1
    //% mapB.shadow=variables_get
    //% mapB.defl=tilemap2
    //% connectionId.shadow=tileUtil_connectionKind
    //% group="Conexiones" weight=40 blockGap=8
    //% help=github:tile-util-plus/docs/connect-maps
    export function connectMaps(mapA: tiles.TileMapData, mapB: tiles.TileMapData, connectionId: number): void {
        _state().connectMaps(mapA, mapB, connectionId);
    }

    /**
     * Obtiene el mapa de teselas de destino conectado al mapa de origen por el nombre o número indicado.
     */
    //% block="mapa de teselas conectado a $map por $connectionId"
    //% blockId=tileUtil_getConnectedMap
    //% map.shadow=variables_get
    //% map.defl=tilemap
    //% connectionId.shadow=tileUtil_connectionKind
    //% group="Conexiones" weight=10 blockGap=8
    //% help=github:tile-util-plus/docs/get-connected-map
    export function getConnectedMap(map: tiles.TileMapData, connectionId: number): tiles.TileMapData {
        return _state().getConnectedMap(map, connectionId);
    }

    /**
     * Carga el mapa de teselas conectado al mapa actual por el nombre o
     * número de conexión indicado.
     */
    //% block="cargar el mapa de teselas conectado por $connectionId"
    //% blockId=tileUtil_loadConnectedMap
    //% connectionId.shadow=tileUtil_connectionKind
    //% group="Conexiones" weight=30 blockGap=8
    //% help=github:tile-util-plus/docs/load-connected-map
    export function loadConnectedMap(connectionId: number) {
        const nextMap = getConnectedMap(currentTilemap(), connectionId)
        if (nextMap) {
            scene.setTileMapLevel(nextMap);
        }
    }

    /**
     * Crea un mapa de teselas con teselas de 8x8 que se puede conectar a otros mapas.
     */
    //% blockId=tileUtil_createSmallMap
    //% block="mapa de teselas 8x8 $tilemap"
    //% tilemap.fieldEditor="tilemap"
    //% tilemap.fieldOptions.decompileArgumentAsString="true"
    //% tilemap.fieldOptions.filter="tile"
    //% tilemap.fieldOptions.taggedTemplate="tilemap"
    //% tilemap.fieldOptions.tileWidth=8
    //% tilemap.fieldOptions.initWidth=20
    //% tilemap.fieldOptions.initHeight=15
    //% group="Mapas de teselas" weight=49 blockGap=8
    //% duplicateShadowOnDrag
    //% help=github:tile-util-plus/docs/create-small-map
    export function createSmallMap(tilemap: tiles.TileMapData): tiles.TileMapData {
        return tilemap
    }

    /**
     * Clona un mapa de teselas existente (no copia las conexiones con otros mapas).
     * Ten cuidado en hardware porque puede usar mucha memoria.
     */
    //% block="clonar $map"
    //% blockId=tileUtil_cloneMap
    //% map.shadow=variables_get
    //% map.defl=tilemap
    //% group="Mapas de teselas" weight=25 blockGap=8
    //% help=github:tile-util-plus/docs/clone-map
    export function cloneMap(map: tiles.TileMapData): tiles.TileMapData {
        const buffer = control.createBuffer(4 + map.width * map.height);
        buffer.setNumber(NumberFormat.UInt16LE, 0, map.width);
        buffer.setNumber(NumberFormat.UInt16LE, 2, map.height);

        const result = tiles.createTilemap(
            buffer,
            image.create(map.width, map.height),
            map.getTileset().slice(),
            map.scale
        );

        for (let x = 0; x < map.width; x++) {
            for (let y = 0; y < map.height; y++) {
                result.setTile(x, y, map.getTile(x, y))
                result.setWall(x, y, map.isWall(x, y));
            }
        }

        return result;
    }

    /**
     * Ejecuta código cuando se carga un mapa de teselas.
     */
    //% block="cuando se carga el mapa de teselas $tilemap"
    //% blockId=tileUtil_onMapLoaded
    //% draggableParameters="reporter"
    //% group="Eventos" weight=20 blockGap=8
    //% help=github:tile-util-plus/docs/on-map-loaded
    export function onMapLoaded(cb: (tilemap: tiles.TileMapData) => void) {
        tiles.addEventListener(tiles.TileMapEvent.Loaded, cb);
    }

    /**
     * Ejecuta código cuando se descarga un mapa de teselas.
     */
    //% block="cuando se descarga el mapa de teselas $tilemap"
    //% blockId=tileUtil_onMapUnloaded
    //% draggableParameters="reporter"
    //% group="Eventos" weight=10 blockGap=8
    //% help=github:tile-util-plus/docs/on-map-unloaded
    export function onMapUnloaded(cb: (tilemap: tiles.TileMapData) => void) {
        tiles.addEventListener(tiles.TileMapEvent.Unloaded, cb);
    }

    /**
     * Descarga el mapa de teselas actual para que no quede
     * ninguno activo
     */
    //% block="descargar el mapa de teselas actual"
    //% blockId=tileUtil_unloadTilemap
    //% group="Eventos" weight=0 blockGap=8
    //% help=github:tile-util-plus/docs/unload-tilemap
    export function unloadTilemap() {
        if (game.currentScene().tileMap) {
            game.currentScene().tileMap.setData(undefined);
        }
    }

    /**
     * Cubre todas las teselas de un tipo con otra imagen de tesela.
     * Las imágenes se quitan cuando cambia el mapa de teselas.
     */
    //% block="cubrir todas las teselas $tileKind con $cover"
    //% blockId=tileUtil_coverAllTiles
    //% tileKind.shadow=tileset_tile_picker
    //% tileKind.decompileIndirectFixedInstances=true
    //% cover.shadow=tileset_tile_picker
    //% cover.decompileIndirectFixedInstances=true
    //% group="Teselas" weight=40 blockGap=8
    //% help=github:tile-util-plus/docs/cover-all-tiles
    export function coverAllTiles(tileKind: Image, cover: Image) {
        if (!game.currentScene().tileMap || !game.currentScene().tileMap.enabled) return;

        const state = _state();
        for (const location of tiles.getTilesByType(tileKind)) {
            state.coverTile(location.column, location.row, cover)
        }
    }

    /**
     * Cubre la tesela de una posición con otra imagen de tesela.
     * La imagen se quita cuando cambia el mapa de teselas.
     */
    //% block="cubrir $location con $cover"
    //% blockId=tileUtil_coverTile
    //% location.shadow=mapgettile
    //% cover.shadow=tileset_tile_picker
    //% cover.decompileIndirectFixedInstances=true
    //% group="Teselas" weight=35 blockGap=8
    //% help=github:tile-util-plus/docs/cover-tile
    export function coverTile(location: tiles.Location, cover: Image) {
        if (!game.currentScene().tileMap || !game.currentScene().tileMap.enabled) return;

        _state().coverTile(location.column, location.row, cover);
    }

    /**
     * Reemplaza todas las teselas de un tipo en el mapa cargado
     * por otra tesela.
     */
    //% block="reemplazar todas las teselas $from por $to"
    //% blockId=tileUtil_replaceAllTiles
    //% from.shadow=tileset_tile_picker
    //% from.decompileIndirectFixedInstances=true
    //% to.shadow=tileset_tile_picker
    //% to.decompileIndirectFixedInstances=true
    //% group="Teselas" weight=20 blockGap=8
    //% help=github:tile-util-plus/docs/replace-all-tiles
    export function replaceAllTiles(from: Image, to: Image) {
        for (const loc of tiles.getTilesByType(from)) {
            tiles.setTileAt(loc, to)
        }
    }

    /**
     * Activa o desactiva las paredes de todas las teselas de un tipo.
     */
    //% block="poner pared $on en todas las posiciones de teselas $tile"
    //% blockId=tileUtil_setWalls
    //% tile.shadow=tileset_tile_picker
    //% tile.decompileIndirectFixedInstances=true
    //% on.shadow=toggleOnOff
    //% group="Teselas" weight=10
    //% help=github:tile-util-plus/docs/set-walls
    export function setWalls(tile: Image, on: boolean) {
        for (const loc of tiles.getTilesByType(tile)) {
            tiles.setWallAt(loc, on);
        }
    }

    /**
     * Pone la tesela de una posición en un mapa de teselas
     */
    //% blockId=tileUtil_setTileAt
    //% block="poner $tile en $location en $tilemap"
    //% tilemap.shadow=variables_get
    //% tilemap.defl=myTilemap
    //% location.shadow=mapgettile
    //% tile.shadow=tileset_tile_picker
    //% group=Teselas
    //% weight=8
    //% blockGap=8
    //% help=github:tile-util-plus/docs/set-tile-at
    export function setTileAt(tilemap: tiles.TileMapData, location: tiles.Location, tile: Image) {
        let index: number;

        const tileset = tilemap.getTileset();
        for (let i = 0; i < tileset.length; i++) {
            if (tileset[i].equals(tile)) {
                index = i;
                break;
            }
        }

        if (index === undefined) {
            // not found; append to the tileset if there are spots left.
            const newIndex = tileset.length;
            if (newIndex < 0xff) {
                tileset.push(tile);
                index = newIndex;
            }
        }

        if (index === undefined) {
            throw "Hay demasiadas teselas en el mapa";
        }


        tilemap.setTile(
            location.column,
            location.row,
            index
        );
    }

    /**
     * Activa o desactiva la pared de una posición en un mapa de teselas.
     */
    //% blockId=tileUtil_setWallAt
    //% block="poner pared $on en $location en $tilemap"
    //% tilemap.shadow=variables_get
    //% tilemap.defl=myTilemap
    //% location.shadow=mapgettile
    //% tile.shadow=tileset_tile_picker
    //% group=Teselas
    //% weight=7
    //% help=github:tile-util-plus/docs/set-wall-at
    export function setWallAt(tilemap: tiles.TileMapData, location: tiles.Location, on: boolean) {
        tilemap.setWall(location.column, location.row, on);
    }

    /**
     * Comprueba si la tesela de una posición coincide con una imagen de tesela.
     */
    //% blockId=tileUtil_tileIs
    //% block="la tesela de $tilemap en $location es $tile"
    //% tilemap.shadow=variables_get
    //% tilemap.defl=myTilemap
    //% location.shadow=mapgettile
    //% tile.shadow=tileset_tile_picker
    //% group=Teselas
    //% weight=5
    //% blockGap=8
    //% help=github:tile-util-plus/docs/tile-is
    export function tileIs(tilemap: tiles.TileMapData, location: tiles.Location, tile: Image): boolean {
        return tilemap.getTileImage(
            tilemap.getTile(location.column, location.row)
        ).equals(tile);
    }

    /**
     * Comprueba si hay una pared en una posición del mapa de teselas.
     */
    //% blockId=tileUtil_tileIsWall
    //% block="la tesela de $tilemap en $location es pared"
    //% tilemap.shadow=variables_get
    //% tilemap.defl=myTilemap
    //% location.shadow=mapgettile
    //% group=Teselas
    //% weight=4
    //% blockGap=8
    //% help=github:tile-util-plus/docs/tile-is-wall
    export function tileIsWall(tilemap: tiles.TileMapData, location: tiles.Location): boolean {
        return tilemap.isWall(location.column, location.row);
    }


    /**
     * Obtiene la imagen de la tesela de una posición del mapa
     */
    //% blockId=tileUtil_getTileImage
    //% block="imagen de la tesela de $tilemap en $location"
    //% tilemap.shadow=variables_get
    //% tilemap.defl=myTilemap
    //% location.shadow=mapgettile
    //% group=Teselas
    //% weight=3
    //% help=github:tile-util-plus/docs/get-tile-image
    export function getTileImage(tilemap: tiles.TileMapData, location: tiles.Location): Image {
        return tilemap.getTileImage(tilemap.getTile(location.column, location.row));
    }

    /**
     * Devuelve el mapa de teselas cargado.
     */
    //% block="mapa de teselas actual"
    //% blockId=tileUtil_getLoadedMap
    //% group="Mapas de teselas" weight=30
    //% help=github:tile-util-plus/docs/current-tilemap
    export function currentTilemap(): tiles.TileMapData {
        if (!game.currentScene().tileMap) return undefined;

        return game.currentScene().tileMap.data;
    }

    /**
     * Centra la cámara en una posición de tesela.
     */
    //% block="centrar cámara en $location"
    //% blockId=tileUtil_createCameraOnTile
    //% group="Cámara" weight=10 blockGap=8
    //% location.shadow=mapgettile
    //% help=github:tile-util-plus/docs/center-camera-on-tile
    export function centerCameraOnTile(location: tiles.Location) {
        scene.centerCameraAt(location.x, location.y);
    }

    /**
     * En cada tesela de un tipo, crea un sprite del tipo indicado.
     * Útil junto con el bloque "al crear [...]" de sprites.
     */
    //% block="en cada tesela $tileKind crear un sprite con imagen $spriteImage y tipo $spriteKind"
    //% blockId=tileUtil_createSpritesOnTiles
    //% tileKind.shadow=tileset_tile_picker
    //% tileKind.decompileIndirectFixedInstances=true
    //% spriteImage.shadow=screen_image_picker
    //% spriteKind.shadow=spritekind
    //% group="Teselas" weight=30 blockGap=8
    //% help=github:tile-util-plus/docs/create-sprites-on-tiles
    export function createSpritesOnTiles(tileKind: Image, spriteImage: Image, spriteKind: number) {
        const scene = game.currentScene();

        // We call the handlers manually instead of just using
        // sprites.create() because we want to set the location
        // before the handlers are called
        const createdHandlers = scene.createdHandlers
            .filter(h => h.kind == spriteKind);

        for (const loc of tiles.getTilesByType(tileKind)) {
            const sprite = new Sprite(spriteImage);
            sprite.setKind(spriteKind);
            scene.physicsEngine.addSprite(sprite);
            tiles.placeOnTile(sprite, loc);

            for (const cb of createdHandlers) cb.handler(sprite)
        }
    }

    /**
     * Recorre cada tesela de un mapa de teselas y ejecuta el código
     *
     * @param tilemap el mapa de teselas que se recorre
     * @param handler el código que se ejecuta
     */
    //% blockId=tileUtil_forEachTileInMap
    //% block="para cada tesela en $tilemap con $column $row $location"
    //% tilemap.shadow=tileUtil_getLoadedMap
    //% handlerStatement
    //% draggableParameters="reporter"
    //% group=Teselas
    //% weight=0
    //% help=github:tile-util-plus/docs/for-each-tile-in-map
    export function forEachTileInMap(tilemap: tiles.TileMapData, handler: (column: number, row: number, location: tiles.Location) => void) {
        for (let c = 0; c < tilemap.width; c++) {
            for (let r = 0; r < tilemap.height; r++) {
                handler(c, r, new tiles.Location(c, r, null));
            }
        }
    }
}