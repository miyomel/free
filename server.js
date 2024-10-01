const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para recibir los datos del frontend y guardarlos en un archivo .txt
app.post('/save-info', (req, res) => {
  const { deviceName, latitude, longitude, ip } = req.body;

  // Formato de la información a guardar
  const logEntry = `Dispositivo: ${deviceName}, IP: ${ip}, Latitud: ${latitude}, Longitud: ${longitude}\n`;

  // Ruta al archivo .txt
  const filePath = path.join(__dirname, 'informacion_dispositivo.txt');

  // Guardar la información en un archivo .txt, se añade al final si ya existe
  fs.appendFile(filePath, logEntry, (err) => {
    if (err) {
      console.error('Error al escribir en el archivo:', err);
      return res.status(500).json({ error: 'Error al guardar la información.' });
    }
    res.status(200).json({ message: 'Información guardada exitosamente.' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
