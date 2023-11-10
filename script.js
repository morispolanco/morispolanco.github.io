import React, { useState } from 'react';
import axios from 'axios';

function Buscador() {
    const [pregunta, setPregunta] = useState('');
    const [respuesta, setRespuesta] = useState('');

    const handleSubmit = async () => {
        if (!pregunta) {
            alert('Por favor, escriba una pregunta o caso.');
            return;
        }

        try {
            const api_key = 'YOUR_API_KEY'; // Reemplaza con tu API key
            const response = await axios.post(
                'https://api.respell.ai/v1/run',
                {
                    spellId: 'k0GhQkJOn7IKEY-BdghY6',
                    inputs: {
                        pregunta: pregunta
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${api_key}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setRespuesta(response.data.outputs.respuesta);
            } else {
                alert('Error al enviar la solicitud a la API');
            }
        } catch (error) {
            alert('Error en la solicitud');
        }
    };

    return (
        <div>
            <h1>Buscador</h1>
            <p>Esta aplicación responde preguntas sobre la legislación de Guatemala, buscando en la Web.</p>
            <p>Por Moris Polanco</p>

            <textarea value={pregunta} onChange={(e) => setPregunta(e.target.value)} placeholder="Pregunta o caso"></textarea>
            <button onClick={handleSubmit}>Obtener Respuesta</button>

            {respuesta && <div><strong>Respuesta:</strong> {respuesta}</div>}
        </div>
    );
}

export default Buscador;
