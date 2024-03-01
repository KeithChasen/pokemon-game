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

class Boundary {
    static width = 48;
    static height = 48;

    constructor({ position }) {
        this.position = position;

        // original tiles is 12 pixels
        // but we exported 400% image
        this.width = 48;
        this.height = 48;
    }

    draw(c) {
        c.fillStyle = 'rgba(255, 0, 0, 0)';
        c.fillRect(
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )
    }
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

 const playerImage = new Image();
 playerImage.src = './img/playerDown.png';

 class Sprite {
    constructor({
        position,
        image,
        frames = { max: 1 }
    }) {
        this.position = position;
        this.image = image;
        this.frames = frames;

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }

    draw(c) {
        c.drawImage(
            this.image, 
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        );
    }
 }

 const background = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: image
 });

 const player = new Sprite({
    position: {
        // 192X68 - is the size of the image
        x: canvas.width / 2 - 192 / 2,
        y: canvas.height / 2 - 68 / 10
    },
    image: playerImage,
    frames: {
        max: 4
    }
 })

 const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
 }

 const movables = [background, ...boundaries];

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

    if (keys.w.pressed) {
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
