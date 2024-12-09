const express = require('express')
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./library/Swagger');
const swaggerFile = require('./swagger_output.json');
const core = require('cors')

require('dotenv').config();

const app = express()

// Include route file
const userRoutes = require('./routes/User');
const lineRoute = require('./routes/LineWebhook');
const healthCheck = require('./routes/HealthCheck');
const patientRoutes = require('./routes/Patient');

app.use(express.json())
app.use(core())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

// Use route
app.use('/users', userRoutes);
app.use('/line', lineRoute);
app.use('/healthcheck', healthCheck);
app.use('/patients', patientRoutes);

app.listen(3000, () => {
    console.log("App is running on port:", 3000)
})