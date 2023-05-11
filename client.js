const data = {
    id: "oiqwu98kjweqh89q",
    userId: "8rjkd89dj38923jklmsd890",
    email: "rdmadeira2@gmail.com",
    title:"Beaba",
    createdAt: "11/5/2023 12:59 a.m.",
    description: "oweuroweiruoweiusdklfjlksdjlksdjflksdjf",
    name: "Rodrigo",
    lastname: "Nascimento"
}

fetch('http://localhost:3000/api/mailing', {
    headers:{
        "content-type":"application/json; charset=UTF-8",
    },
    method:"post",
    body: JSON.stringify(data)
}).then(res => console.log(res.json(), 'Request Enviado')).then(data => console.log(data))