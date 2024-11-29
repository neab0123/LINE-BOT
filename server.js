const express = require('express')
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./library/Swagger');
const swaggerFile = require('./swagger_output.json');

require('dotenv').config();

const app = express()

// Include route file
const userRoutes = require('./routes/User');
const lineRoute = require('./routes/LineWebhook');

app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

// Use route
app.use('/users', userRoutes);
app.use('/line', lineRoute);

app.listen(3000, () => {
    console.log("App is running on port:", 3000)
})