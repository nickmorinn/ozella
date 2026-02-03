class CartRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', event => {
      event.preventDefault();
      const cartItems =
        this.closest('cart-drawer-items') ||
        this.closest('cart-items');
      cartItems.updateQuantity(this.dataset.index, 0);
      updateFreeShipping();
    });
  }
}
customElements.define('cart-remove-button', CartRemoveButton);

/* DELETE or CHANGE: this code is not using - start */
class ProgressBar extends HTMLElement {
  constructor() {
    super();
    this.progress = this.getAttribute('data-progress');
  }

  connectedCallback() {
    setTimeout(() => {
      this.querySelector('[data-progress-line]').style.width = this.progress;
    }, 100);
  }
}
customElements.define('progress-bar', ProgressBar);
/* DELETE or CHANGE: this code is not using - end */

class CartItems extends HTMLElement {
  constructor() {
    super();

    this.freeShipping = document.querySelectorAll('shipping-bar');

    this.currentItemCount = Array.from(
      this.querySelectorAll('[name="updates[]"]')
    ).reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);


    this.debouncedOnChange = debounce(event => {
      this.onChange(event);
    }, 300);
    this.addEventListener(
      'change', this.debouncedOnChange.bind(this)
    );

    updateFreeShipping();
  }

  calculateTotalItemCount(items) {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  onChange(event) {
    if (event.target.name !== 'updates[]') return;

    this.updateQuantity(
      event.target.dataset.index,
      event.target.value,
      document.activeElement.getAttribute('name')
    );
  }

  getSectionsToRender() {
    return [
      {
        id: `#shopify-section-${document.getElementById('main-cart-items').dataset.id}`,
        section:
          document.getElementById('main-cart-items').dataset.id,
        selector: `#shopify-section-${
          document.getElementById('main-cart-items').dataset.id
        } cart-items`
      },
      {
        id: '#cart-counter',
        section: 'cart-counter',
        selector: '#shopify-section-cart-counter'
      },
      {
        id: '#CartDrawer-Body',
        section: 'cart-drawer',
        selector: '#shopify-section-cart-drawer #CartDrawer-Body'
      }
    ];
  }

  updateQuantity(line, quantity, name) {
    this.classList.add('is-loading');

    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map(
        section => section.section
      ),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_change_url}`, {
      ...fetchConfig(),
      ...{ body }
    })
      .then(response => response.text())
      .then(state => {
        const parsedState = JSON.parse(state);
        this.getSectionsToRender().forEach(section => {
          const elementToReplace = document.querySelector(section.selector) || document.querySelector(section.id);

          if (!parsedState.errors) {
            elementToReplace.innerHTML = this.getSectionInnerHTML(
              parsedState.sections[section.section],
              section.selector
            );
          }
        });
        if (!parsedState.errors) {
          this.totalItemCount = this.calculateTotalItemCount(parsedState.items);
        }
        this.updateLiveRegions(line, parsedState.item_count, parsedState.errors);
        const cartDrawerCounter = document.querySelector(
          ".cart-drawer__title-counter"
        );
        if (cartDrawerCounter) {
          cartDrawerCounter.innerHTML = this.totalItemCount;
        }
        const lineItem = document.getElementById(`CartItem-${line}`);
        if (lineItem && lineItem.querySelector(`[name="${name}"]`))
          lineItem.querySelector(`[name="${name}"]`).focus();

        updateFreeShipping();
      })
      .finally(() => this.classList.remove('is-loading'));


  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  updateLiveRegions(line, itemCount, parsedError) {

    // if error is not undefined, then we know that the quantity is invalid
    if (parsedError) {
      document
        .querySelectorAll(`[data-line-item-error][data-line="${line}"]`)
        .forEach(error => {
          error.innerHTML = parsedError;
        });
    }

    // if (this.currentItemCount === itemCount) {
    //   document
    //     .querySelectorAll(`[data-line-item-error][data-line="${line}"]`)
    //     .forEach(error => {
    //       error.innerHTML = window.cartStrings.quantityError.replace(
    //         '[quantity]', document.querySelector(`[id*="ProductQuantity-${line}"]`).value
    //       );
    //     });
    // }

    this.currentItemCount = itemCount;
  }
}
customElements.define('cart-items', CartItems);

// CART DRAWER SCRIPTS
const sectionsToRender = [
  {
    id: "#cart-counter",
    section: "cart-counter",
    selector: "#shopify-section-cart-counter"
  },
  {
    id: "#CartDrawer-Body",
    section: "cart-drawer",
    selector: "#shopify-section-cart-drawer #CartDrawer-Body"
  }
];

class CartDrawer extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("keyup", event => event.code.toUpperCase() === "ESCAPE" && this.close());
    this.querySelector("#CartDrawer-Overlay").addEventListener("click", this.close.bind(this));
    this.setCartLink();
    this.parentElement.addEventListener(
      "shopify:section:select",
      () => this.open()
    );
    this.parentElement.addEventListener(
      "shopify:section:deselect",
      () => this.close()
    );
  }

  setCartLink() {
    const cartLink = document.querySelector("[data-cart-link]");
    cartLink.setAttribute("role", "button");
    cartLink.setAttribute("aria-haspopup", "dialog");
    cartLink.addEventListener("click", event => {
      event.preventDefault();
      this.open(cartLink);
    });
    cartLink.addEventListener("keydown", event => {
      if (event.code.toUpperCase() !== "SPACE") return;
      event.preventDefault();
      this.open(cartLink);
    });
  }

  open(opener) {
    if (opener) this.setActiveElement(opener);
    this.classList.add("is-visible");
    this.addEventListener(
      "transitionend",
      () => {
        this.focusOnCartDrawer();
      },
      { once: true }
    );
    // bodyScroll.lock(this.querySelector('[role="dialog"]'));
    var productReccomendations = document.querySelector(
      ".product-recommendations"
    );
    if (productReccomendations) {
      if (productReccomendations.classList.contains("hidden")) {
        document
          .querySelector(".cart-drawer-items")
          .classList.add("cart-drawer-items__full");
      } else {
        document
          .querySelector(".cart-drawer-items")
          .classList.remove("cart-drawer-items__full");
      }
    }
  }

  close() {
    this.classList.remove("is-visible");
    removeTrapFocus(this.activeElement);

    const isHeaderMenuOpen = header.classList.contains("menu-open");

    if (isHeaderMenuOpen) {
      return;
    }

    // bodyScroll.unlock(this.querySelector('[role="dialog"]'));

    // if we are on the cart page, resubmit form
    if (window.location.pathname === "/cart") {
      const cartDrawerForm = document.getElementById(
        "CartDrawer-FormSummary"
      );
      if (cartDrawerForm) {
        cartDrawerForm.submit();
      }
    }
  }

  setActiveElement(element) {
    this.activeElement = element;
  }

  focusOnCartDrawer() {
    const containerToTrapFocusOn = this.firstElementChild;
    const focusElement = this.querySelector("[data-drawer-close]");
    trapFocus(containerToTrapFocusOn, focusElement);
  }

  renderContents(response, open = true) {
    this.getSectionsToRender()?.forEach(section => {
      const sectionElement = document.querySelector(section.id);
      sectionElement.innerHTML = this.getSectionInnerHTML(
        response.sections[section.section],
        section.selector
      );
    });
    if (!open) {
      return;
    }

    this.open();
  }

  getSectionsToRender() {
    return sectionsToRender;
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, "text/html")
      .querySelector(selector).innerHTML;
  }
}
customElements.define("cart-drawer", CartDrawer);

class CartDrawerItems extends CartItems {
  getSectionsToRender() {
    return sectionsToRender;
  }
}
customElements.define("cart-drawer-items", CartDrawerItems);
