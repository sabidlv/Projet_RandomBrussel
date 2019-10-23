import $ from 'jquery';
import swal from 'sweetalert';
import { myanime, mymenuAnime } from './app/animation';
import { parcours } from './app/Data/dataTable';
import { myfct } from './app/table';
import 'drawsvg';


// animation: accceuil et menu:
myanime();
mymenuAnime();

// Page questions:Slide des questions:
const slidesize = $('#div-form').width();
let slideCount = 0;
$('#arrow').on('click', () => {
  $('#arrow2').css('display', 'block');
  const currentMarginLeft = parseInt($('#div-container').css('margin-left'), 10);
  $('#div-container').animate({
    'margin-left': `${currentMarginLeft - slidesize}px`,
  }, () => {
    slideCount++;
    if (slideCount === $('.div-question').length) {
      $('#div-form').css('display', 'none');
      $('#div-route').css('display', 'block');
      $('#arrow').css('display', 'none');
      $('#arrow2').css('display', 'none');
      $('#fig-route').show();
      const mySVG = $('#fig-route').drawsvg();
      mySVG.drawsvg('animate');
    }
  });
});

// Page questions: Slides Inverse

$('#arrow2').on('click', () => {
  const currentMarginLeft = parseInt($('#div-container').css('margin-left'), 10);
  if (slideCount !== 0) {
    $('#div-container').animate({
      'margin-left': `${currentMarginLeft + slidesize}px`,
    }, () => {
      slideCount--;
      if (slideCount === 0) {
        $('#arrow2').css('display', 'none');
      }
    });
  }
});


// récuperer valeur inputs
let val1 = '';
let val2 = '';
let val3 = '';
let flag1 = false;
let flag2 = false;
let flag3 = false;
let tabRetour = [];


$("input[type='radio']").click(() => {
  if ($('input[name="musee"]').is(':checked')) {
    val1 = $('input[name="musee"]:checked').val();
    console.log(val1);
    flag1 = true;
  }

  if ($('input[name="restaurant"]').is(':checked')) {
    val2 = $('input[name="restaurant"]:checked').val();
    console.log(val2);
    flag2 = true;
  }
  if ($('input[name="bar"]').is(':checked')) {
    val3 = $("input[name='bar']:checked").val();
    console.log(val3);
    flag3 = true;
  }

  if (flag1 && flag2 && flag3) {
    tabRetour = myfct(val1, val2, val3);
  }
});


// show popup:
export const route = () => {
  $('.circle-click').on('click', () => {
    if (flag1 && flag2 && flag3) {
      $('.popup')
        .empty()
        .css('display', 'block');
    } else {
      swal('Oops! Sorry');
    }
  });
};

if ($('.page-route').length > 0) {
  route();
}

let slideIndex = 1;
for (const path of parcours) {
  $(path.id).on('click', () => {
    if (flag1 && flag2 && flag3) {
      // croix pour fermer
      $('.popup').append('<div class= "menuBars"></div>');
      $('.menuBars').on('click', () => {
        $('.popup').hide();
      });
      $('.menuBars').append('<div id ="menuTop" class= "menuBar"></div>');
      $('.menuBars').append('<div id ="menuBottom" class= "menuBar"></div>');
      // let compt = 0;
      // const hasards = tabRetour.filter((x) => x.key === 'hasard'); && el.key !== 'hasard'
      for (const el of tabRetour) {
        if (el.key === path.key) {
          console.log(1);
          $('.popup')
            .append(`<img id="myimage" src='./assets/images/parcours/${el.image}' alt='musée'>`)
            .append(`<h4 class="resize-title">${el.nom}</h4>`)
            .append(`<i class="fas fa-map-marker-alt"'></i><a class="resize" href=${el.map} target='_blank' class= 'linkPopup'> ${el.adresse}</a>`)
            .append(`<p class="resize">${el.description}</p>`)
            .append(`<a  class="resize" href=${el.url} target= '_blank' class = 'linkPopup'> Site of the place</a>`);
        } /* else if (el.key === path.key && el.key === 'hasard') {
          console.log(2);
          $('.popup')
            .append(`<img id="myimage" src='./assets/images/parcours/${hasards[compt].image}' alt='musée'>`)
            .append(`<h4 class="resize-title">${hasards[compt].nom}</h4>`)
            .append(`<a class="resize" href=${hasards[compt].map} target='_blank' class= 'linkPopup'> ${hasards[compt].adresse}</a>`)
            .append(`<p class="resize">${hasards[compt].description}</p>`)
            .append(`<a  class="resize" href=${hasards[compt].url} target= '_blank' class = 'linkPopup'> Site of the place</a>`);
          compt++;
        } */
      }

      // POPUP IMAGE SLIDER
      $('#myimage').on('click', () => {
        $('.overlay').fadeIn();
        $('.popup-img')
          .empty()
          .append(
            ` <img class="mySlides" src="https://upload.wikimedia.org/wikipedia/commons/8/83/Mus%C3%A9e_Magritte%2C_Brussels%2C_in_June_2016.jpg">
              <img class="mySlides" src="https://www.musee-magritte-museum.be/uploads/pages/images/dsc_3001_mmm_home_1_medium@2x.jpg">
              <img class="mySlides" src="https://www.musee-magritte-museum.be/uploads/pages/images/dsc_9348_giacomobretzel_car_medium@2x.jpg">

              <button class="prev"><i class="fas fa-caret-left"></i></button>
              <button class="next"><i class="fas fa-caret-right"></i></button>
            `,
          )
          . fadeIn();
        $('.popup').hide();

        function showDivs(n) {
          const x = document.getElementsByClassName('mySlides');
          if (n > x.length) { slideIndex = 1; }
          if (n < 1) { slideIndex = x.length; }
          for (let i = 0; i < x.length; i++) {
            x[i].style.display = 'none';
          }
          x[slideIndex - 1].style.display = 'block';
        }
        showDivs(slideIndex);

        function plusDivs(n) {
          showDivs(slideIndex += n);
        }
        $('.prev').on('click', (event) => {
          event.stopPropagation();
          plusDivs(1);
        });
        $('.next').on('click', (event) => {
          event.stopPropagation();
          plusDivs(-1);
        });
      });
      $('.popup-img').on('click', () => {
        $('.popup-img, .overlay').fadeOut();
        $('.popup').show();
      });
      // FIN POPUP IMAGE SLIDER
    }
  });
}
