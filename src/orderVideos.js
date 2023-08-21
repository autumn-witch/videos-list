// contains ascending state
const orderState = {
	author: false,
	title: false,
	duration: false,
	category: false
};

function resetOrderState() {
	orderState.author = false;
	orderState.title = false;
	orderState.duration = false;
	orderState.category = false;
}

function getCurrentOrderStateOf(fieldName) {
	return orderState[fieldName];
}

function updateCurrentOrderState(fieldName) {
	const value = orderState[fieldName];
	resetOrderState();
	orderState[fieldName] = !value;
}

function orderAlphabetically(videos, fieldName, isOrderAscending) {
	videos.sort((a, b) => {
    const valueOne = a[fieldName];
    const valueTwo = b[fieldName];
    if (isOrderAscending) {
      if (valueOne > valueTwo) {
        return 1;
      } else if (valueOne > valueTwo) {
        return -1;
      }
      return 0;
    } else {
      if (valueOne > valueTwo) {
        return -1;
      } else if (valueOne < valueTwo) {
        return 1;
      }
      return 0;
    }
  });
}

function orderByDuration(videos, isOrderAscending) {
	videos.sort((a, b) => {
    const valueOne = { hours: a.hours, minutes: a.minutes };
    const valueTwo = { hours: b.hours, minutes: b.minutes };
    if (isOrderAscending) {
      if (valueOne.hours > valueTwo.hours) {
        return 1;
      } else if (valueOne.hours < valueTwo.hours) {
        return -1;
      } else {
        if (valueOne.minutes > valueTwo.minutes) {
          return 1;
        } else if (valueOne.minutes < valueTwo.minutes) {
          return -1;
        }
      }
      return 0;
    } else {
      if (valueOne.hours > valueTwo.hours) {
        return -1;
      } else if (valueOne.hours < valueTwo.hours) {
        return 1;
      } else {
        if (valueOne.minutes > valueTwo.minutes) {
          return -1;
        } else if (valueOne.minutes < valueTwo.minutes) {
          return 1;
        }
      }
      return 0;
    }
  });
}

export { getCurrentOrderStateOf, updateCurrentOrderState, orderAlphabetically, orderByDuration };