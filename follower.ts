// Sprite follower: chases another sprite across the tilemap, automatically
// searching for a new path every time it reaches its target.
namespace tileUtil {
    const FOLLOWERS_KEY = "TILE_UTIL_SPRITE_FOLLOWERS";
    // Time to wait before trying to search for a path again (in ms). This only
    // applies when no path could be found.
    const SEARCH_RETRY_INTERVAL = 500;

    class SpriteFollower {
        public retryAt: number;

        constructor(
            public sprite: Sprite,
            public target: Sprite,
            public speed: number
        ) {
            this.retryAt = 0;
        }
    }

    /**
     * Makes a sprite chase another sprite through the tilemap. A new path is
     * searched every time the sprite reaches its target, so the follower keeps
     * chasing it as it moves. Call it once and the sprite will keep following
     * the other sprite until it is stopped or destroyed.
     * @param sprite the sprite that follows the target
     * @param target the sprite being followed
     * @param speed the speed used to follow the path, eg: 100
     */
    //% block="sprite $sprite sigue a $target en el mapa de teselas con velocidad $speed"
    //% blockId=tileUtil_followSprite
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% target.shadow=variables_get
    //% target.defl=otherSprite
    //% speed.defl=100
    //% speed.min=1
    //% group="Seguidor de Caminos" weight=100
    //% help=github:tile-util-plus/docs/follow-sprite
    export function followSprite(sprite: Sprite, target: Sprite, speed: number = 100): void {
        if (!sprite || !target) return;

        initFollower();

        const followers = getFollowers();
        let follower = followers.find(f => f.sprite === sprite);
        if (follower) {
            follower.target = target;
            follower.speed = speed;
        } else {
            follower = new SpriteFollower(sprite, target, speed);
            followers.push(follower);
        }
        follower.retryAt = 0;
    }

    /**
     * Stops a sprite from following the sprite it was chasing.
     * @param sprite the sprite that stops following
     */
    //% block="sprite $sprite deja de seguir"
    //% blockId=tileUtil_stopFollowingSprite
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% group="Seguidor de Caminos" weight=10
    //% help=github:tile-util-plus/docs/stop-following-sprite
    export function stopFollowingSprite(sprite: Sprite): void {
        if (!sprite) return;

        const followers = getFollowers();
        if (followers) {
            for (let i = followers.length - 1; i >= 0; i--) {
                if (followers[i].sprite === sprite) {
                    followers.removeAt(i);
                }
            }
        }

        // Also cancel any path the sprite is currently following.
        followPath(sprite, null, 0);
    }

    let followersInitialized = false;

    function initFollower() {
        const currentScene = game.currentScene();
        if (!currentScene.data[FOLLOWERS_KEY]) {
            currentScene.data[FOLLOWERS_KEY] = [] as SpriteFollower[];
        }
        // game.onUpdate handlers are shared by all scenes, so only register
        // the update function once.
        if (!followersInitialized) {
            followersInitialized = true;
            game.onUpdate(updateFollowers);
        }
    }

    function getFollowers(): SpriteFollower[] {
        return game.currentScene().data[FOLLOWERS_KEY] as SpriteFollower[];
    }

    function updateFollowers() {
        const tm = game.currentScene().tileMap;
        if (!tm) return;

        const followers = getFollowers();
        if (!followers || followers.length === 0) return;

        const now = control.millis();

        for (let i = followers.length - 1; i >= 0; i--) {
            const follower = followers[i];
            const { sprite, target } = follower;

            if (isDestroyed(sprite) || isDestroyed(target)) {
                if (!isDestroyed(sprite)) {
                    followPath(sprite, null, 0);
                }
                followers.removeAt(i);
                continue;
            }

            // While the sprite is walking a path there is nothing to do. When
            // the path ends (for example, when the target is reached), a new
            // search is started below.
            if (spriteIsFollowingPath(sprite)) continue;

            if (now < follower.retryAt) continue;

            const start = sprite.tilemapLocation();
            let end = target.tilemapLocation();
            if (!start || !end) continue;

            // If the target is standing inside a wall, aim for the closest
            // walkable tile instead of failing to find a path.
            if (tm.isObstacle(end.column, end.row)) {
                end = findNearestWalkable(end.column, end.row, tm);
                if (!end) continue;
            }

            // Standing on the target tile: wait for the target to move before
            // searching again.
            if (start.column === end.column && start.row === end.row) continue;

            let path = aStar(start, end);
            if (!path && tm.isObstacle(start.column, start.row)) {
                // The sprite is stuck inside a wall: start the search from the
                // closest walkable tile. Following the path will move it there.
                const freeStart = findNearestWalkable(start.column, start.row, tm);
                if (freeStart) path = aStar(freeStart, end);
            }

            if (!path) {
                follower.retryAt = now + SEARCH_RETRY_INTERVAL;
                continue;
            }

            follower.retryAt = 0;
            followPath(sprite, path, follower.speed);
        }
    }

    function isDestroyed(sprite: Sprite): boolean {
        return !sprite || !!(sprite.flags & sprites.Flag.Destroyed);
    }

    function findNearestWalkable(col: number, row: number, tm: tiles.TileMap): tiles.Location {
        const width = tm.data.width;
        const height = tm.data.height;
        const maxRadius = Math.max(width, height);

        for (let radius = 0; radius <= maxRadius; radius++) {
            for (let dc = -radius; dc <= radius; dc++) {
                for (let dr = -radius; dr <= radius; dr++) {
                    // Only check the border of the current ring.
                    if (Math.max(Math.abs(dc), Math.abs(dr)) !== radius) continue;

                    const c = col + dc;
                    const r = row + dr;
                    if (c < 0 || r < 0 || c >= width || r >= height) continue;
                    if (!tm.isObstacle(c, r)) return tiles.getTileLocation(c, r);
                }
            }
        }

        return undefined;
    }
}
