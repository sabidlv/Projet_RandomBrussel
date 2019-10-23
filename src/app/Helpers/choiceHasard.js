
// fonction selon le type demander
export const choiceUser = (choiceValue, dbTable) => {
  const tempTable = dbTable.filter((el) => el.type === choiceValue);
  if (tempTable.length > 0) {
    const rand = Math.floor(Math.random() * tempTable.length);
    return tempTable[rand];
  }
  console.log('No Match');
  const flag = false;
  return flag;
};
