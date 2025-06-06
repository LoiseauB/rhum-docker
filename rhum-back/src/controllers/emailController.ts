import { Request, Response } from "express";
import Mailjet from "node-mailjet";

export const sendEmail = async (req: Request, res: Response) => {
  const {fromEmail, fromName, subject, emailMessage} = req.body
  const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE,
  });
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "bapt.loiseau+mailjet@gmail.com",
          Name: "RHUM.",
        },
        To: [
          {
            Email: "bapt.loiseau+rhum@gmail.com",
            Name: "Admin - RHUM",
          },
          {
            Email: fromEmail,
            Name: "Cc" + fromName,
          },
        ],
        Subject: "Contact - " + subject,
        TextPart: emailMessage,
        HTMLPart:
          `<h3>Demande de contact de la part de <a href="mailto:${fromEmail}">${fromName}</a>!</h3><br /><p>Son message:</p><br /><p>${emailMessage}</p>`,
      },
    ],
  });

  request
    .then((result) => {
      res.send(result.body);
    })
    .catch((err) => {
      res.status(500).send(err.statusCode);
    });
};
