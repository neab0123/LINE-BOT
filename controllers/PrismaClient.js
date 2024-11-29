const PrismaClient = require('@prisma/client')

const prisma = new PrismaClient.PrismaClient()

const user = prisma.user;
const hospital = prisma.hospital;

module.exports = {
    user,
    hospital
}