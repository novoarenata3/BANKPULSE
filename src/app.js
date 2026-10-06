const express = require('express');
const routes = require('./routes/transactionRoutes');

const app = express();
app.use(express.json());

// HTML de la Vista principal
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>BANKPULSE</title></head>
      <body style="font-family: sans-serif; padding: 2rem;">
        <h1>BANKPULSE - Sistema de Pagos</h1>
        <p>Estado del servicio: <strong>Activo</strong></p>
        <p>Probar endpoint de salud: <a href="/health">/health</a></p>
      </body>
    </html>
  `);
});

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BANKPULSE corriendo en puerto ${PORT}`);
});
