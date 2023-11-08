document.addEventListener("DOMContentLoaded", function () {
  const preguntaInput = document.getElementById("pregunta-input");
  const claveApiInput = document.getElementById("clave-api-input");
  const obtenerRespuestaButton = document.getElementById(
    "obtener-respuesta-button"
  );

  obtenerRespuestaButton.addEventListener("click", function () {
    const pregunta = preguntaInput.value;
    const claveApi = claveApiInput.value;

    if (!pregunta) {
      alert("Por favor, escriba una pregunta o caso.");
      return;
    }

    if (!claveApi) {
      alert("Por favor, ingrese una clave de API de Respell.");
      return;
    }

    axios
      .post(
        "https://api.respell.ai/v1/run",
        {
          spellId: "k0GhQkJOn7IKEY-BdghY6",
          inputs: {
            pregunta: pregunta
          }
        },
        {
          headers: {
            Authorization: `Bearer ${claveApi}`,
            "Content-Type": "application/json"
          }
        }
      )
      .then(function (response) {
        const respuesta =
          response.data.outputs.respuesta || "No se pudo obtener una respuesta";
        alert("Respuesta: " + respuesta);
      })
      .catch(function (error) {
        alert("Error al enviar la solicitud a la API");
      });
  });
});
