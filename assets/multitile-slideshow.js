if (!customElements.get("multitile-slideshow")) {
  class MultitileSlideshow extends HTMLElement {
    constructor() {
      super();

      const swiperOptions =
        JSON.parse(this.getAttribute("data-swiper-options")) || {};

      this.initSlider(swiperOptions);
    }

    initSlider(swiperOptions) {
      this.slider = new Swiper(this, {
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        rewind: true,
        slidesPerView: 1,
        speed: 600,
        followFinger: false,

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function (i, className) {
            return `
            <button class="${className}">
              <svg class="progress--square" width="26" height="26">
                <rect class="origin" width="26" height="26" rx="5" ry="5" />
              </svg>
              <svg class="progress--circle" width="18" height="18"><circle class="origin" r="8" cx="9.5" cy="9.5"></circle></svg>
            <span>0${i + 1}</span>
            </button>
            `;
          }
        },

        autoplay: swiperOptions.autoplay || false,

        spaceBetween: swiperOptions.spaceBetweenMobile || 2,
        breakpoints: {
          750: {
            enabled: true,
            spaceBetween: swiperOptions.spaceBetweenDesktop || 2,
            slidesPerView: swiperOptions.slidesPerView || 3,
            loop: false
          }
        }
      });
    }
  }

  customElements.define("multitile-slideshow", MultitileSlideshow);
}
