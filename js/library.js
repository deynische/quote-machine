//grammar rule: a vs an
function a_or_an(word) {
  var article = 'a';
  var startLetter = word.charAt(0);
  for (var i = 0; i < vowels.length; i++) {
    if (startLetter === vowels[i]) {
      article = 'an';
      break;
    }
  }
  return article;
}

//grammar rule: noun plural
function pluralize(noun) {
  if (noun.charAt(noun.length - 1) === 'h') {
      noun += 'es';
  } else {
    noun += 's';
  }
  return noun;
}

//grammar rule: ing verb
//wrote crude fixes regarding doubling up and ing
//example case: converting run to running
function verbing(verb) {
  lastLetter = verb[verb.length-1];
  if (lastLetter === 'e') {
    verb = verb.slice(0, -1);
    verb += 'ing';
  } else if (lastLetter === 'g' || lastLetter === 'n') {
    verb += lastLetter + 'ing';
  } else {
    verb += 'ing';
  }
  return verb;
}

//captilize a sentence
function capitalize(str) {
  firstLetter = str[0];
  str = str.slice(1);
  str = firstLetter.toUpperCase() + str;
  return str;
}

//Math.random with included min and excluded max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//random select from array
function select_random(array) {
  var max = array.length;
  var index = getRandomInt(0, max);
  return array[index];
}