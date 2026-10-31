# Videas IA — Demo Astro

Reconstrucción fiel (diseño, contenido y estructura) de la web de [Videas IA](https://videas-ia.com) como
proyecto **Astro + TypeScript + Tailwind CSS**, pensada como pieza de portfolio para mostrar una
migración real desde una SPA (React/Vite) a Astro, con foco en **responsive design** y buenas
prácticas de estructura de proyecto.

> Nota de alcance: el sitio original combina esta landing comercial con un Portal de Facturación
> VERI\*FACTU (una app de gestión real). Esta demo reconstruye únicamente la landing — Header, Hero,
> Soluciones Digitales, Contacto y Footer — con todo el contenido, textos y colores reales del sitio.
> La sección de contacto añade además un formulario funcional que no existe en el sitio original
> (que solo enlazaba al portal de clientes), para cumplir el objetivo de la demo de mostrar un
> formulario de contacto real.

## Stack

- [Astro](https://astro.build) 7 + TypeScript (modo `strict`)
- [Tailwind CSS](https://tailwindcss.com) v4 (config CSS-first, sin `tailwind.config.js`)
- [@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) — adapter para desplegar en Cloudflare Pages/Workers
- Formulario de contacto funcional vía endpoint `/api/contact`, con envío de email por [Resend](https://resend.com) (con fallback a modo demo si no hay API key configurada)

## Estructura del proyecto

```
src/
├── components/       # Header, Hero, Soluciones, SolutionCard, Contacto, Footer
├── data/              # Datos tipados: datos de empresa (site.ts) y soluciones (solutions.ts)
├── layouts/           # Layout.astro — <head>, fuentes, Header/Footer comunes
├── pages/
│   ├── index.astro    # Página principal (prerenderizada como HTML estático)
│   └── api/
│       └── contact.ts # Endpoint on-demand (SSR) que procesa el formulario de contacto
└── styles/
    └── global.css      # Tailwind + theme (fuente, utilidad bg-brand-gradient)
```

El sitio es **estático por defecto** (todas las páginas se generan en build time) excepto el
endpoint `/api/contact`, que se renderiza on-demand en el Worker de Cloudflare gracias al adapter.

## Desarrollo local

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`.

### Formulario de contacto en local

Por defecto, si no hay `RESEND_API_KEY` configurada, el endpoint `/api/contact` responde en
**modo demo**: valida los datos y registra el intento en consola, pero no envía ningún email. Así
puedes probar el formulario de inmediato sin configurar nada.

Para probar el envío real de emails en local:

1. Crea una cuenta en [resend.com](https://resend.com) y genera una API key.
2. Copia `.dev.vars.example` a `.dev.vars` y sustituye el valor:
   ```bash
   cp .dev.vars.example .dev.vars
   ```
3. Reinicia `npm run dev`.

`.dev.vars` está en `.gitignore` y nunca debe subirse al repositorio.

## Build de producción

```bash
npm run build
npm run preview   # sirve el build localmente con el runtime de Cloudflare (wrangler)
```

## Despliegue en Cloudflare Pages

1. Sube el repositorio a GitHub/GitLab.
2. En el dashboard de Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**.
3. Framework preset: **Astro**. Build command: `npm run build`. Output directory: `dist`.
4. En **Settings → Environment Variables** (o `wrangler secret put RESEND_API_KEY` si despliegas
   como Worker con Wrangler), añade `RESEND_API_KEY` con tu clave de Resend para producción.
5. Despliega. Cada push a la rama principal generará un nuevo deploy automático.

Alternativa por CLI, sin conectar Git:

```bash
npm run build
npx wrangler deploy
```

## Notas de fidelidad al sitio original

Todo el contenido textual (textos de hero, las tres soluciones — CitasSalud, Asesoría AI Core,
Informes periciales —, datos de empresa, colores de marca y tipografía Inter) se extrajo
directamente del bundle de producción de videas-ia.com para que el contenido fuera real y no
inventado, tal y como pediste. Los únicos añadidos sobre el original son:

- El formulario de contacto funcional (el original solo enlazaba al Portal de Facturación).
- Los botones "Hablemos" / "Contactar" del header y hero, que en el original llevaban a
  `/facturacion` (una app que no forma parte de esta demo).
