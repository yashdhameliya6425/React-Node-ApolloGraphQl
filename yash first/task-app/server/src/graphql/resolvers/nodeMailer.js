
const nodemailer = require('nodemailer');

// Generate SMTP service account from ethereal.email
 function main(user) {

    

    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'myra.kihn@ethereal.email',
            pass: 'r8vZFtj7npFE3uXuVs'
        }
    });

    let date = Date.now().toString()

    // Message object
    let message = {
        from:'yashdhameliya6425@gmail.com',
        to: user.Email,
        subject:'Resate-PassWord',
        html: '<p>Click <a href="http://localhost:3000/ResetPassword/' + date+ '">here</a> to reset your password</p>'
     
       
    };

   const Store = transporter.sendMail(message) 
       if (Store){
           return date
       }
       
  


 
}
export {main}