const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}
// Passing Joke to VoiceRSS API
function tellMe(joke) {
    console.log("tell me:", joke);
    VoiceRSS.speech({
        key: 'b5174cc08a8a4ea699ac4cddb716f3d4',
        src: joke,
        hl: 'en-us',
        v: 'linda',
        r: -1,  
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    }); 
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous?blacklistFlags=sexist';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        } 
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch(error){
        // Catch Errors here
        console.log("Whoopes",error);   
    }
}

// Event Listners
button.addEventListener('click', getJokes);
audio.addEventListener('ended', toggleButton);
