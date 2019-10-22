import {
  musees, restaurants, bars, hasard,
} from './Data/dataTable';
import { objBetween } from './Helpers/between';

// --- corps du texte

const choiceMusee = [];
const choiceBar = [];
const choiceRestaurant = [];
const choiceHasard = [];
let rand = 0;
let rand2 = 0;
let rand3 = 0;
const choiceRoute = [];
let flag1 = false;
let flag2 = false;
let flag3 = false;

export const myfct = function constructRoute(val1, val2, val3) {
  console.log('hello je commence tout juste');
  // cherhcher tous les musees du type demander
  for (let i = 0; i < musees.length; i++) {
    if (val1 === musees[i].type) {
      choiceMusee.push(musees[i]);
    }
  }
  // afficher les musées
  for (const el of choiceMusee) {
    console.log(`les musées choisis:${el.nom}`);
  }
  // choisir un musée random
  if (choiceMusee.length > 0) {
    flag1 = true;
    rand = Math.floor(Math.random() * choiceMusee.length);
    console.log(`le musée gagant:${choiceMusee[rand].nom}`);
    choiceRoute.push(choiceMusee[rand]);
  } else {
    console.log('aucun musée trouvé');
  }
  // chercher tous les bar selon le type demander
  for (let i = 0; i < bars.length; i++) {
    if (val3 === bars[i].type) {
      choiceBar.push(bars[i]);
    }
  }
  for (const el of choiceBar) {
    console.log(`les bars choisis:${el.nom}`);
  }
  // choisir un bar au hasard dans le meme type
  if (choiceBar.length > 0) {
    flag2 = true;
    rand2 = Math.floor(Math.random() * choiceBar.length);
    console.log(`le bar gagant:${choiceBar[rand2].nom}`);
    choiceRoute.push(choiceBar[rand2]);
  } else {
    console.log('aucun bar trouvé');
  }
  // choisir un bar selon le type demander et la latitude
  for (let i = 0; i < restaurants.length; i++) {
    if (val2 === restaurants[i].type) {
      const mymax = objBetween(choiceMusee[rand].latitude, choiceBar[rand2].latitude).maxi;
      const mymin = objBetween(choiceMusee[rand].latitude, choiceBar[rand2].latitude).mini;

      if ((mymin <= restaurants[i].latitude) && (mymax >= restaurants[i].latitude)) {
        choiceRestaurant.push(restaurants[i]);
      }
    }
  }
  for (const el of choiceRestaurant) {
    console.log(`les resto choisis:${el.nom}`);
  }
  if (choiceRestaurant.length > 0) {
    flag3 = true;
    rand3 = Math.floor(Math.random() * choiceRestaurant.length);
    console.log(`le resto gagant:${choiceRestaurant[rand3].nom}`);
    choiceRoute.push(choiceRestaurant[rand3]);
  } else {
    console.log('aucun restaurant trouvé');
  }
  // choisir les hasards : pour le moment 3
  // premier hasard
  if (flag1 && flag3) {
    for (let i = 0; i < hasard.length; i++) {
      const mymax = objBetween(choiceMusee[rand].latitude, choiceRestaurant[rand3].latitude).maxi;
      const mymin = objBetween(choiceMusee[rand].latitude, choiceRestaurant[rand3].latitude).mini;
      if ((mymin <= hasard[i].latitude) && (mymax >= hasard[i].latitude)) {
        choiceHasard.push(hasard[i]);
        choiceHasard[choiceHasard.length - 1].key = 'hasard1';
        choiceRoute.push(hasard[i]);
        console.log(`le hasard1 gagant:${choiceHasard[i].nom}`);
        break;
      }
    }
  }
  // deuxieme et troisieme hasard
  if (flag2 && flag3) {
    let count = 2;
    for (let i = 0; i < hasard.length; i++) {
      const mymax = objBetween(choiceRestaurant[rand3].latitude, choiceBar[rand2].latitude).maxi;
      const mymin = objBetween(choiceRestaurant[rand3].latitude, choiceBar[rand2].latitude).mini;
      if ((mymin <= hasard[i].latitude) && (mymax >= hasard[i].latitude)) {
        if (!choiceHasard.includes(hasard[i])) {
          choiceHasard.push(hasard[i]);
          choiceHasard[choiceHasard.length - 1].key = `hasard${count}`;
          choiceRoute.push(hasard[i]);
          count++;
          console.log(`le hasard 2 gagant:${choiceHasard[i].npm}`);
        }
      }
      if (count >= 4) {
        break;
      }
    }
  }
  console.log(choiceRoute);
  return choiceRoute;
};
