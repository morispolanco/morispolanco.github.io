document.getElementById("submitButton").addEventListener("click", function() {
    var userInput = document.getElementById("userInput").value;
    var responseDiv = document.getElementById("response");

    // Realiza una solicitud HTTP a la API de AfforAI con el valor de userInput
    var apiKey = "fcbfdfe8-e9ed-41f3-a7d8-b6587538e84e";
    var sessionID = "65489d7c9ad727940f2ab26f";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.afforai.com/api/api_completion", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            // Actualiza el contenido de la respuesta en el elemento con id "response"
            responseDiv.innerHTML = response.content;
        }
    };

    var payload = {
        apiKey: apiKey,
        sessionID: sessionID,
        history: [{ role: "user", content: userInput }],
        powerful: false,
        google: true
    };

    xhr.send(JSON.stringify(payload));
});
