import {
  musees, restaurants, bars, hasard,
} from './Data/dataTable';
import { objBetween } from './Helpers/between';

// --- corps du texte

let choiceMusee; let choiceBar; let choiceRestaurant; const choiceHasard = [];
let tempHasard = [];
let rand = 0;
let rand2; let rand3; let rand4 = 0;
const choiceRoute = [];
let flag1; let flag2; let flag3 = false;


export const myfct = function constructRoute(val1, val2, val3) {
  console.log('hello je commence tout juste');
  choiceMusee = musees.filter((el) => val1 === el.type);
  console.table(choiceMusee);
  if (choiceMusee.length > 0) {
    flag1 = true;
    rand = Math.floor(Math.random() * choiceMusee.length);
    console.log(`le musée gagant:${choiceMusee[rand].nom}`);
    choiceRoute.push(choiceMusee[rand]);
  } else {
    console.log('aucun musée trouvé');
  }
  // chercher tous les bar selon le type demander
  choiceBar = bars.filter((el) => val3 === el.type);
  console.table(choiceBar);
  // choisir un bar au hasard dans le meme type
  if (choiceBar.length > 0) {
    flag2 = true;
    rand2 = Math.floor(Math.random() * choiceBar.length);
    console.log(`le bar gagant:${choiceBar[rand2].nom}`);
    choiceRoute.push(choiceBar[rand2]);
  } else {
    console.log('aucun bar trouvé');
  }
  // choisir un restaurant selon le type demander et la latitude
  const mymax1 = objBetween(choiceMusee[rand].latitude, choiceBar[rand2].latitude).maxi;
  const mymin1 = objBetween(choiceMusee[rand].latitude, choiceBar[rand2].latitude).mini;
  choiceRestaurant = restaurants
    .filter((el) => val2 === el.type)
    .filter((el) => el.latitude >= mymin1 && el.latitude <= mymax1);
  console.table(choiceRestaurant);
  if (choiceRestaurant.length > 0) {
    flag3 = true;
    rand3 = Math.floor(Math.random() * choiceRestaurant.length);
    console.log(`le resto gagant:${choiceRestaurant[rand3].nom}`);
    choiceRoute.push(choiceRestaurant[rand3]);
  } else {
    console.log('aucun restaurant trouvé');
  }
  // premier hasard
  if (flag1 && flag3) {
    const mymax = objBetween(choiceMusee[rand].latitude, choiceRestaurant[rand3].latitude).maxi;
    const mymin = objBetween(choiceMusee[rand].latitude, choiceRestaurant[rand3].latitude).mini;
    tempHasard = hasard.filter((el) => el.latitude >= mymin && el.latitude <= mymax);
    console.table('tous les hasards', tempHasard);
    if (tempHasard.length > 0) {
      rand4 = Math.floor(Math.random() * tempHasard.length);
      tempHasard[rand4].key = 'hasard1';
      // question au prof; pourquoi il push tous
      choiceHasard.push(tempHasard[rand4]);
      console.table('la hasard random', choiceHasard);
      choiceRoute.push(choiceHasard[0]);
    } else {
      console.log('aucun hasard trouvé');
    }
  }
  let flag4 = false;
  // deuxieme hasard
  if (flag2 && flag3) {
    const mymax = objBetween(choiceRestaurant[rand3].latitude, choiceBar[rand2].latitude).maxi;
    const mymin = objBetween(choiceRestaurant[rand3].latitude, choiceBar[rand2].latitude).mini;
    let tempHasard2 = [];
    tempHasard2 = hasard.filter((el) => el.latitude >= mymin && el.latitude <= mymax);
    console.log(tempHasard2);
    if (tempHasard2.length > 0) {
      const rand5 = Math.floor(Math.random() * tempHasard2.length);
      if (!choiceHasard.includes(tempHasard2[rand5])) {
        tempHasard2[rand5].key = 'hasard2';
        choiceHasard.push(tempHasard2[rand5]);
        flag4 = true;
        choiceRoute.push(choiceHasard[1]);
        console.log(`le hasard 2 gagant:${tempHasard2[rand5].nom}`);
      }
    }
  }
  // troisieme hasard
  if (flag4) {
    const mymax = objBetween(choiceHasard[1].latitude, choiceBar[rand2].latitude).maxi;
    const mymin = objBetween(choiceHasard[1].latitude, choiceBar[rand2].latitude).mini;
    const tempHasard3 = hasard.filter((el) => el.latitude >= mymin && el.latitude <= mymax);
    console.log(tempHasard3);
    if (tempHasard3.length > 1) {
      let rand5 = Math.floor(Math.random() * tempHasard3.length);
      while (choiceHasard.includes(tempHasard3[rand5])) {
        rand5 = Math.floor(Math.random() * tempHasard3.length);
      }
      if (!choiceHasard.includes(tempHasard3[rand5])) {
        tempHasard3[rand5].key = 'hasard3';
        choiceHasard.push(tempHasard3[rand5]);
        choiceRoute.push(choiceHasard[2]);
        console.log(`le hasard 3 gagant:${tempHasard3[rand5].nom}`);
      }
    }
  }

  console.table(choiceRoute);
  return choiceRoute;
};
