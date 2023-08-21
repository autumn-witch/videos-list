import { getCurrentOrderStateOf, updateCurrentOrderState, orderAlphabetically, orderByDuration } from "./orderVideos.js";
import { filterVideos } from "./filterVideos.js";
import { 
	incrementTotalDuration,
	updateTotalDuration,
	totalDuration,
	leftoverMinutes,
	notWatchedDuration,
	notWatchedLeftoverMinutes
} from './duration.js';

const selectCategoryElement = document.querySelector('#category-filter');
const tableBody = document.querySelector('#table-body');

const authorHeaderElement = document.querySelector('#author-th');
const titleHeaderElement = document.querySelector('#title-th');
const durationHeaderElement = document.querySelector("#duration-th");
const categoryHeaderElement = document.querySelector('#category-th');

const authorFilterInput = document.querySelector("#author-filter");
const titleFilterInput = document.querySelector("#title-filter");
const categoryFilterInput = document.querySelector("#category-filter");
const watchedVideosFilterCheckbox = document.querySelector("#watched-filter");

function fillHeaderInfos(videos) {
	const videosAmountSpan = document.querySelector("#videos-amount");
  videosAmountSpan.textContent = `Nombre total de vidéos: ${videos.length}.`;
	
  const durationSpan = document.querySelector("#total-duration");
  durationSpan.textContent = `Durée totale: ${totalDuration} heures et ${leftoverMinutes} minutes.`;

  const notWatchedAmountSpan = document.querySelector("#not-watched-amount");
  notWatchedAmountSpan.textContent = `Nombre de vidéos restantes: ${
		videos.filter((e) => e.watched === false).length
  }.`;

  const notWatchedDurationSpan = document.querySelector("#not-watched-duration");
  notWatchedDurationSpan.textContent = `Durée restante: ${notWatchedDuration} heures et ${notWatchedLeftoverMinutes} minutes.`;
}

function fillSelectCategoryOptions(videos) {
	const categories = Array.from(new Set(videos.flatMap(video => video.category)));
	for(const category of categories) {
		selectCategoryElement.innerHTML += `<option value=${category}>${category}</option>`;
	}
}

function fillTableContent(videos) {
	if (videos.length === 0) {
    resetDurations();
    return;
  }
	for(const video of videos) {
		tableBody.innerHTML += `
			<tr ${video.watched ? "class='watched-video'" : ""}>
				<td>${video.author}</td>
				<td>${video.title}</td>
				<td>${video.hours}h${video.minutes}min</td>
				<td>${video.category}</td>
			</tr>
		`;
    incrementTotalDuration(video);
	}
}

function resetTableHeaders() {
	authorHeaderElement.textContent = "Auteur-ice";
  titleHeaderElement.textContent = "Title";
  durationHeaderElement.textContent = "Durée";
  categoryHeaderElement.textContent = "Catégorie";
}

function resetTableBody() {
	tableBody.innerHTML = "";
}

function displayArrow(element, arrow) {
	element.innerHTML += ` ${arrow}`;
}

function addEventListeners(videos) {
	for (const tableHeader of document.querySelectorAll("th")) {
		tableHeader.addEventListener("click", () => {
			const clickedFieldName = tableHeader.id.split("-")[0];

			const currentOrder = getCurrentOrderStateOf(clickedFieldName);

			// step 1: update current order state
			updateCurrentOrderState(clickedFieldName);
			
			// step 2: reorder the videos
			switch(clickedFieldName) {
				case 'author':
				case 'title':
				case 'category': {
					orderAlphabetically(videos, clickedFieldName, !currentOrder);
					break;
				}
				case 'duration': {
					orderByDuration(videos, !currentOrder);
					break;
				}
			}

			// step 4: refresh the html
			resetTableHeaders();
			resetTableBody();

			const arrow = !currentOrder ? '&#8593;' : '&#8595;';
			displayArrow(tableHeader, arrow);
			fillTableContent(videos);
		});
	}
	authorFilterInput.addEventListener("input", () => {
		const filteredVideos = filterVideos(videos, authorFilterInput, titleFilterInput, categoryFilterInput, watchedVideosFilterCheckbox);
		resetTableBody();
		fillTableContent(filteredVideos);
		updateTotalDuration(filteredVideos);
		fillHeaderInfos(filteredVideos);
	});
	titleFilterInput.addEventListener("input", () => {
		const filteredVideos = filterVideos(videos, authorFilterInput, titleFilterInput, categoryFilterInput, watchedVideosFilterCheckbox);
		resetTableBody();
		fillTableContent(filteredVideos);
		updateTotalDuration(filteredVideos);
		fillHeaderInfos(filteredVideos);
	});
	categoryFilterInput.addEventListener("change", () => {
		const filteredVideos = filterVideos(videos, authorFilterInput, titleFilterInput, categoryFilterInput, watchedVideosFilterCheckbox);
		resetTableBody();
		fillTableContent(filteredVideos);
		updateTotalDuration(filteredVideos);
		fillHeaderInfos(filteredVideos);
	});
	watchedVideosFilterCheckbox.addEventListener("click", () => {
		const filteredVideos = filterVideos(videos, authorFilterInput, titleFilterInput, categoryFilterInput, watchedVideosFilterCheckbox);
		resetTableBody();
		fillTableContent(filteredVideos);
	});
}

export {
	fillHeaderInfos,
	fillSelectCategoryOptions,
	fillTableContent,
	addEventListeners
}