// Elementos del DOM
const app = document.querySelector('#app');

// Credenciales API
const API_KEY = '260cee54-6d54-48ba-92e8-bf641b5f4805';
const SPELL_ID = 'YiTnWQ0VLkGdU16i7bYLy';

// Estado inicial
let state = {
  pregunta: '',
  respuesta: '',
};

// Función para renderizar
function render() {
  app.innerHTML = `
    <h1>Generador de Noticias</h1>
    <p>Ingresa datos para generar una noticia:</p>
    <textarea
      placeholder="Ingresa datos..."
      oninput="state.pregunta = this.value"
    ></textarea>
    <button onclick="handleSubmit()">
      Generar Noticia
    </button>
    <div id="result"></div>
  `;
}

// Función para manejar envío async
async function handleSubmit() {
  document.getElementById('result').innerHTML = '<div class="loader"></div>';

  try {
    const response = await fetch('https://api.respell.ai/v1/run', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spellId: SPELL_ID,
        inputs: {
          pregunta: state.pregunta,
        },
      }),
    });

    const data = await response.json();

    state.respuesta = data.output.respuesta;

    document.getElementById('result').innerHTML = '
      <p>${state.respuesta}</p>
    ';
  } catch (error) {
    document.getElementById('result').innerHTML = 'Error al generar noticia';
  }
}

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', render);
