class HeroSlider extends HTMLElement {
  constructor() {
    super();

    if (Shopify.designMode) {
      window.addEventListener('shopify:section:load', e => {
        this.mountSlider();
      });
    }

    this.mountSlider();

    window.addEventListener('shopify:block:select', e => {
      const selectedSlideIndex = +e.target.dataset.index;
      this.slider.slideTo(selectedSlideIndex, 600);
    });
  }

  mountSlider() {
    const autoplayOptions = {
      delay: this.dataset.autoplayInterval
    };

    this.slider = new Swiper(this, {
      effect: 'fade',
      rewind: true,
      slidesPerView: 1,
      speed: 600,
      followFinger: false,
      navigation: {
        nextEl: '.swiper-button--next',
        prevEl: '.swiper-button--prev'
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (i, className) {
          return `
          <button class="${className}">
            <svg class="square-progress" width="26" height="26">
              <rect class="square-origin" width="26" height="26" rx="5" ry="5" />
            </svg>
            <svg class="progress" width="18" height="18"><circle class="circle-origin" r="8" cx="9.5" cy="9.5"></circle></svg>
          <span>0${i + 1}</span>
          </button>
          `;
        }
      },
      autoplay:
        this.dataset.autoplay === 'true' ? autoplayOptions : false,
      on: {
        init: this.handleSlideChange.bind(this),
        slideChange: this.handleSlideChange.bind(this)
      }
    });
  }

  handleSlideChange(swiper) {
    let headerInner = document.querySelector('.header__inner');
    let heroInners = document.querySelectorAll('.hero__inner');

    if (!headerInner || !heroInners) {
      return;
    }

    // change --transparent-header-menu-text-color value on document style attributes
    document.documentElement.style.setProperty(
      '--transparent-header-menu-text-color',
      heroInners[swiper.activeIndex].dataset.headerMenuTextColor
    );

    // set position of progress bar for each slide change
    this.querySelectorAll('.hero__swiper-pagination-horizontal .progress').forEach((progress) => {
      progress.style.cssText = `inset-inline-start: -${(swiper.activeIndex * 2.4) + 3.4}rem`;
    });
  }
}

customElements.define('hero-slider', HeroSlider);
