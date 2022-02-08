const express = require('express')
const nodemailer = require('nodemailer')

const app = express()

const user = "xxxxxx@xxxxx.com.br"
const pass = "xxxxxxx"

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

        subject: "envio html com anexo pdf",

        // text: "Conteúdo da mensagem de email"


        // html: `<body>
        //     <h1>teste html</h1>
        // </body>`

        html : { path: 'pagina.html' },
        attachments: [{
            filename: 'boleto.pdf',
            path: 'boleto.pdf'
          }]
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