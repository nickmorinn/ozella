if (!customElements.get('collection-hero-menu')) {
  class CollectionHeroMenu extends HTMLElement {
    constructor() {
      super();

      if (Shopify.designMode) {
        window.addEventListener('shopify:section:load', (e) => {
          this.init();
        });
      }
      this.init();

    }

    init() {

      var swiperArea = document.querySelector('.collection-hero-menu__items');

      this.slider = new Swiper(swiperArea, {
        slidesPerView: 2.5,
        spaceBetween: 8,
        resistanceRatio: 0.72,
        observer: true,
        observerParents: true,
        observeSlideChildren: true,
        breakpoints: {
          480: {
            slidesPerView: 3.5,
          },
          768: {
            slidesPerView: 4.5,
          },
          990: {
            slidesPerView: 5,
          }
        }
      });
    }
  }

  customElements.define('collection-hero-menu', CollectionHeroMenu);
}
