const headerSlider = () => {
	const headerSwiper = new Swiper(".header__slider", {
		loop: true,
		speed: 2500,

		autoplay: {
			delay: 2000,
			disableOnInteraction: false,
		},

		pagination: {
			el: ".header__swiper-pagination",
			clickable: true,
		},
	});
};
headerSlider();

const burger = () => {
	const burger = document.querySelector(".burger");
	const mobile = document.querySelector(".mobile");
	const body = document.querySelector("body");
	const mobileLink = document.querySelectorAll(".mobile__item");

	burger.addEventListener("click", () => {
		burger.classList.toggle("open");
		mobile.classList.toggle("active");
		body.classList.toggle("noscroll");
	});

	mobileLink.forEach((item) => {
		item.querySelector(".mobile__link").addEventListener("click", () => {
			burger.classList.remove("open");
			mobile.classList.remove("active");
			body.classList.remove("noscroll");
		});
	});
};
burger();

// анимация при скроле
const eventScroll = () => {
	// общий класс для всех элементов, которые нужно анимировать
	const animItems = document.querySelectorAll(".anim-items");

	// проверяем есть ли элементы для анимации
	if (animItems.length > 0) {
		window.addEventListener("scroll", animOnScroll);

		function animOnScroll() {
			animItems.forEach((item) => {
				const animItem = item;
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;
				const animStart = 4;

				let animItemPoint = window.innerHeight - animItemHeight / animStart;

				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
					animItem.classList.add("active");
				} /*else {
					animItem.classList.remove("active");
				}*/
			});
		}

		function offset(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
		}
	}
};
eventScroll();

// работа вкладок в услугах
const servicesTabs = () => {
	const tabOne = document.getElementById("services__item-one");
	const tabTwo = document.getElementById("services__item-two");

	const listOne = document.getElementById("services__list-one");
	const listTwo = document.getElementById("services__list-two");

	const arrowOne = document.getElementById("arrow-one");
	const arrowTwo = document.getElementById("arrow-two");

	const gridRow = document.querySelector(".services__items");

	tabOne.addEventListener("click", () => {
		if (!tabOne.classList.contains("active") && !listOne.classList.contains("active")) {
			tabOne.classList.toggle("active");
			listOne.classList.toggle("active");
			arrowOne.classList.toggle("active");

			if (window.innerWidth <= 768) {
				gridRow.style.gridTemplateRows = "31px 1fr 31px 0";
			}
		}

		if (tabTwo.classList.contains("active") && listTwo.classList.contains("active")) {
			tabTwo.classList.toggle("active");
			listTwo.classList.toggle("active");
			arrowTwo.classList.toggle("active");
		}
	});

	tabTwo.addEventListener("click", () => {
		if (!tabTwo.classList.contains("active") && !listTwo.classList.contains("active")) {
			tabTwo.classList.toggle("active");
			listTwo.classList.toggle("active");
			arrowTwo.classList.toggle("active");

			if (window.innerWidth <= 768) {
				gridRow.style.gridTemplateRows = "31px 0 31px 1fr";
			}
		}

		if (tabOne.classList.contains("active") && listOne.classList.contains("active")) {
			tabOne.classList.toggle("active");
			listOne.classList.toggle("active");
			arrowOne.classList.toggle("active");
		}
	});
};
servicesTabs();

// переключение табов в разделе технологии / начало
const technologiesTabs = () => {
	const jsTrigger = document.querySelectorAll(".js-tab-trigger");

	jsTrigger.forEach((item) => {
		item.addEventListener("click", () => {
			let tabName = item.getAttribute("data-tab");

			let tabContent = document.querySelector('.js-tab-content[data-tab="' + tabName + '"]');

			document.querySelectorAll(".js-tab-content.active").forEach((item) => {
				item.classList.remove("active");
			});

			tabContent.classList.add("active");

			document.querySelectorAll(".js-tab-trigger.active").forEach((item) => {
				item.classList.remove("active");
			});

			item.classList.add("active");
		});
	});
};
technologiesTabs();

