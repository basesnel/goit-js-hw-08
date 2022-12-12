import Player from '@vimeo/player';

const VIDEO_CURRENT_TIME = 'videoplayer-current-time';
// console.log(localStorage);

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

console.log(player);

const currentTime = localStorage.getItem(VIDEO_CURRENT_TIME);
console.log(currentTime);

if (currentTime) player.setCurrentTime(currentTime);

const onplay = function (data) {
  // console.log(data.duration);
  // console.log(data.percent);
  // console.log(data.seconds);
  localStorage.setItem(VIDEO_CURRENT_TIME, data.seconds);
};

player.on('timeupdate', onplay);
