window.onload = () => {

  // HEADER  
  const catalog_btn = document.querySelectorAll('.catalog__btn'),
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
        modal_forgot= document.querySelector('.modalForgot'),
        open_check = document.querySelectorAll('.open_check'),
        modal_check= document.querySelector('.modalCheck'),
        open_reset = document.querySelectorAll('.open_reset'),
        modal_reset= document.querySelector('.modalReset'),
        open_change_success = document.querySelectorAll('.open_change_success'),
        modal_change_success= document.querySelector('.modalSuccessPass'),
        modal_close = document.querySelectorAll('.modal__close');

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
    let header_height = header.clientHeight;
    window.addEventListener('scroll', () => {
      if (this.pageYOffset > header_height + 100) {
        header.classList.add('header--fix');
      } else {
        header.classList.remove('header--fix');
      }
    });

    // open wish and cart
    for (let i = 0; i < open_cart.length; i++) {
      open_cart[i].addEventListener('click', (e) => {
        wishlist.classList.remove('headerDropdown--open');        
        setTimeout(() => {
          cart.classList.toggle('headerDropdown--open');
        }, 200);
      });
    }
    for (let i = 0; i < open_wish.length; i++) {
      open_wish[i].addEventListener('click', (e) => {
        cart.classList.remove('headerDropdown--open');
        setTimeout(() => {
          wishlist.classList.toggle('headerDropdown--open');
        }, 200);
      });
    }
    cart.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    wishlist.addEventListener('click', (e) => {
      e.stopPropagation();
    });



    // open auth modal
    for (let i = 0; i < open_auth.length; i++) {
      open_auth[i].addEventListener('click', (e) => {
        e.preventDefault();
        modal_auth.classList.add('modal--open');
        document.body.classList.add('no-scroll');
      });
    }

    // open auth register
    for (let i = 0; i < open_reg.length; i++) {
      open_reg[i].addEventListener('click', (e) => {
        e.preventDefault();
        modal_auth.classList.remove('modal--open');
        modal_reg.classList.add('modal--open');
        document.body.classList.add('no-scroll');
      });
    }

    // open modal forgot
    for (let i = 0; i < open_forgot.length; i++) {
      open_forgot[i].addEventListener('click', (e) => {
        e.preventDefault();
        modal_auth.classList.remove('modal--open');
        modal_forgot.classList.add('modal--open');
        document.body.classList.add('no-scroll');
      });
    }

    // open modal check
    for (let i = 0; i < open_check.length; i++) {
      open_check[i].addEventListener('click', (e) => {
        e.preventDefault();
        modal_forgot.classList.remove('modal--open');
        modal_check.classList.add('modal--open');
        document.body.classList.add('no-scroll');
      });
    }

    // open modal reset
    for (let i = 0; i < open_reset.length; i++) {
      open_reset[i].addEventListener('click', (e) => {
        e.preventDefault();
        modal_check.classList.remove('modal--open');
        modal_reset.classList.add('modal--open');
        document.body.classList.add('no-scroll');
      });
    }

    // open modal change pass success
    for (let i = 0; i < open_change_success.length; i++) {
      open_change_success[i].addEventListener('click', (e) => {
        e.preventDefault();
        modal_reset.classList.remove('modal--open');
        modal_change_success.classList.add('modal--open');
        document.body.classList.add('no-scroll');

        // setTimeout(() => {
        //   modal_change_success.classList.remove('modal--open');
        // }, 3000);
      });
    }

    // close all modals
    for (let i = 0; i < modal_close.length; i++) {
      modal_close[i].addEventListener('click', (e) => {
        for (let i=0;i<modals.length;i++) {
          modals[i].classList.remove('modal--open');
        }
        document.body.classList.remove('no-scroll');
      });
    }
    

  }

  












}