// переключатель в разделе технологии строительства
const technologiesAction = () => {
	const plus = document.querySelectorAll(".tabs__content-info");

	plus.forEach((item) => {
		item.addEventListener("click", () => {
			let plusInfo = item.querySelectorAll(".tabs__content-hover");

			plusInfo.classList.add("active");
		});
	});
};
technologiesAction();

// переключение табов в разделе проекты
const projectsTabs = () => {
	// нашли все табы
	const jsTrigger = document.querySelectorAll(".tab-projects-btn");

	// находим класс со слайдером
	const projectsSliderHTML = document.querySelector(".projects__slider");
	const projectsItems = projectsSliderHTML.querySelector(".swiper-wrapper");

	// текущий слайд и общее кол-во слайдов рядом со скроллом
	const swiperCurrentNumber = document.querySelector(".projects__scroll-current");
	// общее количество слайдов
	const swiperCountNumber = document.querySelector(".projects__scroll-count");

	// создаём слайдер
	const createSlider = (item) => {
		// забираем у таба, путь к json файлу
		let tabName = item.getAttribute("data-file");

		// создание слайда
		const renderCard = (data) => {
			// удаляем все слайды
			projectsItems.innerHTML = ``;

			// считаем количество слайдов
			let countSlides = 0;

			// добавляем новые, загруженные из json файла
			data.forEach((item) => {
				// реструктуризация
				const { id, title, description, image } = item;

				const div = document.createElement("div");
				div.innerHTML = ``;

				div.classList.add("projects__slide");
				div.classList.add("swiper-slide");

				div.innerHTML = `
						<div class="projects__slide-img">
							<img src="${image}" alt="${title}" />
						</div>
						<div class="projects__slide-title">${title}</div>
						<div class="projects__slide-text">${description}</div>
	         `;
				// добавляем слайд на страницу
				projectsItems.append(div);
				countSlides++;
			});

			// выводим общее число слайдов
			if (countSlides < 10) {
				swiperCountNumber.innerText = `0${countSlides}`;
			} else {
				swiperCountNumber.innerText = `${countSlides}`;
			}
		};

		// читаем данные из json файла
		let fetches = [];
		fetches.push(
			fetch(`db/projects/${tabName}.json`)
				.then((response) => response.json())
				.then((data) => {
					// console.log(data); // получим массив с объектами
					renderCard(data);
				})
				.catch((error) => {
					console.log(error);
				})
		);

		Promise.all(fetches).then(() => {
			projectsSlider();
		});
	};

	// флаг для проверки первого запуска
	let flagFirstStart = true;

	if (flagFirstStart) {
		// находим таб с включенным active
		const itemActive = document.querySelector(".tab-projects-btn.active");

		flagFirstStart = false;

		// создаём слайдер
		createSlider(itemActive);
	}

	// проверяем нажатие на таб
	jsTrigger.forEach((item) => {
		item.addEventListener("click", () => {
			const swiperNotification = projectsSliderHTML.querySelectorAll(".swiper-notification");
			swiperNotification[0].remove();

			// создаём слайдер
			createSlider(item);

			// переключение вкладок
			document.querySelectorAll(".tab-projects-btn.active").forEach((item) => {
				item.classList.remove("active");
			});
			item.classList.add("active");
		});
	});
};
projectsTabs();

