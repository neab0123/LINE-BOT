function PatientTemplate(arrayPatient){
    let corauselTemplate = {
        type: "",
        altText: "",
        template: {
            type: "corausel",
            columns: arrayPatient.map((data) => {
                return(
                    PatientCard(data)
                );
            })
        }
    }

    return corauselTemplate;
}

function PatientCard(patient){
    return {
        thumbnailImageUrl: "",
        imageBackgroundColor: "#FFFFFF",
        title: patient.patient.fullname,
        text: "",
        actions: [
            {
                type: "text",
                label: "เปลี่ยนชื่อ",
                text: "เปลี่ยนชื่อ"
            },
            {
                type: "text",
                label: "จัดการผู้ดูแล",
                text: "จัดการผู้ดูแล"
            },
            {
                type: "text",
                label: "ยกเลิกการใช้งาน",
                text: "ยกเลิกการใช้งาน"
            }
        ]
    }
}

module.exports = {
    PatientTemplate
}