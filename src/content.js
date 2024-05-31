// This file is responsible for modifying the behavior of the Twitter website.
// It will make only one tweet visible at a time and handle the previous and next buttons.

let tweets = []
let shownTweet = null;

// Function to hide all tweets except the specified tweet index
function updateTweets() {
  tweets = [...document.querySelectorAll('article')];
}

function showTweet() {
  if (shownTweet === null && tweets.length === 0) {
    return
  }

  if (shownTweet === null || tweets.indexOf(shownTweet) === -1) {
    shownTweet = tweets[0];
  }

  for (const tweet of tweets) {
    if (tweet !== shownTweet) {
    tweet.style.visibility = 'hidden';
  } else {
    tweet.style.visibility = 'visible';
  }
  }
}

// Function to handle the previous button click
function handlePreviousButtonClick() {
  const shownTweetIndex = Math.max(0, tweets.indexOf(shownTweet) - 1)
  shownTweet = tweets[shownTweetIndex];

  showTweet();

  shownTweet.scrollIntoView();
  window.scrollBy(0, -100);
}

// Function to handle the next button click
function handleNextButtonClick() {
  const shownTweetIndex = Math.min(tweets.length - 1, tweets.indexOf(shownTweet) + 1)
  shownTweet = tweets[shownTweetIndex];

  showTweet();

  shownTweet.scrollIntoView();
  window.scrollBy(0, -100);
}

// Create previous and next buttons
const previousButton = document.createElement('button');
previousButton.id = 'previous-button';
previousButton.textContent = 'Previous';
previousButton.style.position = 'fixed';
previousButton.style.bottom = '20px';
previousButton.style.right = '80px';
document.body.appendChild(previousButton);

const nextButton = document.createElement('button');
nextButton.id = 'next-button';
nextButton.textContent = 'Next';
nextButton.style.position = 'fixed';
nextButton.style.bottom = '20px';
nextButton.style.right = '20px';
document.body.appendChild(nextButton);

// Add event listeners to the previous and next buttons
previousButton.addEventListener('click', handlePreviousButtonClick);

nextButton.addEventListener('click', handleNextButtonClick);

setInterval(() => {updateTweets(); showTweet()}, 1000);