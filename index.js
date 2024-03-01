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

 function animate() {
    requestAnimationFrame(animate);

    c.drawImage(image, -950, -350);
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
 }

 animate();

 window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'w':
            console.log('W');
            break;
        case 'a':
            console.log('a');
            break;
        case 's':
            console.log('s');
            break;
        case 'd':
            console.log('d');
            break;
    }
 })
