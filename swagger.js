const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endPoint = ['./routes/*.js']

swaggerAutogen(outputFile, endPoint)