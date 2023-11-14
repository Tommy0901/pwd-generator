function randomArrayElement(arr, num) {
  let result = "";
  for (let i = 0; i < num; i++) {
    result += arr[Math.floor(Math.random() * arr.length)];
  }
  return result;
}

module.exports = (option) => {
  // define things user might want
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = lowerCaseLetters.toLocaleUpperCase();
  const numbers = "0123456789";
  const symbols = '`~!@#$%^&*()-=_+{}[]|;:",./<>?';

  // create a collection to store things user picked up
  let collection = "";

  collection += option.lowercase === "on" ? lowerCaseLetters : "";
  collection += option.uppercase === "on" ? upperCaseLetters : "";
  collection += option.numbers === "on" ? numbers : "";
  collection += option.symbols === "on" ? symbols : "";
  collection = option.exclude
    ? collection
        .split("")
        .filter((character) => !option.exclude.includes(character))
    : collection.split("");
  
  if (!collection.length) {
    return Object.keys(option).length === 2 ?  0 : 1;
  }
  
  return randomArrayElement(collection, option.length);
};
