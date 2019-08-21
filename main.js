const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let player = new makeObject(170, 180, 30, 10);

let enemies = [new makeObject(170, 11, 20, 10)];

function makeObject(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.height = height;
    this.width = width;
    this.draw = () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.nextpos = () => {
        this.x += this.dx;
        this.y += this.dy;
    }
}

function collision(a, b) {
    if (a.y > b.y && a.y < b.y + b.height && a.x > b.x && a.x < b.x + b.width) {
        return true;
    }
    return false;
}

let bullets = [];

function shoot() {
    bullets.unshift(new makeObject(player.x + 12, player.y, 5, 5));
    console.log(bullets)
    bullets[0].dy -= 5;
}

function enemyhit() {
    enemies.forEach(enemy => {
        bullets.forEach(bullet => {
            if (collision(bullet, enemy)) {
                let indexb = bullets.indexOf(bullet);
                let indexe = enemies.indexOf(enemy);
                bullets.splice(indexb);
                enemies.splice(indexe);
            }
        });
    });
}

function movingBullets() {
    bullets.forEach(bullet => {
        bullet.y += bullet.dy;
        if (bullet.y < 0) {
            let index = bullets.indexOf(bullet)
            bullets.splice(index);
        }
    });
}

function draw() {
    enemies.forEach(enemy => {
        enemy.draw();
    });
    bullets.forEach(bullet => {
        bullet.draw();
    });
    player.draw();
}

function createEnemies() {
    
}

document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 32:
            shoot();
            break;
        case 37:
            player.dx = -5;
            break;
        case 39:
            player.dx = 5;
            break;
    }
});


document.addEventListener('keyup', (e) => {
    if (e.keyCode === 32) {
        //shoot();
    }
    else if (e.keyCode === 37) {
        player.dx = 0;
    }
    else if (e.keyCode === 39) {
        player.dx = 0;
    }
});

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    player.nextpos();
    enemyhit();
    movingBullets();
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);