// создали переменную для слайдера
let projectsSwiper;
// слайдер проектов
const projectsSlider = () => {
	// инициализация слайдера
	const sliderInit = () => {
		projectsSwiper = new Swiper(".projects__slider", {
			loop: false, // бесконечный слайдер отключаем, так как вместе со скроллом, не совместимы
			speed: 1000, // скорость
			// slidesPerView: 3, // количество слайдов для показа (можно указывать например 2.8 слайда)
			spaceBetween: 19, // размер отступа, между слайдами
			watchOverFlow: true, // отключает функционал, если слайдов меньше, чем нужно
			simulateTouch: true, // включение перетаскивания на компьютере
			scrollbar: {
				el: ".projects__scroll-scrollbar",
				dragSize: 80, // размер бегунка
				draggable: true, // возможность перетаскивания скролл
			},
			navigation: {
				prevEl: ".swiper-button-prev",
				nextEl: ".swiper-button-next",
			},

			breakpoints: {
				// ширина >= 320px
				300: {
					slidesPerView: 1.41,
				},

				350: {
					slidesPerView: 1.45,
				},

				400: {
					slidesPerView: 1.6,
				},

				450: {
					slidesPerView: 1.8,
				},

				500: {
					slidesPerView: 2.2,
				},

				550: {
					slidesPerView: 2.5,
				},

				// ширина >= 660px
				660: {
					slidesPerView: 2.5,
				},

				768: {
					slidesPerView: 2.1,
				},

				800: {
					slidesPerView: 2.5,
				},

				// ширина >= 940px
				940: {
					slidesPerView: 3,
				},
			},
		});

		// текущий слайд
		const swiperCurrentNumber = document.querySelector(".projects__scroll-current");
		swiperCurrentNumber.innerHTML = "01";

		projectsSwiper.on("slideChange", () => {
			let index = projectsSwiper.realIndex + 1;

			// заносим текущий слайд в html код
			if (index < 10) {
				swiperCurrentNumber.innerText = `0${index}`;
			} else {
				swiperCurrentNumber.innerText = `${index}`;
			}
		});
	};

	if (!projectsSwiper) {
		// создаём слайдер, первый раз
		sliderInit();
	} else {
		// слайдер существовал мы его удаляем и создаём новый
		projectsSwiper.destroy();
		sliderInit();
	}
};

// табы наши готовые дома
const houseTabs = () => {
	// нашли все табы
	const jsTrigger = document.querySelectorAll(".house-tab");

	// находим класс со слайдером
	const housesSliderHTML = document.querySelector(".houses__gallery-item");
	const housesItems = housesSliderHTML.querySelector(".swiper-wrapper");

	// текущий слайд и общее кол-во слайдов рядом со скроллом
	const swiperCurrentNumber = document.querySelector(".houses__scroll-current");
	// общее количество слайдов
	const swiperCountNumber = document.querySelector(".houses__scroll-count");

	const swiperPaginationActive = document.querySelector(".swiper-pagination-bullet-active");

	// создаём слайдер
	const createSlider = (item) => {
		// забираем у таба, путь к json файлу
		let nameFile = item.getAttribute("data-file");

		// создание слайда
		const renderCard = (data) => {
			// удаляем все слайды
			housesItems.innerHTML = ``;

			// считаем количество слайдов
			let countSlides = 0;

			// добавляем новые, загруженные из json файла
			data.forEach((item) => {
				// реструктуризация
				const { title, image } = item;

				const div = document.createElement("div");
				div.innerHTML = ``;

				div.classList.add("houses__gallery-slide");
				div.classList.add("swiper-slide");

				div.innerHTML = `
						<img src="${image}" alt="${title}" />
	         `;
				// добавляем слайд на страницу
				housesItems.append(div);
				countSlides++;
			});

			// выводим общее число слайдов
			if (countSlides < 10) {
				swiperCountNumber.innerText = `0${countSlides}`;
			} else {
				swiperCountNumber.innerText = `${countSlides}`;
			}
		};

		// читаем данные из json файла
		let fetches = [];
		fetches.push(
			fetch(`db/house/${nameFile}.json`)
				.then((response) => response.json())
				.then((data) => {
					// console.log(data); // получим массив с объектами
					renderCard(data);
				})
				.catch((error) => {
					console.log(error);
				})
		);

		Promise.all(fetches).then(() => {
			houseSlider();
		});
	};

	// флаг для проверки первого запуска
	let flagFirstStart = true;

	if (flagFirstStart) {
		// находим таб с включенным active
		const itemActive = document.querySelector(".house-tab.active");

		flagFirstStart = false;

		// создаём слайдер
		createSlider(itemActive);
	}

	// проверяем нажатие на таб
	jsTrigger.forEach((item) => {
		item.addEventListener("click", () => {
			const swiperNotification = housesSliderHTML.querySelectorAll(".swiper-notification");
			swiperNotification[0].remove();

			// забираем у таба, номер вкладки
			let tabName = item.getAttribute("data-tab");

			let tabContent = document.querySelector('.houses__content-item[data-tab="' + tabName + '"]');

			// создаём слайдер
			createSlider(item);

			// переключение вкладок
			document.querySelectorAll(".house-tab.active").forEach((item) => {
				item.classList.remove("active");
			});

			item.classList.add("active");

			document.querySelectorAll(".house-content.active").forEach((item) => {
				item.classList.remove("active");
			});

			tabContent.classList.add("active");
		});
	});
};
houseTabs();

