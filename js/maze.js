let canvas, ctx;
let ball = { x: 20, y: 20, radius: 10, color: 'blue' };
let mazeWalls = [];
let gameOver = false;

// Инициализация лабиринта
export function initMaze() {
  canvas = document.getElementById('mazeCanvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 400;

  // Рисуем стены лабиринта (прямоугольники)
  mazeWalls = [
    { x: 0, y: 0, w: 400, h: 10 }, // верх
    { x: 0, y: 0, w: 10, h: 400 }, // лево
    { x: 390, y: 0, w: 10, h: 400 }, // право
    { x: 0, y: 390, w: 400, h: 10 }, // низ
    { x: 100, y: 100, w: 200, h: 10 }, // горизонтальная внутри
    { x: 100, y: 100, w: 10, h: 200 }, // вертикальная внутри
    { x: 300, y: 200, w: 10, h: 200 }  // ещё вертикальная
  ];

  // Финальная зона (зелёный квадрат)
  const goal = { x: 350, y: 350, w: 40, h: 40 };

  // Обработчики клавиш
  canvas.focus();
  canvas.addEventListener('keydown', moveBall);

  // Основной цикл отрисовки
  function animate() {
    if (!gameOver) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Рисуем стены
      ctx.fillStyle = 'black';
      mazeWalls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
      });

      // Рисуем финиш
      ctx.fillStyle = 'green';
      ctx.fillRect(goal.x, goal.y, goal.w, goal.h);

      // Рисуем шарик
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      // Проверка победы
      if (
        ball.x + ball.radius > goal.x &&
        ball.x - ball.radius < goal.x + goal.w &&
        ball.y + ball.radius > goal.y &&
        ball.y - ball.radius < goal.y + goal.h
      ) {
        alert('Вы победили!');
        gameOver = true;
      }

      requestAnimationFrame(animate);
    }
  }

  animate(); // Запускаем анимацию
}

// Движение шарика по стрелкам
function moveBall(e) {
  const speed = 5;
  let newX = ball.x;
  let newY = ball.y;

  switch (e.key) {
    case 'ArrowUp':    newY -= speed; break;
    case 'ArrowDown':  newY += speed; break;
    case 'ArrowLeft':  newX -= speed; break;
    case 'ArrowRight': newX += speed; break;
    default: return; // Не обрабатываем другие клавиши
  }

  // Проверяем столкновение со стенами
  if (!checkCollision(newX, newY)) {
    ball.x = newX;
    ball.y = newY;
  }

  e.preventDefault(); // Блокируем скролл страницы при стрелках
}

// Проверка столкновения с стенами лабиринта
function checkCollision(x, y) {
  const radius = ball.radius;

  for (const wall of mazeWalls) {
    if (
      x + radius > wall.x &&
      x - radius < wall.x + wall.w &&
      y + radius > wall.y &&
      y - radius < wall.y + wall.h
    ) {
      return true; // Столкновение
    }
  }
  return false; // Нет столкновения
}

// Сброс позиции шарика (при перезапуске)
export function resetMaze() {
  ball.x = 20;
  ball.y = 2 Newton;
  gameOver = false;
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Перезапуск лабиринта (вызывается по кнопке)
export function restartMaze() {
  resetMaze();
  initMaze(); // Переинициализируем (чтобы возобновить анимацию)
}
