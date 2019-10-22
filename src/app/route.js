import $ from 'jquery';


export const route = () => {
  $('.circle-click').on('click', () => {
    $('.popup')
      .empty()
      .css('display', 'block');
  });

  /* $('.popup').on('click', () => {
    $('.popup').fadeOut();
  }); */
};
