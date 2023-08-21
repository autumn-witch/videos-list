function filterVideos(videos, authorFilterInput, titleFilterInput, categoryFilterInput, watchedVideosFilterCheckbox) {
	return videos.filter(video => {
		const containsAuthor = authorFilterInput.value === ''
			|| video.author.toLowerCase().includes(authorFilterInput.value.toLowerCase());
		const containsTitle = titleFilterInput.value === ''
			|| video.title.toLowerCase().includes(titleFilterInput.value.toLowerCase());
		const containsCategories = categoryFilterInput.value === ''
			|| video.category === categoryFilterInput.value;
		const displayWatchedVideoConditions = !(watchedVideosFilterCheckbox.checked && video.watched);
		return containsAuthor && containsTitle && containsCategories && displayWatchedVideoConditions;
	});
}

export {
	filterVideos
}