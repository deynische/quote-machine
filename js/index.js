/* c9 ide error message fixes */
/* global select_random, optional_set, verb_set1, verb_set2, preposition_set, adjective_set, noun_set, verbing, pluralize, article_set, a_or_an, capitalize */

/* The sentence structure I will be using:
 * "Optional, I verb_present preposition article adjective noun verb_ing noun_plural."
 * ex: "Sometimes, I dream about a lopsided tree fighting toasters."
*/

//variables
var optional, verb_present, verb_ing, preposition, article, adjective, noun, noun_plural, quote = "";

//stash DOM elements into variables
var btn_new = document.getElementById('new-quote');
var btn_tweet = document.getElementById('tweet-quote');
var quote_content = document.querySelector('p.quote');

//random decide on optional phrase
function option_random(array) {
  var intro = "";
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
  var text = quote_content.innerHTML;
  url += text;
  return url;
}

//interactivity!

//attach events to buttons
btn_new.addEventListener('click', function() {
  quote_content.innerHTML = generate_quote();
}, false);
btn_tweet.addEventListener('click', function() {
  window.open(tweet_out());
}, false);