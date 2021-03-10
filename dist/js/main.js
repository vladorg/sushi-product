"use strict";

window.onload = function () {
  var getElem = function getElem(selector) {
    var single = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return single ? document.querySelector(selector) : document.querySelectorAll(selector);
  };

  var isMobile = window.innerWidth < 768 ? true : false; // BASE ================================================

  var main_slider = getElem('.banner__slider');
  var modal_close = getElem('.modal__close', false),
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
  }; // open modals

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
  }); // HEADER  ================================================

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
      console.log(e.target);

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
  }
};