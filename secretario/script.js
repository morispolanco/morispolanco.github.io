// Usar una declaración de función normal
function handleSubmit() {
  // Usar una variable local para el estado
  const state = {
    pregunta: '',
    respuesta: ''
  };

  if (!state.pregunta) {
    alert('Por favor, escriba una pregunta o caso.');
    return;
  }

  try {
    // Usar la variable api_key en el encabezado de autorización
    const api_key = 'YOUR_API_KEY'; // Reemplaza con tu API key
    const response = await axios.post(
      'https://api.respell.ai/v1/run', {
        spellId:'qPnyGRPqmYt7xjSLRX8t_',
        inputs: {
          pregunta: state.pregunta
        }
      }, {
        headers: {
          Authorization: `Bearer ${api_key}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status === 200) {
      state.respuesta = response.data.outputs.respuesta;
      render();
    } else {
      alert('Error al enviar la solicitud a la API');
    }
  } catch (error) {
    alert('Error en la solicitud');
  }
};

// Usar una declaración de función normal
function render() {
  // Usar una variable local para el elemento de la aplicación
  const appElement = document.getElementById('app');

  appElement.innerHTML = `
    <h1>Secretario</h1>
    <p>Esta aplicación ordena y amplía sus notas.</p>
    <p>Por Moris Polanco</p>
    <textarea oninput="state.pregunta = this.value" placeholder="Notas"></textarea>
    <button onclick="handleSubmit()">Generar texto</button>
    ${state.respuesta ? `<div><strong>Respuesta:</strong> ${state.respuesta}</div>` : ''}
  `;
};

render();