// создали переменную для слайдера
let houseSwiper;
// слайдер наши готовые дома
const houseSlider = () => {
	// инициализация слайдера
	const sliderInit = () => {
		houseSwiper = new Swiper(".house-gallery", {
			loop: false, // бесконечный слайдер отключаем, так как вместе со скроллом, не совместимы
			speed: 1000, // скорость
			simulateTouch: true, // включение перетаскивания на компьютере
			pagination: {
				el: ".houses__gallery-pagination",
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">0' + (index + 1) + "</span>";
				},
			},
			navigation: {
				prevEl: ".houses__gallery-prev",
				nextEl: ".houses__gallery-next",
			},

			breakpoints: {
				// ширина >= 320px
				300: {
					spaceBetween: 16, // размер отступа, между слайдами
					slidesPerView: 1.4,
					direction: "horizontal",
					scrollbar: {
						el: ".houses__scroll-scrollbar",
						dragSize: 80, // размер бегунка
						draggable: true, // возможность перетаскивания скролл
					},
				},

				// ширина >= 660px
				660: {
					slidesPerView: 1,
					direction: "vertical",
				},
			},
		});

		// текущий слайд
		const swiperCurrentNumber = document.querySelector(".houses__scroll-current");
		swiperCurrentNumber.innerHTML = "01";

		// общее кол-во слайдов рядом со скроллом
		const swiperCountNumber = document.querySelector(".houses__scroll-count");

		// считаем кол-во слайдов
		const countProjectsSlides = document.querySelectorAll(".houses__gallery-slide");
		let ProjectsSlidesLength = countProjectsSlides.length;

		// заносим кол-во слайдов в html код
		swiperCountNumber.innerText = `0${ProjectsSlidesLength}`;

		houseSwiper.on("slideChange", () => {
			let index = houseSwiper.realIndex + 1;

			// заносим текущий слайд в html код
			if (index < 10) {
				swiperCurrentNumber.innerText = `0${index}`;
			} else {
				swiperCurrentNumber.innerText = `${index}`;
			}
		});
	};

	if (!houseSwiper) {
		// создаём слайдер, первый раз
		sliderInit();
	} else {
		// слайдер существовал мы его удаляем и создаём новый
		houseSwiper.destroy();
		sliderInit();
	}
};

// отправка заявки на специальное предложение
const offer = () => {
	const name = document.getElementById("offer_form_name");
	const phone = document.getElementById("offer_form_phone");

	const btn = document.querySelector(".offer__form-btn");

	btn.addEventListener("click", () => {
		name.classList.remove("active");
		phone.classList.remove("active");

		if (!name.value) {
			name.classList.add("active");
		}

		if (!phone.value) {
			phone.classList.add("active");
		}
	});
};
offer();

// форма валидации
const validationForm = () => {
	const name = document.getElementById("modal_form_name");
	const phone = document.getElementById("modal_form_phone");
	const agree = document.querySelector(".modal__form-checkbox");
	const btn = document.querySelector(".modal__form-btn");

	btn.addEventListener("click", () => {
		console.log("press");

		name.classList.remove("error");
		phone.classList.remove("error");
		agree.querySelector(".checkbox").classList.remove("error");

		if (!name.value) {
			name.classList.add("error");
		}

		if (!phone.value) {
			phone.classList.add("error");
		}

		console.log(agree.querySelector(".hidden-checkbox").checked);

		if (!agree.querySelector(".hidden-checkbox").checked) {
			agree.querySelector(".checkbox").classList.add("error");
		}
	});
};

