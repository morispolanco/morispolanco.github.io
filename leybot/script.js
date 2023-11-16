window.handleSubmit = async function handleSubmit() {
  if (!window.state.pregunta) {
    alert('Por favor, escriba una pregunta o caso.');
    return;
  }

  try {
    const apiKey = 'fcbfdfe8-e9ed-41f3-a7d8-b6587538e84e'; // Reemplaza 'TU_API_KEY' con tu clave de API

    const response = await fetch('https://api.afforai.com/api/api_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey,
        sessionID: '65489d7c9ad727940f2ab26f',
        history: [{
          role: 'user',
          content: window.state.pregunta,
        }],
        powerful: false,
        google: true,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const answer = data.text;

      window.state.respuesta = answer;
      window.render();
    } else {
      console.error('Error en la solicitud:', response.statusText);
      alert('Error al enviar la solicitud a la API. Consulta la consola para más detalles.');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    alert('Error en la solicitud. Consulta la consola para más detalles.');
  }
};

window.render = function render() {
  window.appElement.innerHTML = `
    <h1>Buscador</h1>
    <p>Esta aplicación responde preguntas sobre la legislación de Guatemala, buscando en la Web.</p>
    <p>Por Moris Polanco</p>
    <textarea oninput="window.state.pregunta = this.value" placeholder="Pregunta o caso"></textarea>
    <button onclick="handleSubmit()">Obtener Respuesta</button>
    ${window.state.respuesta ? `<div><strong>Respuesta:</strong> ${window.state.respuesta}</div>` : ''}
  `;
};

window.appElement = document.getElementById('app');
window.state = {
  pregunta: '',
  respuesta: ''
};

window.render();
