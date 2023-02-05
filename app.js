const THUMBNAILS = document.querySelectorAll('.thumbnail img');
const POPUP = document.querySelector('.popup');
const POPUP_CLOSE = document.querySelector('.popup__close');
const POPUP_IMG = document.querySelector('.popup__img');
const ARROW_LEFT = document.querySelector('.popup__arrow--left');
const ARROW_RIGHT = document.querySelector('.popup__arrow--right');

const gallery = document.querySelector('.gallery .image'),
	previewBox = document.querySelector('.preview-box'),
	currentImg = document.querySelector('.current-img'),
	totalImg = document.querySelector('.total-img');

let currentImgIndex, showImgIndex;

const showNextImg = () => {
	if (currentImgIndex === THUMBNAILS.length - 1) {
		currentImgIndex = 0;
	} else {
		currentImgIndex++;
	}
	POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
	showImgIndex = currentImgIndex + 1;
	currentImg.innerHTML = showImgIndex;
	console.log(THUMBNAILS);
};

const showPreviousImg = () => {
	if (currentImgIndex === 0) {
		currentImgIndex = THUMBNAILS.length - 1;
	} else {
		currentImgIndex--;
	}
	POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
	showImgIndex = currentImgIndex + 1;
	currentImg.innerHTML = showImgIndex;
};

const closePopup = () => {
	POPUP.classList.add('fade-out');
	setTimeout(() => {
		POPUP.classList.add('hidden');
		POPUP.classList.remove('fade-out');
		THUMBNAILS.forEach((element) => {
			element.setAttribute('tabindex', -1);
		});
	}, 300);
};

THUMBNAILS.forEach((thumbnail, index) => {
	const showPopup = (e) => {
		POPUP.classList.remove('hidden');
		POPUP_IMG.src = e.target.src;
		currentImgIndex = index;
		THUMBNAILS.forEach((element) => {
			element.setAttribute('tabindex', -1);
		});
		console.log(currentImgIndex);
		totalImg.innerHTML = THUMBNAILS.length;
		showImgIndex = currentImgIndex + 1;
		currentImg.innerHTML = showImgIndex;
	};

	thumbnail.addEventListener('click', showPopup);

	thumbnail.addEventListener('keydown', (e) => {
		if (e.code === 'Enter') {
			showPopup(e);
		}
	});
});

POPUP_CLOSE.addEventListener('click', closePopup);

ARROW_RIGHT.addEventListener('click', showNextImg);

ARROW_LEFT.addEventListener('click', showPreviousImg);

document.addEventListener('keydown', (e) => {
	if (!POPUP.classList.contains('hidden')) {
		if (e.code === 'ArrowRight' || e.keyCode === 39) {
			showNextImg();
		}

		if (e.code === 'ArrowLeft' || e.keyCode === 37) {
			showPreviousImg();
		}

		if (e.code === 'Escape' || e.keyCode === 27) {
			closePopup();
		}
	}
});

POPUP.addEventListener('click', (e) => {
	if (e.target === POPUP) {
		closePopup();
	}
});
