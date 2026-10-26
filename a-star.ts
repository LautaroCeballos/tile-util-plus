// A* pathfinding for MakeCode Arcade tilemaps.
// Based on jwunderl/arcade-tilemap-a-star (MIT license), adapted to the
// Tile Util namespace and blocks.
namespace tileUtil {
    // Costs are scaled up by 1000 so everything stays as integers.
    const NEIGHBOR_COST = 1000;
    const DIAGONAL_COST = 1414;

    class PrioritizedLocation {
        constructor(
            public loc: SimpleLocation,
            public cost: number,
            public totalCost: number // cost + heuristic
        ) { }
    }

    class LocationNode {
        public visited: boolean;

        constructor(
            public l: SimpleLocation,
            public parent: LocationNode,
            public lastCost: number
        ) {
            this.visited = false;
        }
    }

    class SimpleLocation {
        constructor(public col: number, public row: number) { }
    }

    /**
     * Finds the shortest path between two tilemap locations. The path avoids
     * walls and, optionally, only walks on tiles of a given type.
     */
    //% block="camino desde $start hasta $end||en teselas de $onTilesOf"
    //% blockId=tileUtil_aStar
    //% start.shadow=mapgettile
    //% end.shadow=mapgettile
    //% onTilesOf.shadow=tileset_tile_picker
    //% onTilesOf.decompileIndirectFixedInstances=true
    //% group="Seguidor de Caminos" weight=90
    //% help=github:tile-util-plus/docs/a-star
    export function aStar(start: tiles.Location, end: tiles.Location, onTilesOf: Image = null): tiles.Location[] {
        const tm = game.currentScene().tileMap;
        if (!tm || !start || !end)
            return undefined;

        const start1 = new SimpleLocation(start.column, start.row);
        const end1 = new SimpleLocation(end.column, end.row);
        if (!isWalkable(end1, onTilesOf, tm))
            return undefined;

        return generalAStar(
            tm,
            start1,
            onTilesOf,
            t => tileLocationHeuristic(t, end1),
            l => l.col === end1.col && l.row === end1.row
        );
    }

    /**
     * Finds a path from a location to the closest tile of the given type.
     */
    export function aStarToAnyOfType(start: tiles.Location, tile: Image, onTilesOf: Image): tiles.Location[] {
        const tm = game.currentScene().tileMap;
        if (!tm || !start || !tile)
            return undefined;

        const start1 = new SimpleLocation(start.column, start.row);
        const endIndex = tm.getImageType(tile);
        const potentialEndPoints = tm.getTilesByType(endIndex);

        if (!potentialEndPoints || potentialEndPoints.length === 0)
            return undefined;

        return generalAStar(
            tm,
            start1,
            onTilesOf,
            () => 0,
            l => endIndex === tm.getTileIndex(l.col, l.row)
        );
    }

