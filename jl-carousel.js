const initCarousel = (selector, options) => {

	const carousel = document.querySelector(selector)
	const slidesWrapper = document.querySelector(`${selector}__slides`)
	const slides = document.querySelectorAll(`${selector}__slide`)
	const controlLeft = document.querySelector(`${selector}__control__left`)
	const controlRight = document.querySelector(`${selector}__control__right`)

	const { perView } = options

	while (perView > slidesWrapper.children.length) {
		slides.forEach(slide => {
			slidesWrapper.appendChild(slide.cloneNode(true))
		})
	}

}