const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endPoint = ['server.js']

swaggerAutogen(outputFile, endPoint)