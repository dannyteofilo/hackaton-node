const axios = require('axios');
const openai = require('openai');
const fs = require('fs');

const welcomeController = {

  index: function (req, res) {
      res.send('¡Hola, mundo! desde el Welcome controller');
      // se renderiza la vista con las preguntas para generar el prompt
      //res.render('welcome/index');
      res.sendFile(path.join(__dirname, '../views', 'chat.html'));
  },

  sendToChatGPT: function (req, res) {
    // se renderiza la vista con las preguntas para generar el prompt
    //res.render('welcome/index');
    //res.send('¡Hola, mundo! desde el Welcome controller');
    console.log('Peticion recibida', req.body)
    const apiKey = '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';
    const url = 'https://api.openai.com/v1/chat/completions';

    axios.post(url, {
      //prompt: 'Hola!',
      messages: [{role: "user", 
      content: `Generame una historia de terror que tenga que ver con los temas de ${req.body.miedo}, ${req.body.ansiedad} y ${req.body.objeto} sin incluir tu respuestas de "claro, te genero la historia", que empieze con "habia una vez" o algo por el estilo`
      }],
      //max_tokens: 50,
      model: "gpt-3.5-turbo-0301",
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        "User-Agent": "axios 0.21.1"
      },
    })
      .then((response) => {
        //console.log('Respuesta de la API:', response.data.choices[0].message.content);
        const resp = response.data.choices[0].text;
        // send the response to the view
        res.json({ text: response.data.choices[0].message.content});
      })
      .catch((error) => {
        console.error('Error en la petición:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
      });
  },

  generateImg : function (req, res) {
    // Parámetros de configuración
    const apiKey = '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'; // Reemplaza con tu propia clave de API
    const prompt = `Una imagen que tenga que ver con los temas de ${req.body.miedo}, ${req.body.ansiedad} y ${req.body.objeto}`; // Texto que sirve de inspiración para la generación de la imagen
    const numImages = 1; // Número de imágenes a generar

    // URL de la API de DALL-E
    const apiUrl = 'https://api.openai.com/v1/images/generations';

    // Configuración de la solicitud HTTP
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      "User-Agent": "axios 0.21.1"
    };

    // Cuerpo de la solicitud HTTP
    const data = {
      prompt,
      n: numImages,
    };

    // Realizar la solicitud HTTP a la API de DALL-E
    axios.post(apiUrl, data, { headers })
      .then((response) => {
        // Obtener la imagen generada
        // Obtener la imagen generada
        console.log('Imagen generada:', response.data.data);
        //console.log('Imagen generada:', response.data.data);
        res.send({ data: response.data.data[0]})
      })
      .catch((error) => {
        console.log('Error al generar la imagen:', error)
        console.error('Error al generar la imagen:', error);
        res.send('Error al generar la imagen:', error);
      });
  }

  

};

module.exports = welcomeController;