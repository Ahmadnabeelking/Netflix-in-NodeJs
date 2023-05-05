import nodemailer from "nodemailer";

export async function confirmemail(dest,subject,message) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORDEMAIL, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Netflix" <${process.env.EMAIL}>`, // sender address
    to: dest, // list of receivers
    subject, // Subject line
    html: message, // html body
  });
  return info;
}