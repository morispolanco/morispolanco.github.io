window.handleSubmit = async function handleSubmit() {
  if (!window.state.pregunta) {
    alert('Por favor, escriba una pregunta o caso.');
    return;
  }

  try {
    const api_key = 'YOUR_API_KEY'; // Reemplaza con tu API key
    const response = await axios.post(
      'https://api.respell.ai/v1/run', {
        spellId:'qPnyGRPqmYt7xjSLRX8t_',
        inputs: {
          pregunta: window.state.pregunta
        }
      }, {
        headers: {
          Authorization: 'Bearer 260cee54-6d54-48ba-92e8-bf641b5f4805',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status === 200) {
      window.state.respuesta = response.data.outputs.respuesta;
      window.render();
    } else {
      alert('Error al enviar la solicitud a la API');
    }
  } catch (error) {
    alert('Error en la solicitud');
  }
};

window.render = function render() {
  window.appElement.innerHTML = `
    <h1>Secretario</h1>
    <p>Esta aplicación ordena y amplía sus notas.</p>
    <p>Por Moris Polanco</p>
    <textarea oninput="window.state.pregunta = this.value" placeholder="Notas"></textarea>
    <button onclick="handleSubmit()">Generar texto</button>
    ${window.state.respuesta ? `<div><strong>Respuesta:</strong> ${window.state.respuesta}</div>` : ''}
  `;
};

window.appElement = document.getElementById('app');
window.state = {
  pregunta: '',
  respuesta: ''
};

window.render();
