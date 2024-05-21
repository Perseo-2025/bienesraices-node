import nodemailer from 'nodemailer'

const emailRegistro = async (datos)=>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
    });

    const {email, nombre, token} = datos

    //Enviar email
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu Cuenta en BienesRaices.com',
        text: 'Confirma tu Cuenta en BienesRaices.com',
        html: `
            <p>Hola ${nombre}! comprueba tu cuenta en BienesRaices.com </p> 

            <p>Tu Cuenta ya está lista, solo debes confirmar en el siguiente enlace: 
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta </a>
            </p>

            <p>Si no creaste esta cuenta, ignora el mensaje.</p>
        `
    })

}


const emailOlvidePassword = async (datos)=>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
    });

    const {email, nombre, token} = datos

    //Enviar email
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Resstablece tu Password en BienesRaices.com',
        text: 'Resstablece tu Password en BienesRaices.com',
        html: `
            <p>Hola ${nombre}! has solicitado reestablecer tu password en BienesRaices.com </p> 

            <p>Sigue el siguiente enlace para generar un password nuevo: 
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/restaurar-password/${token}">
                Reestablecer Password</a>
            </p>

            <p>Si no solicitaste restaurar tu password, ignora el mensaje.</p>
        `
    })

}

export {
    emailRegistro,
    emailOlvidePassword,
}