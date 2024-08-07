const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('authors')
const xButton = document.getElementById('x')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;  

}

// Show new code
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //  Check if author is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown'
    }else{
        authorText.textContent = quote.author;
    }
    // Check Quote lenght to determine styling
    if(quote.text.length > 30){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    // Set Quote, Hide loader
    quoteText.textContent = quote.text;  
    complete();   
}

//  Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes'
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        const randomNum = Math.floor(Math.random()*12 +1);
        newQuote();
        
    }catch(error){
    // Catch Error here
    alert.error(`There's Problem`);
    
    } 
}

// Twwet quote 
function tweetQuote() {
    const xUrl = `https://x.com/intent/post?text=${quoteText.textContent} -${authorText.textContent}`;
    window.open(xUrl, '_blank');
}

// Event Listners
newQuoteBtn.addEventListener('click', newQuote);
xButton.addEventListener('click', tweetQuote)

// On Load
getQuotes();
// newQuote();


