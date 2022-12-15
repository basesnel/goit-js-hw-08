import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const VIDEO_CURRENT_TIME = 'videoplayer-current-time';
// console.log(localStorage);

document.addEventListener('touchstart', { passive: true });

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

console.log(player);

const currentTime = localStorage.getItem(VIDEO_CURRENT_TIME);
console.log(currentTime);

// if (currentTime) player.setCurrentTime(currentTime);
// console.log(player.setCurrentTime(currentTime));

if (currentTime)
  player
    .setCurrentTime(currentTime)
    .then(seconds => console.log(`The video set at the  ${seconds}-time.`))
    .catch(error => {
      switch (error.name) {
        case 'RangeError':
          console.log(
            'The time was less than 0 or greater than the video’s duration'
          );
          break;

        default:
          console.log(
            'Some other error occurred: current time is empty value or etc..'
          );
          break;
      }
    });

const onplay = function (data) {
  // console.log(data.duration);
  // console.log(data.percent);
  // console.log(data.seconds);
  localStorage.setItem(VIDEO_CURRENT_TIME, data.seconds);
};

player.on('timeupdate', throttle(onplay, 3000));
