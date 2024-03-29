const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let collisionMap = [];
// 70 is the x size of the map
// map -> resize map
for (let i = 0; i < collisions.length; i+= 70) {
    collisionMap = [...collisionMap, collisions.slice(i, i + 70)];
}

const offset = {
    x: -950, 
    y: -350 
 }

const boundaries = [];

collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
        }
    })
});

 const image = new Image();
 image.src = './img/pokemonMap.png';

 const foregroundImage = new Image();
 foregroundImage.src = './img/pokemonMapTop.png';

 const playerUpImage = new Image();
 playerUpImage.src = './img/playerUp.png';

 const playerDownImage = new Image();
 playerDownImage.src = './img/playerDown.png';

 const playerLeftImage = new Image();
 playerLeftImage.src = './img/playerLeft.png';

 const playerRightImage = new Image();
 playerRightImage.src = './img/playerRight.png';

 const background = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: image
 });

 const foreground = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: foregroundImage
 });

 const player = new Sprite({
    position: {
        // 192X68 - is the size of the image
        x: canvas.width / 2 - 192 / 2,
        y: canvas.height / 2 - 68 / 10
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
 })

 const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
 }

 const movables = [background, foreground, ...boundaries];

 function rectangularCollision(rect1, rect2) {
    return rect1.position.x + rect1.width >= rect2.position.x &&
           rect1.position.x <= rect2.position.x + rect2.width &&
           rect1.position.y <= rect2.position.y + rect2.height &&
           rect1.position.y + rect1.height >= rect2.position.y
 }

 function animate() {
    requestAnimationFrame(animate);

    background.draw(c);

    boundaries.forEach(b => {
        b.draw(c);
    })

    player.draw(c);

    foreground.draw(c);

    player.moving = false;

    if (keys.w.pressed) {
        player.moving = true;
        player.image = player.sprites.up;
        let moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision(
                player, 
                {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            )) {
                moving = false;
                break
            }
        }


        if (moving) {
            movables.forEach(m => 
                m.position.y += 3
            );
        }
    }
    if (keys.s.pressed) {
        player.moving = true;
        player.image = player.sprites.down;
        let moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision(
                player, 
                {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
            )) {
                moving = false;
                break
            }
        }

        if (moving) {
            movables.forEach(m => 
                m.position.y -= 3
            );
        }
        
    }
    if (keys.a.pressed) {
        player.moving = true;
        player.image = player.sprites.left;
        let moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision(
                player, 
                {
                    ...boundary,
                    position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                }
            )) {
                moving = false;
                break
            }
        }

        if (moving) {
            movables.forEach(m => 
                m.position.x += 3
            );
        }
    }

    if (keys.d.pressed) {
        player.moving = true;
        player.image = player.sprites.right;
        let moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision(
                player, 
                {
                    ...boundary,
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            )) {
                moving = false;
                break
            }
        }

        if (moving) {
            movables.forEach(m => 
                m.position.x -= 3
            );
        }
    }
 }

 animate();

 window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
    }
 })

 window.addEventListener('keyup', e => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
 })
