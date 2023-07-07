const admin = require('firebase-admin');
const firebase = require('firebase/app');
const path = require('path');

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

const mainController = {

    index: function (req, res) {
        //res.send('¡Hola, mundo! desde el controller');
        res.sendFile(path.join(__dirname, '../views', 'home.html'));
    },

    register: function (req, res) {
      // se renderiza la vista del login */
      res.sendFile(path.join(__dirname, '../views', 'register.html'));
    },

    saveUser: function (req, res) {
      // Crear un nuevo usuario
      const userProperties = {
        email: req.body.email,
        password: req.body.password,
        //displayName: 'Nombre de usuario',
      };

      admin.auth().createUser(userProperties)
        .then((userRecord) => {
          console.log('Usuario creado exitosamente:', userRecord.uid);
          // redirect to welcome page
          //res.redirect('/welcome');
        })
        .catch((error) => {
          console.error('Error al crear usuario:', error);
          // refresh the page
          res.redirect('/');
        });
    },

    /* login: function (req, res) {
      // Iniciar sesión con un usuario existente
      // Login de usuario
      firebase.auth().signInWithEmailAndPassword('correo@example.com', 'contraseña123')
      .then((userCredential) => {
        // El inicio de sesión fue exitoso
        const user = userCredential.user;
        console.log('Usuario autenticado:', user.uid);
      })
      .catch((error) => {
        // Ocurrió un error durante el inicio de sesión
        console.error('Error al autenticar:', error);
      });
    } */

    

};

module.exports = mainController;