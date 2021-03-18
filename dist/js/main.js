"use strict";

window.onload = function () {
  var getElem = function getElem(selector) {
    var single = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return single ? document.querySelector(selector) : document.querySelectorAll(selector);
  },
      isMobile = window.innerWidth < 768 ? true : false,
      getCoords = function getCoords(elem) {
    return elem.getBoundingClientRect().top + pageYOffset;
  }; // BASE ================================================


  var main_slider = getElem('.banner__slider'),
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
      top_btn = getElem('.toTop'); // scroll top button show and scrolled

  window.addEventListener('scroll', function (e) {
    if (pageYOffset >= 900) {
      top_btn.classList.add('toTop--active');
    } else {
      top_btn.classList.remove('toTop--active');
    }
  });
  top_btn.addEventListener('click', function (e) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }); // open modals

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
      for (var i = 0; i < elem.length; i++) {
        elem[i].addEventListener('click', function (e) {
          e.preventDefault();
          closeModals(); // close other modals before open target modal

          modal.classList.add('modal--open');
          document.body.classList.add('no-scroll');
          setTimeout(function () {
            document.body.classList.add('hasActiveModal');
          }, 200);
        });
      }
    } else {
      return console.log("modal ".concat(name, " is undefined"));
    }
  } // close all modals


  for (var i = 0; i < modal_close.length; i++) {
    modal_close[i].addEventListener('click', closeModals);
  }

  function closeModals() {
    for (var _i = 0; _i < modals.root.length; _i++) {
      modals.root[_i].classList.remove('modal--open');
    }

    document.body.classList.remove('no-scroll');
    document.body.classList.remove('hasActiveModal');
  } // close modal when click outside them


  document.addEventListener('click', function (e) {
    if (document.body.classList.contains('hasActiveModal')) {
      for (var _i2 = 0; _i2 < modals.root.length; _i2++) {
        if (modals.root[_i2].classList.contains('modal--open')) {
          var current_modal = modals.root[_i2].querySelector('.modal__win');

          if (!current_modal.contains(e.target)) {
            modals.root[_i2].classList.remove('modal--open');

            document.body.classList.remove('no-scroll');
            document.body.classList.remove('hasActiveModal');
            console.log(1);
          }
        }
      }
    }
  }); // main slider

  if (main_slider) {
    var swiper_main = new Swiper(main_slider, {
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
        renderBullet: function renderBullet(index, className) {
          return '<div class="dot swiper-pagination-bullet"><div class="progressCircle"><div class="progressCircle__inner"><div class="progressCircle__mask full"><div class="fill"></div></div><div class="progressCircle__mask half"><div class="fill"></div></div><div class="progressCircle__inside"></div></div></div></div>';
        }
      }
    }); // function on customize slides change effect

    swiper_main.on('slideChangeTransitionStart', function () {
      var slide_text = getElem('.banner .swiper-slide-active .banner__title').innerText;
      var slide_btn_text = getElem('.banner .swiper-slide-active .banner__link').innerText;
      var slide_btn_href = getElem('.banner .swiper-slide-active .banner__link').getAttribute('href');
      var caption = getElem('.banner__captions .banner__caption'); // animation fade out caption elements

      caption.querySelector('.banner__title').classList.remove('banner__title--anim');
      caption.querySelector('.banner__link').classList.remove('banner__link--anim');
      setTimeout(function () {
        caption.querySelector('.banner__title').innerHTML = slide_text;
        caption.querySelector('.banner__link').innerHTML = slide_btn_text;
        caption.querySelector('.banner__link').setAttribute('href', slide_btn_href);
      }, 200); // switch caption content when fade out animation will end

      setTimeout(function () {
        caption.querySelector('.banner__title').classList.add('banner__title--anim');
        caption.querySelector('.banner__link').classList.add('banner__link--anim');
      }, 400); // fade in caption with new content
    });
  } // HEADER  ================================================


  var catalog_btn = getElem('.catalog__btn', false),
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
      search = getElem('.header__search'); // open catalog 

  if (catalog_btn) {
    for (var _i3 = 0; _i3 < catalog_btn.length; _i3++) {
      catalog_btn[_i3].addEventListener('click', function () {
        var _this = this;

        catalog.classList.toggle('catalog--open');

        if (catalog.classList.contains('catalog--open')) {
          document.body.classList.add('no-scroll');
          setTimeout(function () {
            _this.classList.add('ic-close');
          }, 200);
        } else {
          document.body.classList.remove('no-scroll');
          setTimeout(function () {
            _this.classList.remove('ic-close');
          }, 200);
        }
      });
    }
  } // header for all pages except checkout


  if (!header.classList.contains('header--checkout')) {
    // fix header
    var scroll_height;
    window.addEventListener('scroll', function () {
      if (isMobile) {
        scroll_height = banner ? banner.clientHeight : header.clientHeight;
      } else {
        scroll_height = header.clientHeight;
      }

      if (this.pageYOffset > scroll_height) {
        header.classList.remove('header--opacity');
        header.classList.add('header--fix');
      } else if (this.pageYOffset == 0) {
        header.classList.remove('header--fix');

        if (banner) {
          header.classList.add('header--opacity');
        }
      }
    }); // open cart

    for (var _i4 = 0; _i4 < open_cart.length; _i4++) {
      open_cart[_i4].addEventListener('click', function (e) {
        if (window.innerWidth > 768) {
          e.preventDefault();
          wishlist.classList.remove('headerDropdown--open');
          logged.classList.remove('headerDropdown--open');
          setTimeout(function () {
            cart.classList.toggle('headerDropdown--open');
          }, 200);
        } else {
          var link = this.getAttribute('data-link');

          if (link) {
            window.location = link;
          } else {
            console.log('cart link is not set or set incorrect');
          }
        }
      });
    } // open wish


    for (var _i5 = 0; _i5 < open_wish.length; _i5++) {
      open_wish[_i5].addEventListener('click', function (e) {
        cart.classList.remove('headerDropdown--open');
        logged.classList.remove('headerDropdown--open');
        setTimeout(function () {
          wishlist.classList.toggle('headerDropdown--open');
        }, 200);
      });
    } // open logged


    var _loop = function _loop(_i6) {
      open_logged[_i6].addEventListener('click', function (e) {
        e.preventDefault();
        cart.classList.remove('headerDropdown--open');
        wishlist.classList.remove('headerDropdown--open');
        setTimeout(function () {
          open_logged[_i6].classList.toggle('open_logged--opened');

          logged.classList.toggle('headerDropdown--open');
        }, 200);
      });
    };

    for (var _i6 = 0; _i6 < open_logged.length; _i6++) {
      _loop(_i6);
    }

    cart.addEventListener('click', function (e) {
      return e.stopPropagation();
    });
    wishlist.addEventListener('click', function (e) {
      return e.stopPropagation();
    });
    logged.addEventListener('click', function (e) {
      return e.stopPropagation();
    }); // close drops when click outside them

    document.addEventListener('click', function (e) {
      if (!cart_wrap.contains(e.target)) {
        cart.classList.remove('headerDropdown--open');
      }

      if (!wishlist_wrap.contains(e.target)) {
        wishlist.classList.remove('headerDropdown--open');
      }

      if (logged_wrap) {
        if (!logged_wrap.contains(e.target)) {
          logged.classList.remove('headerDropdown--open');

          for (var _i7 = 0; _i7 < open_logged.length; _i7++) {
            open_logged[_i7].classList.remove('open_logged--opened');
          }
        }
      }
    }); // open search

    for (var _i8 = 0; _i8 < open_search.length; _i8++) {
      open_search[_i8].addEventListener('click', function () {
        search.classList.toggle('header__search--open');
      });
    } // MOBILE MENU
    // open


    var _loop2 = function _loop2(_i9) {
      open_mobile[_i9].addEventListener('click', function () {
        open_mobile[_i9].classList.add('open_mobile--hidden');

        mobile_menu.classList.add('mobileMenu--open');
        document.body.classList.add('no-scroll');
      });
    };

    for (var _i9 = 0; _i9 < open_mobile.length; _i9++) {
      _loop2(_i9);
    } // close


    for (var _i10 = 0; _i10 < close_mobile.length; _i10++) {
      close_mobile[_i10].addEventListener('click', function () {
        mobile_menu.classList.remove('mobileMenu--open');
        document.body.classList.remove('no-scroll');

        for (var _i11 = 0; _i11 < open_mobile.length; _i11++) {
          open_mobile[_i11].classList.remove('open_mobile--hidden');
        }
      });
    } // open child menu


    var _loop3 = function _loop3(_i12) {
      open_child[_i12].addEventListener('click', function (e) {
        e.preventDefault();

        open_child[_i12].parentNode.querySelector('.mobileMenu__child').classList.add('mobileMenu__child--open');
      });
    };

    for (var _i12 = 0; _i12 < open_child.length; _i12++) {
      _loop3(_i12);
    } // close child menu


    var _loop4 = function _loop4(_i13) {
      close_child[_i13].addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();

        close_child[_i13].parentNode.classList.remove('mobileMenu__child--open');
      });
    };

    for (var _i13 = 0; _i13 < close_child.length; _i13++) {
      _loop4(_i13);
    } // open child catalog items


    var _loop5 = function _loop5(_i14) {
      mobile_catalog_child_opener[_i14].addEventListener('click', function (e) {
        var item = mobile_catalog_child_opener[_i14].parentNode.querySelector('.mobileCatalog__child');

        item.classList.toggle('mobileCatalog__child--open');
      });
    };

    for (var _i14 = 0; _i14 < mobile_catalog_child_opener.length; _i14++) {
      _loop5(_i14);
    }
  } // end header for all pages except checkout
  // HOME PAGE


  var home_categories_slider = getElem('.categories__slider'),
      home_special = getElem('.productsSlider__special'),
      home_bestseller = getElem('.productsSlider__bestseller'),
      home_new = getElem('.productsSlider__new'),
      home_partners = getElem('.partners__slider'),
      home_clients = getElem('.clients__slider'),
      prod_btns_wrap = getElem('.productsSlider__buttons'),
      prod_btns = getElem('.productsSlider__btn', false),
      prod_arrows = getElem('.productsSlider__arrows', false),
      tabs_prod = getElem('.productsSlider__tabWrap', false),
      seo_btn = getElem('.seo__more', false); // default slider params

  var slider_params = {
    slidesPerView: 4,
    spaceBetween: 16,
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
        slidesPerView: 1
      }
    }
  };
  var partners_params = {
    slidesPerView: 5,
    spaceBetween: 16,
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
  }; // switch active status for slider arrows when slides swiping will end of start

  function sliderArrows(slider) {
    slider.on('activeIndexChange', function () {
      this.navigation.prevEl.classList.add('sliderArrows__arrow--active');
      this.navigation.nextEl.classList.add('sliderArrows__arrow--active');
    });
    slider.on('reachBeginning', function () {
      var _this2 = this;

      setTimeout(function () {
        _this2.navigation.prevEl.classList.remove('sliderArrows__arrow--active');
      }, 100);
    });
    slider.on('reachEnd', function () {
      var _this3 = this;

      setTimeout(function () {
        _this3.navigation.nextEl.classList.remove('sliderArrows__arrow--active');
      }, 100);
    });
  } // initialization


  sliderRender(home_categories_slider, 'categories_slider', 'categories', '.categories');
  sliderRender(home_special, 'home_special_slider', 'special', '.productsSlider');
  sliderRender(home_bestseller, 'home_bestseller_slider', 'bestseller', '.productsSlider');
  sliderRender(home_new, 'home_new_slider', 'new', '.productsSlider');
  sliderRender(home_partners, 'home_partners_slider', 'partners', '.partners', partners_params);
  sliderRender(home_clients, 'home_clients_slider', 'clients', '.clients', partners_params);

  function sliderRender(elem, slider, id, root) {
    var params = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : slider_params;

    if (elem) {
      params.navigation.nextEl = "".concat(root, " .sliderArrows__next--").concat(id);
      params.navigation.prevEl = "".concat(root, " .sliderArrows__prev--").concat(id);

      var _slider = new Swiper(elem, params);

      sliderArrows(_slider);
    }
  } // main product tabs switch


  if (prod_btns_wrap) {
    var showManager = function showManager() {
      var managers_wrap = getElem('.feedback__managers');
      var managers = getElem('.feedback__manager', false);
      var num = Math.floor(Math.random() * Math.floor(managers.length));
      managers_wrap.classList.remove('feedback__managers--load');
      managers[num].classList.add('feedback__manager--active');
    }; // seo block text toggle


    prod_btns_wrap.addEventListener('click', function (e) {
      if (e.target.classList.contains('productsSlider__btn')) {
        var slider = e.target.dataset.slider;

        for (var _i15 = 0; _i15 < tabs_prod.length; _i15++) {
          tabs_prod[_i15].classList.remove('productsSlider__tabWrap--active');

          if (tabs_prod[_i15].dataset.slider == slider) {
            tabs_prod[_i15].classList.add('productsSlider__tabWrap--active');
          }
        }

        for (var _i16 = 0; _i16 < prod_arrows.length; _i16++) {
          prod_arrows[_i16].classList.remove('productsSlider__arrows--active');

          if (prod_arrows[_i16].dataset.slider == slider) {
            console.log(prod_arrows[_i16]);

            prod_arrows[_i16].classList.add('productsSlider__arrows--active');
          }
        }

        for (var _i17 = 0; _i17 < prod_btns.length; _i17++) {
          prod_btns[_i17].classList.remove('productsSlider__btn--active');
        }

        e.target.classList.add('productsSlider__btn--active');
      }
    }); // main feedback managers random show

    showManager();

    if (seo_btn) {
      for (var _i18 = 0; _i18 < seo_btn.length; _i18++) {
        seo_btn[_i18].addEventListener('click', function () {
          var seo = this.closest('.seo');
          var text = this.parentNode.querySelector('.seo__text');

          if (seo.classList.contains('seo--full')) {
            seo.classList.remove('seo--full', 'seo--scroll');
          } else {
            seo.classList.add('seo--full');
            setTimeout(function () {
              seo.classList.add('seo--scroll');
            }, 400);
          }
        });
      }
    } // main sections show


    var elems = [getElem('.categories'), getElem('.productsSlider'), getElem('.partners'), getElem('.aboutBlock'), getElem('.clients'), getElem('.recipes'), getElem('.feedback')],
        cords = [],
        showBlocks = function showBlocks(cord, block) {
      return pageYOffset >= cord - 500 ? block.classList.remove('section--hide') : null;
    };

    elems.forEach(function (item) {
      cords.push(getCoords(item));
      pageYOffset > 0 ? item.classList.remove('section--hide') : null;
    });
    window.addEventListener('scroll', function (e) {
      return elems.forEach(function (item, index) {
        return showBlocks(cords[index], item);
      });
    });
  }
};