export function initVideo() {
  const video = document.getElementById('myVideo');
  let isPressed = false;

  // ПК
  video.addEventListener('mousedown', () => { isPressed = true; start(); });
  video.addEventListener('mouseup', () => { isPressed = false; stop(); });
  video.addEventListener('mouseleave', () => { isPressed = false; stop(); });

  // Мобильные
  video.addEventListener('touchstart', (e) => { e.preventDefault(); isPressed = true; start(); });
  video.addEventListener('touchend', () => { isPressed = false; stop(); });
  video.addEventListener('touchcancel', () => { isPressed = false; stop(); });


  function start() {
    setTimeout(() => { if (isPressed) video.play(); }, 500);
  }

  function stop() {
    video.pause();
  }

  video.addEventListener('ended', () => {
    onVideoComplete();
  });

  video.addEventListener('error', () => {
    alert('Ошибка загрузки видео.');
  });
}

export function onVideoComplete() {
  import('./main.js').then(module => {
    module.gotoMaze();
  });
}
