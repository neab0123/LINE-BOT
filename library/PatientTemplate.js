function PatientTemplate(arrayPatient){
    let corauselTemplate = {
        type: "template",
        altText: "this is a carousel template",
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
        thumbnailImageUrl: "https://vignette.wikia.nocookie.net/line/images/b/bb/2015-brown.png",
        imageBackgroundColor: "#FFFFFF",
        title: patient.patient.fullname,
        text: "",
        defaultAction: {
            type: "text",
            label: "Test",
            text: "Test"
        },
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