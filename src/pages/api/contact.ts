import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { company } from "../../data/site";

export const prerender = false;

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function isValidPayload(data: unknown): data is ContactPayload {
  if (typeof data !== "object" || data === null) return false;
  const { name, email, message } = data as Record<string, unknown>;
  return (
    typeof name === "string" &&
    name.trim().length > 0 &&
    typeof email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    typeof message === "string" &&
    message.trim().length > 0
  );
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return new Response(JSON.stringify({ error: "Datos de formulario no válidos." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email, message } = body;

  const resendApiKey = env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn("RESEND_API_KEY no configurada: email no enviado (modo demo).", {
      name,
      email,
    });
    return new Response(JSON.stringify({ ok: true, demo: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Formulario de contacto <onboarding@resend.dev>`,
      to: [company.email],
      reply_to: email,
      subject: `Nuevo contacto desde la web: ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Error al enviar email con Resend:", errorText);
    return new Response(JSON.stringify({ error: "No se pudo enviar el mensaje." }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
