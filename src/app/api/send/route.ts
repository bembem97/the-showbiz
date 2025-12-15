import { Greetings } from "@/example/template/Greetings";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const { data, error } = await resend.emails.send({
    from: "The Showbiz <theshowbiz@email.com>",
    to: ["bembemcabrera97@gmail.com"],
    subject: "This is it, pansit.",
    html: "<h1>Hello, Yawa</h1>",
  });
  console.log({ data, error });

  if (error) {
    return Response.json({ error: "Fuck" }, { status: 500 });
  }

  return Response.json(data);
}
