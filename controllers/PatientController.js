const prisma = require('./PrismaClient');

async function CreatePatient(dataPatient) {
    const copyData = {
        patient_id: dataPatient.patient_id,
        fullname: dataPatient.fullname,
        qr_code: dataPatient.qr_code
    }

    const patient = await prisma.patient.create({
        data: copyData,
        select: {
            patient_id: true
        }
    })

    return patient;
}

async function UpdatePatient(patientId, patientData) {
    const findpatient = await GetPatientById(patientId);

    if(findpatient){
        findpatient.fullname = patientData.fullname != null? patientData.fullname: findpatient.fullname;
        findpatient.qr_code = patientData.qr_code != null? patientData.qr_code: findpatient.qr_code;
        const patient = await prisma.patient.update({
            where: {
                patient_id: patientId
            },
            data: findpatient
        })
        return patient;
    }else{
        return null;
    }
}

async function GetPatientById(patientId) {
    const findPatient = await prisma.patient.findFirst({
        where: {
            patient_id: patientId
        }
    })

    return findPatient;
}

async function GetPatients() {
    const list_patient = await prisma.patient.findMany();
    return list_patient;
}

module.exports = {
    CreatePatient,
    GetPatientById,
    UpdatePatient,
    GetPatients
}