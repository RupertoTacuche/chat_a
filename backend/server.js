// Archivo: server.js
// Este es el backend que se conectará de forma segura con la API de OpenAI.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai'); // El cambio principal está aquí

// Cargar variables de entorno del archivo .env
require('dotenv').config();

const app = express();
const port = 3000;

// Configuración de la API de OpenAI con la clave de entorno
// Nueva forma de inicializar el cliente
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Middleware para procesar JSON y habilitar CORS
app.use(bodyParser.json());
app.use(cors());

// Endpoint para manejar la conversación del chat
app.post('/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        
        // Uso del método actualizado para la conversación del chat
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages
        });

        res.json({
            message: response.choices[0].message.content
        });

    } catch (error) {
        console.error("Error al obtener la respuesta de la API:", error);
        res.status(500).json({ error: "Ocurrió un error al procesar tu solicitud." });
    }
});

// Endpoint para el texto a voz (TTS)
app.post('/tts', async (req, res) => {
    try {
        const { text } = req.body;
        
        // Uso del método actualizado para texto a voz
        const response = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: text,
        });

        // La respuesta ya no necesita responseType: 'arraybuffer'
        // Simplemente se usa el stream para enviar el audio
        const audioBuffer = await response.arrayBuffer();
        res.set('Content-Type', 'audio/mpeg');
        res.send(Buffer.from(audioBuffer));

    } catch (error) {
        console.error("Error al generar el audio:", error);
        res.status(500).json({ error: "Ocurrió un error al generar el audio." });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
