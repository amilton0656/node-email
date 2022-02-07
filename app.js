const express = require('express')
const nodemailer = require('nodemailer')

const app = express()

const user = "amilton@cotaadm.com.br"
const pass = "#Amilton313131"

app.get("/", (req, res) => res.send('Hello world!'))

app.get("/send", (req, res) => {

    const transport = nodemailer.createTransport({
        host: "smtp.cotaadm.com.br",
        service: "smtp.cotaadm.com.br",
        port: 587,
        auth: {
            user: user, 
            pass: pass
        },
        tls: {
            ciphers:'SSLv3',
            rejectUnauthorized: false
        }
    })

    const mensagem = {
        from: user,
        to: "amilton@cota.com.br",
        replayTo: user,

        subject: "envio html",

        // text: "Conteúdo da mensagem de email"


        // html: `<body>
        //     <h1>teste html</h1>
        // </body>`

        html : { path: 'pagina.html' }
    }

    transport.sendMail(mensagem)
    .then(info => {
        res.send(info)
    })
    .catch(error => {
        res.send(error) 
    })
})


app.listen(8010, () => console.log('Server ON: 8010'))