class Carousel {
  constructor(el) {
    // reference to DOM element
    this.el = el;

    // reference to left and right buttons
    this.btnLeft = this.el.querySelector('.left-button');
    this.btnRight = this.el.querySelector('.right-button');

    // reference to images
    this.images = this.el.querySelectorAll('img');

    // set current index and display current image
    this.index = 0;
    this.images[this.index].style.display = 'block';
    this.interval = null;

    this.btnRight.addEventListener('click', () => this.slideRight());
    this.btnRight.addEventListener('mousedown', () => this.start(this.slideRight.bind(this)));
    this.btnRight.addEventListener('mouseup', () => this.stop());
    this.btnRight.addEventListener('mouseleave', () => this.stop());
    this.btnLeft.addEventListener('click', () => this.slideLeft());
    this.btnLeft.addEventListener('mousedown', () => this.start(this.slideLeft.bind(this)));
    this.btnLeft.addEventListener('mouseup', () => this.stop());
    this.btnLeft.addEventListener('mouseleave', () => this.stop());

    this.btnLeft.style.zIndex = 100;
  }

  start(cb) {
    this.interval = setInterval(cb, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  slideRight() {
    const nextIndex = (this.index + 1) % this.images.length;
    this.slideOut(nextIndex);
  }

  slideLeft() {
    const nextIndex = this.index === 0 ? this.images.length-1 : this.index-1;
    this.slideIn(nextIndex);
  }

  slideOut(nextIndex) {
    TweenLite.to(this.images[this.index], .4, {xPercent: '+=100', autoAlpha: 1, ease:Power1.easeOut, onComplete: () => {
      TweenLite.set(this.images[this.index], {xPercent: '-=100', display: 'none'});
      TweenLite.set(this.images[nextIndex], {xPercent: '-=50', autoAlpha: 0, display: 'block'});
      TweenLite.to(this.images[nextIndex], .4, {xPercent: '+=50', autoAlpha: 1, ease:Power1.easeOut, onComplete: () => {
        this.index = nextIndex;
      } })
    }})
  }

  slideIn(nextIndex) {
    TweenLite.to(this.images[this.index], .4, {xPercent: '-=100', autoAlpha: 1, ease:Power1.easeOut, onComplete: () => {
      TweenLite.set(this.images[this.index], {xPercent: '+=100', display: 'none'});
      TweenLite.set(this.images[nextIndex], {xPercent: '+=50', autoAlpha: 0, display: 'block'});
      TweenLite.to(this.images[nextIndex], .4, {xPercent: '-=50', autoAlpha: 1, ease:Power1.easeOut, onComplete: () => {
        this.index = nextIndex;
      } })
    }})
  }

  fadeInOut(nextIndex) {
    TweenLite.to(this.images[this.index], .4, {autoAlpha: '0', onComplete: () => {
      this.images[this.index].style.display = 'none';
      this.images[nextIndex].style.display = 'block';
    }});

    TweenLite.fromTo(this.images[nextIndex], .4, {autoAlpha: 0}, {autoAlpha: 1, onComplete: () => {
      this.index = nextIndex;
    }, delay: .4});
  }
}

let carousel = new Carousel(document.querySelector('.carousel'));

/* If You've gotten this far, you're on your own! Although we will give you some hints:
    1. You will need to grab a reference to the carousel, and in it grab the laft and right buttons
    2. You will need to grab a reference to all of the images
    3. Create a current index
    4. Those buttons are gonna need some click handlers.
    5. Think of how you would animate this compoennt. Make the cards slide in and out, or fade. It's up to you!
    6. Have fun!
*/