    export function generalAStar(tm: tiles.TileMap, start: SimpleLocation, onTilesOf: Image,
        heuristic: (tile: SimpleLocation) => number,
        isEnd: (tile: SimpleLocation) => boolean): tiles.Location[] {

        if (!isWalkable(start, onTilesOf, tm)) {
            return undefined;
        }

        const consideredTiles: PrioritizedLocation[] = [];
        const encounteredLocations: LocationNode[][] = [[]];

        const isBlocked = (col: number, row: number) => {
            if (onTilesOf) {
                return !isWalkable(new SimpleLocation(col, row), onTilesOf, tm);
            }
            return tm.isObstacle(col, row);
        };

        function updateOrFillLocation(l: SimpleLocation, parent: LocationNode, cost: number) {
            const row = l.row;
            const col = l.col;

            const colData = encounteredLocations[col] || (encounteredLocations[col] = []);
            const lData = colData[row];

            if (!lData) {
                colData[row] = new LocationNode(l, parent, cost);
            } else if (lData.lastCost > cost) {
                lData.lastCost = cost;
                lData.parent = parent;
            } else {
                return;
            }

            const newConsideredTile = new PrioritizedLocation(l, cost, cost + heuristic(l));

            if (consideredTiles.length === 0) {
                consideredTiles.push(newConsideredTile);
                return;
            }

            let i = consideredTiles.length - 1;
            // Seek and insert from the end: the last entries are the most
            // likely candidates.
            for (; i >= 0; i--) {
                if (newConsideredTile.totalCost < consideredTiles[i].totalCost) {
                    consideredTiles.insertAt(i + 1, newConsideredTile);
                    return;
                }
            }
            if (i < 0)
                consideredTiles.insertAt(0, newConsideredTile);
        }

        updateOrFillLocation(start, null, 0);

        let end: SimpleLocation = null;
        while (consideredTiles.length !== 0) {
            const currLocation = consideredTiles.pop();

            if (isEnd(currLocation.loc)) {
                end = currLocation.loc;
                break;
            }

            const row = currLocation.loc.row;
            const col = currLocation.loc.col;

            const dataForCurrLocation = encounteredLocations[col][row];

            if (dataForCurrLocation && dataForCurrLocation.visited) {
                continue;
            }
            dataForCurrLocation.visited = true;

            const leftIsWall = isBlocked(col - 1, row);
            const rightIsWall = isBlocked(col + 1, row);
            const topIsWall = isBlocked(col, row - 1);
            const bottomIsWall = isBlocked(col, row + 1);

            const neighborCost = currLocation.cost + NEIGHBOR_COST;
            const cornerCost = currLocation.cost + DIAGONAL_COST;

            if (!leftIsWall) {
                updateOrFillLocation(new SimpleLocation(col - 1, row), dataForCurrLocation, neighborCost);
                if (!topIsWall && !isBlocked(col - 1, row - 1)) {
                    updateOrFillLocation(new SimpleLocation(col - 1, row - 1), dataForCurrLocation, cornerCost);
                }
                if (!bottomIsWall && !isBlocked(col - 1, row + 1)) {
                    updateOrFillLocation(new SimpleLocation(col - 1, row + 1), dataForCurrLocation, cornerCost);
                }
            }

            if (!rightIsWall) {
                updateOrFillLocation(new SimpleLocation(col + 1, row), dataForCurrLocation, neighborCost);
                if (!topIsWall && !isBlocked(col + 1, row - 1)) {
                    updateOrFillLocation(new SimpleLocation(col + 1, row - 1), dataForCurrLocation, cornerCost);
                }
                if (!bottomIsWall && !isBlocked(col + 1, row + 1)) {
                    updateOrFillLocation(new SimpleLocation(col + 1, row + 1), dataForCurrLocation, cornerCost);
                }
            }

            if (!topIsWall)
                updateOrFillLocation(new SimpleLocation(col, row - 1), dataForCurrLocation, neighborCost);
            if (!bottomIsWall)
                updateOrFillLocation(new SimpleLocation(col, row + 1), dataForCurrLocation, neighborCost);
        }

        const endCol = end && encounteredLocations[end.col];
        const endDataNode = endCol && endCol[end.row];

        // No path found.
        if (!end || !endDataNode)
            return undefined;

        // Trace the path back from the end to the start.
        let curr = endDataNode;
        const output: tiles.Location[] = [];

        while (curr) {
            output.unshift(new tiles.Location(curr.l.col, curr.l.row, tm));
            curr = curr.parent;
        }

        return output;
    }

    function tileLocationHeuristic(tile: SimpleLocation, target: SimpleLocation) {
        const xDist = Math.abs(target.col - tile.col);
        const yDist = Math.abs(target.row - tile.row);
        return Math.max(xDist, yDist) * NEIGHBOR_COST + Math.min(xDist, yDist) *
            (DIAGONAL_COST - NEIGHBOR_COST);
    }

    function isWalkable(loc: SimpleLocation, onTilesOf: Image, tm: tiles.TileMap): boolean {
        if (tm.isObstacle(loc.col, loc.row)) return false;
        if (!onTilesOf) return true;
        const img = tm.getTileImage(tm.getTileIndex(loc.col, loc.row));
        return img.equals(onTilesOf);
    }
}
