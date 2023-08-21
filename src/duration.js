let totalDuration = 0;
let leftoverMinutes = 0;

let notWatchedDuration = 0;
let notWatchedLeftoverMinutes = 0;

function resetDurations() {
  totalDuration = 0;
  leftoverMinutes = 0;
  notWatchedDuration = 0;
  notWatchedLeftoverMinutes = 0;
}

function incrementTotalDuration(video) {
  totalDuration += video.hours;
  leftoverMinutes += video.minutes;
  if (leftoverMinutes >= 60) {
    totalDuration += 1;
    leftoverMinutes -= 60;
  }
  if (!video.watched) {
    notWatchedDuration += video.hours;
    notWatchedLeftoverMinutes += video.minutes;
    if (notWatchedLeftoverMinutes >= 60) {
      notWatchedDuration += 1;
      notWatchedLeftoverMinutes -= 60;
    }
  }
}

function updateTotalDuration(videos) {
  resetDurations();
  for (const video of videos) {
    incrementTotalDuration(video);
  }
}

export {
  incrementTotalDuration,
  totalDuration,
  leftoverMinutes,
  notWatchedDuration,
  notWatchedLeftoverMinutes,
	updateTotalDuration
}