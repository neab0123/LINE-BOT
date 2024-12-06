const prisma = require('./PrismaClient');

async function CreateUserPatient(userpatientData) {
    const copyData = {
        user_id: userpatientData.user_id,
        patient_id: userpatientData.patient_id
    }

    const result = await prisma.patient_user.create({
        data: copyData,
        select: {
            user_id: true,
            patient_id: true
        }
    })

    return result;
}

module.exports = {
    CreateUserPatient
}