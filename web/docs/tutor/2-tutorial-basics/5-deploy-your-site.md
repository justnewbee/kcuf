---
title: Deploy Your Site
---

Docusaurus is a **static-site-generator** (also called **[Jamstack](https://jamstack.org/)**).

It builds your site as simple **static HTML, JavaScript and CSS files**.

## Build Your Site

Build your site **for production**:

```bash
pnpm build
```

The static files are generated in the `build` folder.

## Deploy Your Site

Test your production build locally:

```bash
pnpm serve
```

The `build` folder is now served at `http://127.0.0.1:3000`.

You can now deploy the `build` folder **almost anywhere** easily, **for free** or very small cost (read the [Deployment Guide](https://docusaurus.io/docs/deployment)).
