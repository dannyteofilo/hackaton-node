// Importación de módulos y dependencias
const express = require('express');
const app = express();
const admin = require('firebase-admin');
const firebase = require('firebase/app');
require('firebase/auth');

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAfWESN4MlsP76en4HlR144xBvrq1p760o",
  authDomain: "hackaton-julio-2023.firebaseapp.com",
  projectId: "hackaton-julio-2023",
  storageBucket: "hackaton-julio-2023.appspot.com",
  messagingSenderId: "706333694030",
  appId: "1:706333694030:web:40fc2d984a8653fc090b1f"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const serviceAccountCredentials = require("./credentials.json");
// Inicializar la aplicación admin de Firebase con las credenciales de servicio
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountCredentials),
  // Aquí puedes agregar más opciones de configuración si es necesario
});


// Configuración y middleware
app.use(express.json());
// Aquí puedes agregar otros middlewares, configuraciones y dependencias según sea necesario

// Inicio del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

const rutasMain = require('./routes/main');
const rutasWelcome = require('./routes/welcome');
app.use('/', rutasMain);
app.use('/chat', rutasWelcome);
