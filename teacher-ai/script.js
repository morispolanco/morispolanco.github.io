const chatContainer = document.getElementById('chat');
const userInput = document.getElementById('user-input');
const startRecordButton = document.getElementById('start-record');

if ('speechSynthesis' in window) {
    var synth = window.speechSynthesis;
} else {
    console.error('SpeechSynthesis is not supported in this browser.');
}
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
} else {
    console.error('Speech recognition is not supported in this browser.');
}


recognition.continuous = false;
recognition.lang = 'en-US'; 


recognition.onresult = function (event) {
    const userMessage = event.results[0][0].transcript;
    appendMessage('user', userMessage);
    processUserInput(userMessage);
};


recognition.onerror = function (event) {
    console.error('Speech recognition error:', event.error);
};

startRecordButton.addEventListener('click', function () {
    startRecognition();
});

function startRecognition() {
    recognition.start();
    startRecordButton.textContent = 'Listening...';
    startRecordButton.disabled = true;
}

function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    if (sender === 'bot') {
        speakMessage(message);
    }
}

function speakMessage(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
}

function processUserInput() {
    const userMessage = userInput.value;
    appendMessage('user', userMessage);
    /*
    Future self continue with ML-logic here please
    */
    const botResponse = 'Bot: ' + userMessage;
    appendMessage('bot', botResponse);
    userInput.value = '';
}

userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processUserInput();
    }
});
