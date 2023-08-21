import { videos } from '../data/videos.js';
import { fillHeaderInfos, fillSelectCategoryOptions, fillTableContent, addEventListeners } from "./handleHtml.js";

const displayedVideos = structuredClone(videos);

fillSelectCategoryOptions(displayedVideos);
fillTableContent(displayedVideos);
fillHeaderInfos(displayedVideos);

addEventListeners(displayedVideos);