const defaults = {
	container: "",
	width: "100%",
	height: "auto",
	autoplay: false,
	controls: true,
};

class Sliderik {
	constructor(props) {
		this.props = { ...defaults, ...props };
		this.slider = document.getElementById(this.props.container);
		this.slides = this.slider.querySelectorAll(".sliderik__slide");
	}

	init() {
		// Set slider styles
		const setSliderStyles = () => {
			const sliderStyles = [
				"position: relative",
				"overflow: hidden",
				`width: ${this.props.width}`,
				`height: ${this.props.height}`,
			];
			this.slider.style.cssText = sliderStyles.join("; ");
		};
		setSliderStyles();

		// Add buttons
		if (this.props.controls) {
			let nextButton = document.createElement("a");
			nextButton.setAttribute("class", "sliderik__button sliderik__next");
			nextButton.textContent = ">";
			this.slider.appendChild(nextButton);

			let prevButton = document.createElement("a");
			prevButton.setAttribute("class", "sliderik__button sliderik__prev");
			prevButton.textContent = "<";
			this.slider.appendChild(prevButton);
		}

		// Initialize slider
		let slideIndex = 1;

		const setSlide = (index) => {
			if (index > this.slides.length) {
				slideIndex = 1;
			}
			if (index < 1) {
				slideIndex = this.slides.length;
			}
			this.slides.forEach((slide) => {
				slide.style.display = "none";
			});
			this.slides[slideIndex - 1].style.display = "block";
		};

		const nextSlide = (n) => {
			setSlide((slideIndex += n));
		};
		const prevSlide = (n) => {
			setSlide((slideIndex -= n));
		};

		setSlide(slideIndex);

		// Set autoplay
		if (this.props.autoplay) {
			const autoSlider = setInterval(() => {
				nextSlide(1);
			}, 5000);
		}

		// Set functions to controls
		if (this.props.controls) {
			document
				.querySelector(".sliderik__next")
				.addEventListener("click", () => {
					nextSlide(1);
				});
			document
				.querySelector(".sliderik__prev")
				.addEventListener("click", () => {
					prevSlide(1);
				});
		}
	}
}
