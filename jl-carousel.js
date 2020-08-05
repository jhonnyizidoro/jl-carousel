const initCarousel = (selector, options) => {

	let currentSlide = 0
	let slides = getSlides(selector)
	const slidesWrapper = document.querySelector(`${selector} .carousel__slides`)
	const controlLeft = document.querySelector(`${selector} .carousel__control__left`)
	const controlRight = document.querySelector(`${selector} .carousel__control__right`)
	const { perView } = options

	slides.forEach(slide => slide.style.width = `${100 / perView}%`)
	controlLeft.classList.add('carousel__control__disabled')

	while (perView > slidesWrapper.children.length) {
		cloneInTheEnd(slidesWrapper, slides)
	}
	slides = getSlides(selector)

	on('click', controlRight, () => {
		currentSlide = moveSlides(currentSlide, 'right', slides)
		controlLeft.classList.remove('carousel__control__disabled')
		if (currentSlide + perView === slidesWrapper.children.length) {
			cloneInTheEnd(slidesWrapper, slides)
			slides = getSlides(selector)
		}
	})

	on('click', controlLeft, () => {
		if (currentSlide === 0) {
			controlLeft.classList.add('carousel__control__disabled')
		} else {
			currentSlide = moveSlides(currentSlide, 'left', slides)
		}
	})
}

const moveSlides = (currentSlide, direction, slides) => {
	const nextSlide = direction === 'left' ? currentSlide - 1 : currentSlide + 1
	slides.forEach(slide => slide.style.transform = `translateX(${nextSlide * -100}%)`)
	return nextSlide
}

const getSlides = selector => document.querySelectorAll(`${selector} .carousel__slide`)
const cloneInTheEnd = (wrapper, slides) => slides.forEach(slide => wrapper.appendChild(slide.cloneNode(true)))