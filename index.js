console.log('works')

const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = 'white';

c.fillRect(0, 0, canvas.width, canvas.height);

 const image = new Image();
 image.src = './img/pokemonMap.png';

 const playerImage = new Image();
 playerImage.src = './img/playerDown.png';

 class Sprite {
    constructor({
        position,
        image
    }) {
        this.position = position;
        this.image = image;
    }

    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
 }

 const background = new Sprite({
    position: { x: -950, y: -350 },
    image: image
 });

 const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
 }

 function animate() {
    requestAnimationFrame(animate);

    background.draw(c);
    
    c.drawImage(
        playerImage, 
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 2, 
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
    );

    if (keys.w.pressed) background.position.y += 3;
    if (keys.s.pressed) background.position.y -= 3;
    if (keys.a.pressed) background.position.x += 3;
    if (keys.d.pressed) background.position.x -= 3;
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
