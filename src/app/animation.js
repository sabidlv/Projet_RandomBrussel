import $ from 'jquery';

// const animationDone = localStorage.getItem('animationDone');
export const myanime = () => {
  const animationDone = sessionStorage.getItem('animationDone');
  if (animationDone) {
    $('#div-index').remove();
    $('.hide').css('display', 'block');
  } else {
    const logoIndex = $('#index-logo');
    console.log(logoIndex);
    $('#div-index').show();
    logoIndex.animate({
      opacity: 1,
    }, 2000, () => {
      $('.hide').css('display', 'block');
      $('#div-index').remove();
      sessionStorage.setItem('animationDone', true);
    });
  }
};

// Animation Menu
export const mymenuAnime = () => {
  const bars = document.getElementById('bar-action');
  const nav = document.getElementById('nav');
  const myspans = $('.spans');

  function barClicked() {
    bars.classList.toggle('active');
    nav.classList.toggle('visible');
    myspans.each(function () {
      this.classList.toggle('anime');
    });
  }
  bars.addEventListener('click', barClicked);
};
