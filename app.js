const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const commandInput = document.querySelector('#commandInput');
const submitCommandBtn = document.querySelector('#submitCommand');

// Function to speak the provided text
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    // Set voice properties
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    // Select the first available voice (you can change this to a different one if you want)
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        text_speak.voice = voices[0];
    }

    window.speechSynthesis.speak(text_speak);
}

// Function to greet based on time of day
function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Sarandeep...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

// Run when the window is fully loaded
window.addEventListener('load', () => {
    speak("Initializing JARVIS..");
    wishMe();
});

// Set up Speech Recognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Set language for recognition (English-US)
recognition.lang = 'en-US';

// Triggered when speech is recognized
recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

// Error handling for speech recognition
recognition.onerror = function(event) {
    console.log('Speech recognition error detected: ' + event.error);
    speak("Sorry, I couldn't understand that. Could you repeat?");
};

// Button event listener to start voice recognition
btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});

// Button event listener to submit typed command
submitCommandBtn.addEventListener('click', () => {
    const typedCommand = commandInput.value.toLowerCase();
    if (typedCommand.trim()) {
        content.textContent = typedCommand;
        takeCommand(typedCommand);
    }
});

// Function to handle both spoken and written commands
function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replaceAll(" ", "+")}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        window.open('https://www.google.com/search?q=calculator');
        speak("Opening an online calculator.");
    } else {
        window.open(`https://www.google.com/search?q=${message.replaceAll(" ", "+")}`, "_blank");
        speak("I found some information for " + message + " on Google.");
    }
}