// модальное окно обратный звонок
const modalCallBackMobile = () => {
	const btn = document.querySelector(".mobile__phone-backcall");
	const modal = document.querySelector(".modal");
	const body = document.querySelector("body");
	const close = document.querySelector(".modal__close");
	const mobileMenu = document.querySelector(".mobile");
	const burger = document.querySelector(".burger");

	btn.addEventListener("click", (event) => {
		event.preventDefault();

		const modal_btn = document.querySelector(".modal__form-btn");

		modal.classList.add("active");
		body.classList.add("block");

		modal_btn.querySelector(".btn__text").innerText = "Заказать звонок";

		mobileMenu.classList.remove("active");
		burger.classList.remove("open");
		body.classList.remove("noscroll");

		validationForm();
	});

	document.addEventListener("mousedown", (event) => {
		// if (event.target !== modal.querySelector(".modal__wrapper")) {
		// 	modal.classList.remove("active");
		// 	body.classList.remove("block");
		// }
		if (event.target.closest(".modal__wrapper") === null) {
			modal.classList.remove("active");
			body.classList.remove("block");
		}
	});

	close.addEventListener("click", () => {
		modal.classList.remove("active");
		body.classList.remove("block");
	});
};
modalCallBackMobile();

// модальное окно обратный звонок
const modalCallBack = () => {
	const btn = document.querySelector(".header__phone-backcall");
	const modal = document.querySelector(".modal");
	const body = document.querySelector("body");
	const close = document.querySelector(".modal__close");

	btn.addEventListener("click", (event) => {
		event.preventDefault();

		const modal_btn = document.querySelector(".modal__form-btn");

		modal.classList.add("active");
		body.classList.add("block");

		modal_btn.querySelector(".btn__text").innerText = "Заказать звонок";

		validationForm();
	});

	document.addEventListener("mousedown", (event) => {
		// if (event.target !== modal.querySelector(".modal__wrapper")) {
		// 	modal.classList.remove("active");
		// 	body.classList.remove("block");
		// }
		if (event.target.closest(".modal__wrapper") === null) {
			modal.classList.remove("active");
			body.classList.remove("block");
		}
	});

	close.addEventListener("click", () => {
		modal.classList.remove("active");
		body.classList.remove("block");
	});
};
modalCallBack();

// модальные окна оставить заявку
const submit_application = () => {
	const btn = document.querySelectorAll(".btn-modal");

	const modal = document.querySelector(".modal");
	const body = document.querySelector("body");
	const close = document.querySelector(".modal__close");

	btn.forEach((item) => {
		item.addEventListener("click", (event) => {
			event.preventDefault();

			const modal_btn = document.querySelector(".modal__form-btn");

			modal.classList.add("active");
			body.classList.add("block");

			modal_btn.querySelector(".btn__text").innerText = item.querySelector(".btn__text").innerText;

			validationForm();
		});
	});

	document.addEventListener("mousedown", (event) => {
		// if (event.target !== modal.querySelector(".modal__wrapper")) {
		// 	modal.classList.remove("active");
		// 	body.classList.remove("block");
		// }
		if (event.target.closest(".modal__wrapper") === null) {
			modal.classList.remove("active");
			body.classList.remove("block");
		}
	});

	close.addEventListener("click", () => {
		modal.classList.remove("active");
		body.classList.remove("block");
	});
};
submit_application();

// плавная прокрутка
const smothScroll = () => {
	const anchors = document.querySelectorAll('a[href*="#"]');
	for (let anchor of anchors) {
		anchor.addEventListener("click", (event) => {
			event.preventDefault();

			const blockID = anchor.getAttribute("href").substr(1);

			document.getElementById(blockID).scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	}
};
smothScroll();
