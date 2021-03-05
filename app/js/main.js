window.onload = () => {

  let getElem = (selector, single = true) => single ? document.querySelector(selector) : document.querySelectorAll(selector);


  // BASE ================================================

  const modal_close = getElem('.modal__close', false),
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
    }

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
          }
        }
      }
    }
  });



  // main slider
  const swiper = new Swiper('.banner__slider', {
    slidesPerView: 1,
    slidesPerColumn: 1,
    progressbarOpposite: true,
    loop: true,
    effect: 'slide',
    autoplay: {
      delay: 4000,
    },
    autoHeight: true,
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
  swiper.on('slideChangeTransitionStart', function () {
    let slide_text = getElem('.banner .swiper-slide-active .banner__title').innerText;
    let slide_btn_text = getElem('.banner .swiper-slide-active .banner__link').innerText;
    let slide_btn_href = getElem('.banner .swiper-slide-active .banner__link').getAttribute('href');
    function getSlideLink(){
      return getElem('.banner .swiper-slide-active .banner__link').getAttribute('href');
    }
    //console.log(setTimeout(getSlideLink, 500));
    
    let caption = getElem('.banner__captions .banner__caption');

    caption.querySelector('.banner__title').classList.remove('banner__title--anim');    
    caption.querySelector('.banner__link').classList.remove('banner__link--anim');
    setTimeout(() => {
      caption.querySelector('.banner__title').innerHTML = slide_text;
      caption.querySelector('.banner__link').innerHTML = slide_btn_text;
      caption.querySelector('.banner__link').setAttribute('href', slide_btn_href);
    }, 200);
    setTimeout(() => {
      caption.querySelector('.banner__title').classList.add('banner__title--anim');
      caption.querySelector('.banner__link').classList.add('banner__link--anim');
    }, 250);
  });





  // HEADER  ================================================
  const catalog_btn = getElem('.catalog__btn', false),
    catalog = getElem('.catalog'),
    header = getElem('.header'),
    open_wish = getElem('.open_wish', false),
    open_cart = getElem('.open_cart', false),
    wishlist_wrap = getElem('.header__tool--wish'),
    wishlist = getElem('.wishlist'),
    cart_wrap = getElem('.header__tool--cart'),
    cart = getElem('.cart'),
    logged = getElem('.logged'),
    logged_wrap = getElem('.header__tool--logged'),
    open_logged = getElem('.open_logged', false);

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
      if (this.pageYOffset > header_height) {
        header.classList.add('header--fix');
      } else if (this.pageYOffset == 0) {
        header.classList.remove('header--fix');
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


    document.addEventListener('click', e => {
      if (!cart_wrap.contains(e.target)) {
        cart.classList.remove('headerDropdown--open');
      }
      if (!wishlist_wrap.contains(e.target)) {
        wishlist.classList.remove('headerDropdown--open');
      }
      if (!logged_wrap.contains(e.target)) {
        logged.classList.remove('headerDropdown--open');
        for (let i=0;i<open_logged.length;i++) {
          open_logged[i].classList.remove('open_logged--opened');        
        }
      }
    });


  }


















}

