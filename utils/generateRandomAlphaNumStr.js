const generateRandomAlphaNumStr = (strSize) => {
  return [...Array(strSize)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
  // const color = Math.floor(Math.random() * (0xffffff + 1)).toString(16).padStart(6, '0')
};
module.exports = generateRandomAlphaNumStr;
