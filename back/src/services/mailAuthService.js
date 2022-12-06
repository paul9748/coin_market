import nodemailer from "nodemailer";

class mailAuthService {
  static async sendMail({ email, randomNumber }) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTHUSER,
        pass: process.env.AUTHUSER_PW,
      },
    });

    const mailOptions = {
      from: {
        name: "코인마켓",
        address: "coinmarket7777777@gmail.com",
      },
      to: email,
      subject: "코인마켓 이메일 인증",
      html: `
      <div><h2>아래 인증코드를 입력해주세요.</h2></div>
      <h1>인증코드 : ${randomNumber}</h1>
      `,
    };

    transporter.sendMail(mailOptions);
  }
}

export { mailAuthService };
