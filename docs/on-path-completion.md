# cuando completa un camino

Ejecuta código cuando un sprite de un tipo termina de recorrer un camino.

```sig
tileUtil.onPathCompletion(SpriteKind.Enemy, null)
```

El bloque se ejecuta una vez por cada camino que termina un sprite del tipo indicado. El
sprite y la última posición del camino quedan disponibles como parámetros.

## Parámetros

* **tipo**: el tipo de sprite que se quiere escuchar, por ejemplo `Enemy`.
* **sprite**: el sprite que terminó el camino.
* **posición**: la última posición del camino.

## Ejemplo

Cuando un enemigo termina su camino, destruirlo y convertir su última posición en pared.

```blocks
tileUtil.onPathCompletion(SpriteKind.Enemy, function (sprite, location) {
    sprite.destroy(effects.trail, 500)
    tiles.setWallAt(location, true)
})
```

## Ver también

[sigue el camino](follow-path),
[sigue a](follow-sprite)

```package
tile-util-plus=github:LautaroCeballos/tile-util-plus
```
