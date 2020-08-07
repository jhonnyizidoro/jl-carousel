const initCarousel = (selector, options = {}) => {

	const { perView = 1 } = options
	const { slidesWrapper, controlLeft, controlRight, slides } = getCarouselElements(selector)

	let dragging = false
	let currentSlide = 0
	let draggingInitialPosition
	let slideWidth = setSlidesWidth(slides, perView)

	on('mousedown', slidesWrapper, ({ screenX }) => {
		slidesWrapper.style.transition = '0ms'
		draggingInitialPosition = screenX
		dragging = true
	})

	on('mouseup', document, ({ screenX }) => {
		slidesWrapper.style.transition = null
		if (dragging) {
			let slidesMoved = (screenX - draggingInitialPosition) / slideWidth
			if (slidesMoved > .5) {
				while (slidesMoved > .5) {
					currentSlide++
					slidesMoved--
				}
			} else if (slidesMoved < -.5) {
				while (slidesMoved < -.5) {
					currentSlide--
					slidesMoved++
				}
			}
			transformCarousel(slidesWrapper, currentSlide, slideWidth)
		}
		dragging = false
	})

	on('mousemove', document, ({ screenX }) => {
		if (dragging) {
			const distance = screenX - draggingInitialPosition
			transformCarousel(slidesWrapper, currentSlide, slideWidth, distance)
		}
	})

	on('click', controlRight, () => {
		currentSlide--
		transformCarousel(slidesWrapper, currentSlide, slideWidth)
	})

	on('click', controlLeft, () => {
		currentSlide++
		transformCarousel(slidesWrapper, currentSlide, slideWidth)
	})

	on('resize', window, () => {
		slideWidth = setSlidesWidth(slides, perView)
		transformCarousel(slidesWrapper, currentSlide, slideWidth)
	})

}

const setSlidesWidth = (slides, perView) => {
	slides.forEach(slide => {
		slide.style.width = `${100 / perView}%`
	})
	return slides[0].width
}

const getCarouselElements = selector => ({
	slides: document.querySelectorAll(`${selector}__slide`),
	slidesWrapper: document.querySelector(`${selector}__slides`),
	controlLeft: document.querySelector(`${selector}__control__left`),
	controlRight: document.querySelector(`${selector}__control__right`),
})

const transformCarousel = (slidesWrapper, currentSlide, slideWidth, additionalDistance = 0) => {
	slidesWrapper.style.transform = `translateX(${(currentSlide * slideWidth) + additionalDistance}px)`
}