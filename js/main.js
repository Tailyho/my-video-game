import { initVideo, onVideoComplete } from './video.js';
import { initMaze, resetMaze, restartMaze } from './maze.js';

let currentScene = 'video'; // Текущая сцена


document.addEventListener('DOMContentLoaded', () => {
  initVideo();
});

// Переключение на лабиринт
export function gotoMaze() {
  if (currentScene === 'video') {
    document.getElementById('scene-video').classList.remove('active');
    document.getElementById('scene-maze').classList.add('active');
    currentScene = 'maze';
    initMaze();
  }
}

// Возврат к видео
export function gotoVideo() {
  if (currentScene === 'maze') {
    document.getElementById('scene-maze').classList.remove('active');
    document.getElementById('scene-video').classList.add('active');
    currentScene = 'video';
    resetMaze();
  }
}

// Обработчик кнопки "Начать заново"
document.getElementById('btn-restart').addEventListener('click', () => {
  restartMaze();
});
