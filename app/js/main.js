window.onload = () => {

  const getElem = (selector, single = true) => single ? document.querySelector(selector) : document.querySelectorAll(selector),
    isMobile = window.innerWidth < 768 ? true : false,
    getCoords = elem => elem.getBoundingClientRect().top + pageYOffset;









  // BASE ================================================
  const main_slider = getElem('.banner__slider'),
    modal_close = getElem('.modal__close', false),
    modals = {
      root: getElem('.modal', false),
      auth: {
        opener: getElem('.open_auth', false),
        item: getElem('.modalAuth')
      },
      register: {
        opener: getElem('.open_register', false),
        item: getElem('.modalRegister')
      },
      forgot: {
        opener: getElem('.open_forgot', false),
        item: getElem('.modalForgot')
      },
      check: {
        opener: getElem('.open_check', false),
        item: getElem('.modalCheck')
      },
      reset: {
        opener: getElem('.open_reset', false),
        item: getElem('.modalReset')
      },
      change_success: {
        opener: getElem('.open_change_success', false),
        item: getElem('.modalSuccessPass')
      },
      ask: {
        opener: getElem('.open_ask', false),
        item: getElem('.modalAsk')
      },
      review: {
        opener: getElem('.open_review', false),
        item: getElem('.modalReview')
      },
      callback: {
        opener: getElem('.open_callback', false),
        item: getElem('.modalCallback')
      }
    },
    top_btn = getElem('.toTop'),
    seo_btn = getElem('.seo__more', false),
    open_dropdown = getElem('.dropdown__title', false);

  // scroll top button show and scrolled
  window.addEventListener('scroll', e => {
    if (pageYOffset >= 900) {
      top_btn.classList.add('toTop--active');
    } else {
      top_btn.classList.remove('toTop--active');
    }
  });
  top_btn.addEventListener('click', e => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // open modals
  openModals(modals.auth.opener, modals.auth.item, 'auth'); // auth
  openModals(modals.register.opener, modals.register.item, 'register'); // register
  openModals(modals.forgot.opener, modals.forgot.item, 'forgot'); // forgot
  openModals(modals.check.opener, modals.check.item, 'check'); // check
  openModals(modals.reset.opener, modals.reset.item, 'reset'); // reset
  openModals(modals.change_success.opener, modals.change_success.item, 'change success'); // change success
  openModals(modals.ask.opener, modals.ask.item, 'ask'); // ask
  openModals(modals.review.opener, modals.review.item, 'review'); // review
  openModals(modals.callback.opener, modals.callback.item, 'callback'); // callback

  function openModals(elem, modal, name) {
    if (modal) {
      for (let i = 0; i < elem.length; i++) {
        elem[i].addEventListener('click', e => {
          e.preventDefault();
          closeModals(); // close other modals before open target modal
          modal.classList.add('modal--open');
          document.body.classList.add('no-scroll');
          setTimeout(() => {
            document.body.classList.add('hasActiveModal');
          }, 200);
        });
      }
    } else {
      return console.log(`modal ${name} is undefined`);
    }

  }

  // close all modals
  for (let i = 0; i < modal_close.length; i++) {
    modal_close[i].addEventListener('click', closeModals);
  }

  function closeModals() {
    for (let i = 0; i < modals.root.length; i++) {
      modals.root[i].classList.remove('modal--open');
    }
    document.body.classList.remove('no-scroll');
    document.body.classList.remove('hasActiveModal');
  }

  // close modal when click outside them
  document.addEventListener('click', e => {
    if (document.body.classList.contains('hasActiveModal')) {
      for (let i = 0; i < modals.root.length; i++) {
        if (modals.root[i].classList.contains('modal--open')) {
          let current_modal = modals.root[i].querySelector('.modal__win');
          if (!current_modal.contains(e.target)) {
            modals.root[i].classList.remove('modal--open');
            document.body.classList.remove('no-scroll');
            document.body.classList.remove('hasActiveModal');
            console.log(1);
          }
        }
      }
    }
  });

  // main slider
  if (main_slider) {
    const swiper_main = new Swiper(main_slider, {
      slidesPerView: 1,
      slidesPerColumn: 1,
      progressbarOpposite: true,
      loop: true,
      effect: 'slide',
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      autoHeight: false,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: function (index, className) {
          return '<div class="dot swiper-pagination-bullet"><div class="progressCircle"><div class="progressCircle__inner"><div class="progressCircle__mask full"><div class="fill"></div></div><div class="progressCircle__mask half"><div class="fill"></div></div><div class="progressCircle__inside"></div></div></div></div>';
        },
      },
    });

    // function on customize slides change effect
    swiper_main.on('slideChangeTransitionStart', function () {
      let slide_text = getElem('.banner .swiper-slide-active .banner__title').innerText;
      let slide_btn_text = getElem('.banner .swiper-slide-active .banner__link').innerText;
      let slide_btn_href = getElem('.banner .swiper-slide-active .banner__link').getAttribute('href');
      let caption = getElem('.banner__captions .banner__caption');

      // animation fade out caption elements
      caption.querySelector('.banner__title').classList.remove('banner__title--anim');
      caption.querySelector('.banner__link').classList.remove('banner__link--anim');

      setTimeout(() => {
        caption.querySelector('.banner__title').innerHTML = slide_text;
        caption.querySelector('.banner__link').innerHTML = slide_btn_text;
        caption.querySelector('.banner__link').setAttribute('href', slide_btn_href);
      }, 200); // switch caption content when fade out animation will end
      setTimeout(() => {
        caption.querySelector('.banner__title').classList.add('banner__title--anim');
        caption.querySelector('.banner__link').classList.add('banner__link--anim');
      }, 400); // fade in caption with new content
    });
  }

  // default slider params
  let slider_params = {
    slidesPerView: 4,
    spaceBetween: 16,
    init: false,
    watchOverflow: true,
    watchSlidesVisibility: true,
    slideVisibleClass: 'swiper-slide-visible',
    navigation: {
      nextEl: null,
      prevEl: null
    },
    breakpoints: {
      1400: {
        slidesPerView: 4
      },
      1024: {
        slidesPerView: 3
      },
      600: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    }
  };
  let partners_params = {
    slidesPerView: 5,
    spaceBetween: 16,
    init: false,
    watchOverflow: true,
    watchSlidesVisibility: true,
    slideVisibleClass: 'swiper-slide-visible',
    navigation: {
      nextEl: null,
      prevEl: null
    },
    breakpoints: {
      1400: {
        slidesPerView: 5
      },
      1200: {
        slidesPerView: 4
      },
      1024: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 2
      }
    }
  }

  function sliderRender(elem, slider, id, root, params, device_mode = 'all') {
    if (elem) {
      params.navigation.nextEl = `${root} .sliderArrows__next--${id}`;
      params.navigation.prevEl = `${root} .sliderArrows__prev--${id}`;
      let slider = new Swiper(elem, params);
      sliderArrows(slider);

      // if (desk_only) {
      //   !isMobile ? slider.init() : null;
      // } else {
      //   slider.init()
      // }
      console.log(slider);
      if (device_mode == 'desktop') {
        isMobile ? null : slider.init();
        console.log('desktop');
      } else if (device_mode == 'mobile') {
        isMobile ? slider.init() : null;
        console.log('mobile');
      } else {
        slider.init();
        console.log('all');
      }
    }
  }

  // switch active status for slider arrows when slides swiping will end of start
  function sliderArrows(slider) {
    slider.on('activeIndexChange', function () {
      this.navigation.prevEl.classList.add('sliderArrows__arrow--active');
      this.navigation.nextEl.classList.add('sliderArrows__arrow--active');
    });
    slider.on('reachBeginning', function () {
      setTimeout(() => {
        this.navigation.prevEl.classList.remove('sliderArrows__arrow--active');
      }, 100);
    });
    slider.on('reachEnd', function () {
      setTimeout(() => {
        this.navigation.nextEl.classList.remove('sliderArrows__arrow--active');
      }, 100);
    });
  }

  // seo block text toggle
  if (seo_btn) {
    for (let i = 0; i < seo_btn.length; i++) {
      seo_btn[i].addEventListener('click', function () {
        let seo = this.closest('.seo');
        let text = this.parentNode.querySelector('.seo__text');

        if (seo.classList.contains('seo--full')) {
          seo.classList.remove('seo--full', 'seo--scroll');
        } else {
          seo.classList.add('seo--full');
          setTimeout(() => {
            seo.classList.add('seo--scroll');
          }, 400);
        }
      });
    }
  }


  // default dropdown
  if (open_dropdown) {
    for (var i = 0; i < open_dropdown.length; i++) {
      open_dropdown[i].addEventListener('click', function (e) {
        e.preventDefault();
        let list = this.parentNode;
        list.classList.toggle('dropdown--open');
      });
    }
  }














  // HEADER  ================================================
  const catalog_btn = getElem('.catalog__btn', false),
    catalog = getElem('.catalog'),
    header = getElem('.header'),
    banner = getElem('.banner'),
    open_wish = getElem('.open_wish', false),
    open_cart = getElem('.open_cart', false),
    wishlist_wrap = getElem('.header__tool--wish'),
    wishlist = getElem('.wishlist'),
    cart_wrap = getElem('.header__tool--cart'),
    cart = getElem('.cart'),
    logged = getElem('.logged'),
    logged_wrap = getElem('.header__tool--logged'),
    open_logged = getElem('.open_logged', false),
    open_mobile = getElem('.open_mobile', false),
    close_mobile = getElem('.close_mobile', false),
    mobile_menu = getElem('.mobileMenu'),
    open_child = getElem('.open_child', false),
    close_child = getElem('.close_child', false),
    mobile_catalog_child_opener = getElem('.mobileCatalog__opener', false),
    open_search = getElem('.open_search', false),
    search = getElem('.header__search');

  // open catalog 
  if (catalog_btn) {
    for (let i = 0; i < catalog_btn.length; i++) {
      catalog_btn[i].addEventListener('click', function () {
        catalog.classList.toggle('catalog--open');
        if (catalog.classList.contains('catalog--open')) {
          document.body.classList.add('no-scroll');
          setTimeout(() => {
            this.classList.add('ic-close');
          }, 200);
        } else {
          document.body.classList.remove('no-scroll');
          setTimeout(() => {
            this.classList.remove('ic-close');
          }, 200);
        }
      });
    }
  }


  // header for all pages except checkout
  if (!header.classList.contains('header--checkout')) {

    // fix header
    var scroll_height;
    var header_height = header.clientHeight;
    window.addEventListener('scroll', function () {

      if (isMobile) {
        scroll_height = banner ? banner.clientHeight : header.clientHeight;
      } else {
        scroll_height = header.clientHeight;
      }

      if (this.pageYOffset > scroll_height) {
        if (!isMobile) {
          !banner ? document.body.style.paddingTop = `${header_height}px` : null;
        }
        header.classList.remove('header--opacity');
        header.classList.add('header--fix');
      } else if (this.pageYOffset == 0) {
        header.classList.remove('header--fix');
        banner ? header.classList.add('header--opacity') : document.body.style.paddingTop = 0;
      }

    });

    // open cart
    for (let i = 0; i < open_cart.length; i++) {
      open_cart[i].addEventListener('click', function (e) {
        if (window.innerWidth > 768) {
          e.preventDefault();
          wishlist.classList.remove('headerDropdown--open');
          logged.classList.remove('headerDropdown--open');
          setTimeout(() => {
            cart.classList.toggle('headerDropdown--open');
          }, 200);
        } else {
          let link = this.getAttribute('data-link');
          if (link) {
            window.location = link;
          } else {
            console.log('cart link is not set or set incorrect');
          }
        }
      });
    }

    // open wish
    for (let i = 0; i < open_wish.length; i++) {
      open_wish[i].addEventListener('click', e => {
        cart.classList.remove('headerDropdown--open');
        logged.classList.remove('headerDropdown--open');
        setTimeout(() => {
          wishlist.classList.toggle('headerDropdown--open');
        }, 200);
      });
    }

    // open logged
    for (let i = 0; i < open_logged.length; i++) {
      open_logged[i].addEventListener('click', e => {
        e.preventDefault();
        cart.classList.remove('headerDropdown--open');
        wishlist.classList.remove('headerDropdown--open');
        setTimeout(() => {
          open_logged[i].classList.toggle('open_logged--opened');
          logged.classList.toggle('headerDropdown--open');
        }, 200);
      });
    }

    cart.addEventListener('click', e => e.stopPropagation());
    wishlist.addEventListener('click', e => e.stopPropagation());
    logged.addEventListener('click', e => e.stopPropagation());


    // close drops when click outside them
    document.addEventListener('click', e => {
      if (!cart_wrap.contains(e.target)) {
        cart.classList.remove('headerDropdown--open');
      }
      if (!wishlist_wrap.contains(e.target)) {
        wishlist.classList.remove('headerDropdown--open');
      }
      if (logged_wrap) {
        if (!logged_wrap.contains(e.target)) {
          logged.classList.remove('headerDropdown--open');
          for (let i = 0; i < open_logged.length; i++) {
            open_logged[i].classList.remove('open_logged--opened');
          }
        }
      }

    });

    // open search
    for (let i = 0; i < open_search.length; i++) {
      open_search[i].addEventListener('click', () => {
        open_search[i].classList.toggle('header__searchMobile--open');
        document.body.classList.toggle('no-scroll');
        setTimeout(() => {
          search.classList.toggle('header__search--open');
        }, 300);
      });
    }
















    // MOBILE MENU
    // open
    for (let i = 0; i < open_mobile.length; i++) {
      open_mobile[i].addEventListener('click', () => {
        open_mobile[i].classList.add('open_mobile--hidden');
        mobile_menu.classList.add('mobileMenu--open');
        document.body.classList.add('no-scroll');
      });
    }

    // close
    for (let i = 0; i < close_mobile.length; i++) {
      close_mobile[i].addEventListener('click', () => {
        mobile_menu.classList.remove('mobileMenu--open');
        document.body.classList.remove('no-scroll');
        for (let i = 0; i < open_mobile.length; i++) {
          open_mobile[i].classList.remove('open_mobile--hidden');
        }
      });
    }

    // open child menu
    for (let i = 0; i < open_child.length; i++) {
      open_child[i].addEventListener('click', e => {
        e.preventDefault();
        open_child[i].parentNode.querySelector('.mobileMenu__child').classList.add('mobileMenu__child--open');
      });
    }

    // close child menu
    for (let i = 0; i < close_child.length; i++) {
      close_child[i].addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        close_child[i].parentNode.classList.remove('mobileMenu__child--open');
      });
    }

    // open child catalog items
    for (let i = 0; i < mobile_catalog_child_opener.length; i++) {
      mobile_catalog_child_opener[i].addEventListener('click', e => {
        let item = mobile_catalog_child_opener[i].parentNode.querySelector('.mobileCatalog__child');
        item.classList.toggle('mobileCatalog__child--open');
      });
    }


  } // end header for all pages except checkout















  // HOME PAGE
  const home = getElem('.home'),
    home_categories_slider = getElem('.categories__slider'),
    home_special = getElem('.productsSlider__special'),
    home_bestseller = getElem('.productsSlider__bestseller'),
    home_new = getElem('.productsSlider__new'),
    home_partners = getElem('.partners__slider'),
    home_clients = getElem('.clients__slider'),
    prod_btns_wrap = getElem('.productsSlider__buttons'),
    prod_btns = getElem('.productsSlider__btn', false),
    prod_arrows = getElem('.productsSlider__arrows', false),
    tabs_prod = getElem('.productsSlider__tabWrap', false);

  if (home) {

    // initialization sliders
    //elem, slider, id, root, params, device_mode = 'all'
    sliderRender(home_categories_slider, 'categories_slider', 'categories', '.categories', slider_params);
    sliderRender(home_special, 'home_special_slider', 'special', '.productsSlider', slider_params, 'desktop');
    sliderRender(home_bestseller, 'home_bestseller_slider', 'bestseller', '.productsSlider', slider_params, 'desktop');
    sliderRender(home_new, 'home_new_slider', 'new', '.productsSlider', slider_params, 'desktop');
    sliderRender(home_partners, 'home_partners_slider', 'partners', '.partners', partners_params);
    sliderRender(home_clients, 'home_clients_slider', 'clients', '.clients', partners_params);


    // main product tabs switch
    if (prod_btns_wrap) {
      prod_btns_wrap.addEventListener('click', function (e) {
        if (e.target.classList.contains('productsSlider__btn')) {
          let slider = e.target.dataset.slider;

          for (let i = 0; i < tabs_prod.length; i++) {
            tabs_prod[i].classList.remove('productsSlider__tabWrap--active');
            if (tabs_prod[i].dataset.slider == slider) {
              tabs_prod[i].classList.add('productsSlider__tabWrap--active');
            }
          }

          for (let i = 0; i < prod_arrows.length; i++) {
            prod_arrows[i].classList.remove('productsSlider__arrows--active');
            if (prod_arrows[i].dataset.slider == slider) {
              console.log(prod_arrows[i]);
              prod_arrows[i].classList.add('productsSlider__arrows--active');
            }
          }

          for (let i = 0; i < prod_btns.length; i++) {
            prod_btns[i].classList.remove('productsSlider__btn--active');
          }

          e.target.classList.add('productsSlider__btn--active');
        }
      });
    }

    // main feedback managers random show
    showManager();
    function showManager() {
      let managers_wrap = getElem('.feedback__managers');
      let managers = getElem('.feedback__manager', false);
      let num = Math.floor(Math.random() * Math.floor(managers.length));

      managers_wrap.classList.remove('feedback__managers--load');
      managers[num].classList.add('feedback__manager--active');
    }

    $('.parallax-background').parallaxBackground({});

    // main sections show
    let elems = [
      getElem('.categories'),
      getElem('.productsSlider'),
      getElem('.partners'),
      getElem('.aboutBlock'),
      getElem('.clients'),
      getElem('.recipes'),
      getElem('.feedback')
    ],
      cords = [],
      showBlocks = (cord, block) => pageYOffset >= (cord - 500) ? block.classList.remove('section--hide') : null;

    elems.forEach(item => {
      cords.push(getCoords(item));
      pageYOffset > 0 ? item.classList.remove('section--hide') : null;
    });

    window.addEventListener('scroll', e => elems.forEach((item, index) => showBlocks(cords[index], item)));

  }










  // CATALOG PAGES
  const category_offers = getElem('.offers__slider'),
    sidebar_item = getElem('.navigation__childOpener', false),
    category_catalog_opener = getElem('.open_category_catalog', false),
    category_catalog_closer = getElem('.close_category_catalog', false),
    category_catalog = getElem('.sidebar--catalog');
  let slider_offers_params = partners_params;
  slider_offers_params.breakpoints = {
    600: {
      slidesPerView: 2
    },
    320: {
      slidesPerView: 1
    }
  }

  //elem, slider, id, root, params, device_mode = 'all' --- args
  sliderRender(category_offers, 'category_offers_slider', 'offers', '.offers', slider_offers_params, 'mobile');

  // sidebar navigation child menus toggler
  if (sidebar_item) {
    for (let i = 0; i < sidebar_item.length; i++) {
      sidebar_item[i].addEventListener('click', e => {
        if (sidebar_item[i].parentNode.classList.contains('navigation__item--open')) {
          sidebar_item[i].parentNode.classList.remove('navigation__item--scroller');
          setTimeout(() => {
            sidebar_item[i].parentNode.classList.remove('navigation__item--open');
          }, 200);
        } else {
          sidebar_item[i].parentNode.classList.toggle('navigation__item--open');
          setTimeout(() => {
            sidebar_item[i].parentNode.classList.toggle('navigation__item--scroller');
          }, 400);
        }
  
      })
    }
  }

  // open catalog mobile menu
  if (category_catalog_opener) {
    for (let i = 0; i < category_catalog_opener.length; i++) {
      category_catalog_opener[i].addEventListener('click', e => {
        category_catalog.classList.add('sidebar--open');
        document.body.classList.add('no-scroll');
      });
    }
  }

  // close catalog mobile menu
  if (category_catalog_closer) {
    for (let i = 0; i < category_catalog_closer.length; i++) {
      category_catalog_closer[i].addEventListener('click', e => {
        isMobile ? category_catalog.classList.remove('sidebar--open') : null;
        document.body.classList.remove('no-scroll');
      });
    }
  }





















  // PRODUCT PAGE
  var galleryThumbs = new Swiper('.productPageImages__bottom', {
    spaceBetween: 8,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  var galleryTop = new Swiper('.productPageImages__top', {
    thumbs: {
      swiper: galleryThumbs
    }
  });

  






















}

