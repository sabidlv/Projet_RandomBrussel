import { reject } from 'ramda';
import {
  musees, restaurants, bars, hasard, hasardeux, combler,
} from './Data/dataTable';
import { objBetween } from './Helpers/between';
import { choiceUser } from './Helpers/choiceHasard';
// --- corps du texte
export const myfct = function constructRoute(val1, val2, val3) {
  let flag1 = false; let flag2 = false; let flag3 = false; let flag4 = false;
  let flag = false;
  const choiceRoute = []; let choiceRestaurant = [];
  let rand3;
  if (choiceUser) { // chercher musée
    choiceRoute.push(choiceUser(val1, musees));
    flag1 = true;
  }
  if (choiceUser) { // chercher bar
    choiceRoute.push(choiceUser(val3, bars));
    flag2 = true;
  }
  if (flag1 && flag2) { // chercher resto
    const mymax1 = objBetween(choiceRoute[0].latitude, choiceRoute[1].latitude).maxi;
    const mymin1 = objBetween(choiceRoute[0].latitude, choiceRoute[1].latitude).mini;
    choiceRestaurant = restaurants
      .filter((el) => val2 === el.type)
      .filter((el) => el.latitude >= mymin1 && el.latitude <= mymax1);
    console.table(choiceRestaurant);
    if (choiceRestaurant.length > 0) {
      rand3 = Math.floor(Math.random() * choiceRestaurant.length);
      choiceRoute.push(choiceRestaurant[rand3]);
      flag3 = true;
    }
  }
  const themax = objBetween(choiceRoute[0].latitude, choiceRoute[1].latitude).maxi;
  const themin = objBetween(choiceRoute[0].latitude, choiceRoute[1].latitude).mini;
  let bighasard = hasard.filter((el) => el.latitude <= themax
   && el.latitude >= themin);
  // fonction hasard
  const mesHasards = (mymax, mymin) => {
    const toto = bighasard;
    const hasardFilter = toto.filter((el) => el.latitude >= mymin && el.latitude <= mymax);
    if (hasardFilter.length > 0) {
      // const rando = Math.floor(Math.random() * hasardFilter.length);
      choiceRoute.push(hasardFilter[0]);
      bighasard = reject((el) => el === hasardFilter[0])(bighasard);
      flag = true;
      return flag;
    }
    flag = false;
    return flag;
  };
  // hasard1
  if (flag1 && flag3) {
    const mymax = objBetween(choiceRoute[0].latitude, choiceRestaurant[rand3].latitude).maxi;
    const mymin = objBetween(choiceRoute[0].latitude, choiceRestaurant[rand3].latitude).mini;
    const flagi = mesHasards(mymax, mymin);
    if (flagi) {
      choiceRoute[choiceRoute.length - 1].key = 'hasard1';
    }
  }

  if (flag2 && flag3) {
    const mymax = objBetween(choiceRestaurant[rand3].latitude, choiceRoute[1].latitude).maxi;
    const mymin = objBetween(choiceRestaurant[rand3].latitude, choiceRoute[1].latitude).mini;
    const flagi = mesHasards(mymax, mymin);
    if (flagi) {
      flag4 = true;
    }
  }
  if (flag4) {
    const mymax = objBetween(choiceRoute[4].latitude, choiceRoute[1].latitude).maxi;
    const mymin = objBetween(choiceRoute[4].latitude, choiceRoute[1].latitude).mini;
    mesHasards(mymax, mymin);
    const putName = choiceRoute.filter((el) => el.key === 'hasard');
    if (putName.length > 1) {
      const calc = choiceRoute[1].latitude;
      const dist1 = Math.abs(putName[0].latitude - calc);
      const dist2 = Math.abs(putName[1].latitude - calc);
      if (dist1 <= dist2) {
        choiceRoute[choiceRoute.length - 1].key = 'hasard2';
        choiceRoute[choiceRoute.length - 2].key = 'hasard3';
      } else {
        choiceRoute[choiceRoute.length - 2].key = 'hasard2';
        choiceRoute[choiceRoute.length - 1].key = 'hasard3';
      }
    } else {
      choiceRoute.push(combler);
    }
  } else {
    choiceRoute.push(hasardeux);
    choiceRoute.push(combler);
  }
  console.table(choiceRoute);
  return choiceRoute;
};
