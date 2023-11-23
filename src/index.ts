import xlsx from "xlsx";
import dotenv from "dotenv";
import { Mailer } from "@/lib/mailer";
import { mailOptions } from "@/config/mailer";
import { IReceipient } from "@/interfaces/receipient";

dotenv.config({
  path: process.cwd() + "/.env.development",
});

const workbook = xlsx.readFile(process.cwd() + process.env.XLSX_PATH);
const sheetOne = workbook.Sheets[workbook.SheetNames[0]];

const receipients: IReceipient[] = [];
for (let i = 1; i <= 118; i++) {
  const email = sheetOne[`D${i}`].v;
  const fullName = sheetOne[`G${i}`].v;

  const firstName = fullName.split(" ")[0];

  receipients.push({
    email,
    fullName,
    firstName,
  });
}
// receipients.push({
//   email: "raymond.rtju@gmail.com",
//   firstName: "raymond",
//   fullName: "raymond",
// });
// receipients.push({
//   email: "221111452@students.mikroskil.ac.id",
//   firstName: "raymond",
//   fullName: "raymond",
// });
// receipients.push({
//   email: "221111798@students.mikroskil.ac.id",
//   firstName: "naomi",
//   fullName: "Naomi Prisella",
// });

receipients.forEach((receipient) => {
  console.log(receipient.firstName.toLowerCase());
  // console.log(receipient.email);
});
const mailer = new Mailer();

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendEmailsWithDelay() {
  for (const receipient of receipients) {
    mailer.sendMail(
      mailOptions(
        receipient.email,
        "welcome to mikroskil programming club 💎",
        receipient,
        "/assets/html/MPC Invitation 2023.html"
      )
    );
    await delay(1000); // Delay of 1 second
  }
}

// sendEmailsWithDelay();
