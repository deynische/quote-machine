/* The sentence structure I will be using:
 * "Optional, I verb_present preposition article adjective noun verb_ing noun_plural."
 * ex: "Sometimes, I dream about a lopsided tree fighting toasters."
*/

//variables
var optional, verb_present, verb_ing, preposition, article, adjective, noun, noun_plural, quote = "";

//dictionaries
var optional_set = ['during nights', 'every other day', 'everyday', 'frequently', 'in the morning', 'occasionally', 'on weekends', 'once in a blue moon', 'rarely', 'sometimes'];
var verb_set1 = ['argue', 'ask', 'confess', 'dream', 'go', 'lie', 'plan', 'read', 'run', 'speak', 'study', 'think', 'wonder', 'write'];
var verb_set2 = ['charm', 'collect', 'confront', 'console', 'crochet', 'draw', 'fight', 'fix', 'fly', 'launder', 'make', 'mug', 'name', 'polish', 'run', 'walk', 'wash'];
var preposition_set = ['about', 'after', 'along', 'amid', 'before', 'by', 'for', 'like', 'upon', 'with'];
var article_set = ['a', 'the'];
var adjective_set = ['academic', 'aged', 'angry', 'biodegradable', 'bitter', 'colossal', 'crooked', 'delectable', 'distorted', 'dreadful', 'fair-trade', 'feisty', 'flamboyant', 'granular', 'groteque', 'illegal', 'insidious', 'juicy', 'lackluster', 'linear', 'lopsided', 'majestic', 'milky', 'oblong', 'overcooked', 'peaceful', 'pesky', 'pleasant', 'plump', 'posh', 'regal', 'scintillating', 'shady', 'silky', 'suspicious', 'useless', 'vivacious', 'waterlogged', 'weepy', 'wobbly'];
var noun_set = ['afghan', 'answer', 'attack helicopter', 'banana', 'bee', 'burrito', 'cake', 'cat', 'chair', 'clock', 'cloud', 'desk fan', 'dust mite', 'gnome', 'hat', 'kangaroo', 'light bulb', 'painting', 'photo', 'pizza', 'projector', 'pug', 'quail', 'question', 'rat', 'salmon', 'silverfish', 'spider', 'stone', 'teapot', 'toaster', 'toilet', 'train', 'tree', 'truck', 'turkey', 'unicycle', 'watch', 'weasel', 'weevil'];
var vowels = ['a', 'e', 'i', 'o']; //left out U due to weird sound rules

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

//random decide on optional phrase
function option_random(array) {
  var intro = ""
  var coin = Math.round(Math.random());
  if (coin === 1) {
    intro = select_random(array);
    intro += ", ";
    return intro;
  } else if (coin === 0) {
    return intro;
  }
}

//build quote
function generate_quote() {
  //generate words
  optional = option_random(optional_set);
  verb_present = select_random(verb_set1);
  preposition = select_random(preposition_set);
  adjective = select_random(adjective_set);
  noun = select_random(noun_set);
  verb_ing = verbing(select_random(verb_set2));
  noun_plural = pluralize(select_random(noun_set));

  //generate article last since it's kind of conditional on the following word
  article = select_random(article_set);
  if (article === 'a') {
    article = a_or_an(adjective);
  }

  //build sentence
  quote = optional + "I " + verb_present + " " + preposition + " " + article + " " + adjective + " " + noun + " " + verb_ing + " " + noun_plural + ".";
    
  return capitalize(quote);
}

//Twitter sharing
function tweet_out() {
  var url = "https://twitter.com/intent/tweet?hashtags=deepthoughts&related=freecodecamp&text=";
  var text = $(".quote").html();
  url += text;
  return url;
}

//interactivity
$("#new-quote").click(function() {
  $(".quote").html(generate_quote());
})
$("#tweet-quote").click(function() {
  window.open(tweet_out());
})