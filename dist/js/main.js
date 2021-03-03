"use strict";

var _this = void 0;

window.onload = function () {
  // HEADER  
  var catalog_btn = document.querySelectorAll('.catalog__btn'),
      catalog = document.querySelector('.catalog'),
      header = document.querySelector('.header'),
      open_wish = document.querySelectorAll('.open_wish'),
      open_cart = document.querySelectorAll('.open_cart'),
      wishlist = document.querySelector('.wishlist'),
      cart = document.querySelector('.cart'),
      modals = document.querySelectorAll('.modal'),
      open_auth = document.querySelectorAll('.open_auth'),
      modal_auth = document.querySelector('.modalAuth'),
      open_reg = document.querySelectorAll('.open_register'),
      modal_reg = document.querySelector('.modalRegister'),
      open_forgot = document.querySelectorAll('.open_forgot'),
      modal_forgot = document.querySelector('.modalForgot'),
      open_check = document.querySelectorAll('.open_check'),
      modal_check = document.querySelector('.modalCheck'),
      open_reset = document.querySelectorAll('.open_reset'),
      modal_reset = document.querySelector('.modalReset'),
      open_change_success = document.querySelectorAll('.open_change_success'),
      modal_change_success = document.querySelector('.modalSuccessPass'),
      modal_close = document.querySelectorAll('.modal__close'); // open catalog 

  if (catalog_btn) {
    for (var i = 0; i < catalog_btn.length; i++) {
      catalog_btn[i].addEventListener('click', function () {
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
      if (_this.pageYOffset > header_height + 100) {
        header.classList.add('header--fix');
      } else {
        header.classList.remove('header--fix');
      }
    }); // open wish and cart

    for (var _i = 0; _i < open_cart.length; _i++) {
      open_cart[_i].addEventListener('click', function (e) {
        wishlist.classList.remove('headerDropdown--open');
        setTimeout(function () {
          cart.classList.toggle('headerDropdown--open');
        }, 200);
      });
    }

    for (var _i2 = 0; _i2 < open_wish.length; _i2++) {
      open_wish[_i2].addEventListener('click', function (e) {
        cart.classList.remove('headerDropdown--open');
        setTimeout(function () {
          wishlist.classList.toggle('headerDropdown--open');
        }, 200);
      });
    }

    cart.addEventListener('click', function (e) {
      e.stopPropagation();
    });
    wishlist.addEventListener('click', function (e) {
      e.stopPropagation();
    }); // open auth modal

    for (var _i3 = 0; _i3 < open_auth.length; _i3++) {
      open_auth[_i3].addEventListener('click', function (e) {
        e.preventDefault();
        modal_auth.classList.add('modal--open');
        document.body.classList.add('no-scroll');
      });
    } // open auth register


    for (var _i4 = 0; _i4 < open_reg.length; _i4++) {
      open_reg[_i4].addEventListener('click', function (e) {
        e.preventDefault();
        modal_auth.classList.remove('modal--open');
        modal_reg.classList.add('modal--open');
        document.body.classList.add('no-scroll');
      });
    } // open modal forgot


    for (var _i5 = 0; _i5 < open_forgot.length; _i5++) {
      open_forgot[_i5].addEventListener('click', function (e) {
        e.preventDefault();
        modal_auth.classList.remove('modal--open');
        modal_forgot.classList.add('modal--open');
        document.body.classList.add('no-scroll');
      });
    } // open modal check


    for (var _i6 = 0; _i6 < open_check.length; _i6++) {
      open_check[_i6].addEventListener('click', function (e) {
        e.preventDefault();
        modal_forgot.classList.remove('modal--open');
        modal_check.classList.add('modal--open');
        document.body.classList.add('no-scroll');
      });
    } // open modal reset


    for (var _i7 = 0; _i7 < open_reset.length; _i7++) {
      open_reset[_i7].addEventListener('click', function (e) {
        e.preventDefault();
        modal_check.classList.remove('modal--open');
        modal_reset.classList.add('modal--open');
        document.body.classList.add('no-scroll');
      });
    } // open modal change pass success


    for (var _i8 = 0; _i8 < open_change_success.length; _i8++) {
      open_change_success[_i8].addEventListener('click', function (e) {
        e.preventDefault();
        modal_reset.classList.remove('modal--open');
        modal_change_success.classList.add('modal--open');
        document.body.classList.add('no-scroll'); // setTimeout(() => {
        //   modal_change_success.classList.remove('modal--open');
        // }, 3000);
      });
    } // close all modals


    for (var _i9 = 0; _i9 < modal_close.length; _i9++) {
      modal_close[_i9].addEventListener('click', function (e) {
        for (var _i10 = 0; _i10 < modals.length; _i10++) {
          modals[_i10].classList.remove('modal--open');
        }

        document.body.classList.remove('no-scroll');
      });
    }
  }
};