"use strict";

var _this = void 0;

window.onload = function () {
  var getElem = function getElem(selector) {
    var single = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return single ? document.querySelector(selector) : document.querySelectorAll(selector);
  }; // BASE ================================================


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
          }
        }
      }
    }
  }); // HEADER  ================================================

  var catalog_btn = getElem('.catalog__btn', false),
      catalog = getElem('.catalog'),
      header = getElem('.header'),
      open_wish = getElem('.open_wish', false),
      open_cart = getElem('.open_cart', false),
      wishlist_wrap = getElem('.header__tool--wish'),
      wishlist = getElem('.wishlist'),
      cart_wrap = getElem('.header__tool--cart'),
      cart = getElem('.cart'); // open catalog 

  if (catalog_btn) {
    for (var _i3 = 0; _i3 < catalog_btn.length; _i3++) {
      catalog_btn[_i3].addEventListener('click', function () {
        var _this2 = this;

        catalog.classList.toggle('catalog--open');

        if (catalog.classList.contains('catalog--open')) {
          document.body.classList.add('no-scroll');
          setTimeout(function () {
            _this2.classList.add('ic-close');
          }, 200);
        } else {
          document.body.classList.remove('no-scroll');
          setTimeout(function () {
            _this2.classList.remove('ic-close');
          }, 200);
        }
      });
    }
  } // header for all pages except checkout


  if (!header.classList.contains('header--checkout')) {
    // fix header
    var header_height = header.clientHeight;
    window.addEventListener('scroll', function () {
      if (_this.pageYOffset > header_height) {
        header.classList.add('header--fix');
      } else if (_this.pageYOffset == 0) {
        header.classList.remove('header--fix');
      }
    }); // open cart

    for (var _i4 = 0; _i4 < open_cart.length; _i4++) {
      open_cart[_i4].addEventListener('click', function (e) {
        if (window.innerWidth > 768) {
          e.preventDefault();
          wishlist.classList.remove('headerDropdown--open');
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
        setTimeout(function () {
          wishlist.classList.toggle('headerDropdown--open');
        }, 200);
      });
    }

    cart.addEventListener('click', function (e) {
      return e.stopPropagation();
    });
    wishlist.addEventListener('click', function (e) {
      return e.stopPropagation();
    });
    document.addEventListener('click', function (e) {
      if (!cart_wrap.contains(e.target)) {
        cart.classList.remove('headerDropdown--open');
      }

      if (!wishlist_wrap.contains(e.target)) {
        wishlist.classList.remove('headerDropdown--open');
      }
    });
  }
};