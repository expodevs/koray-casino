This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Create `.env` and fill in correctly

```bash
  cp .env.example .env
```

Generate Prisma Client
```bash
  npx prisma generate
```

Generate migrate
```bash
  npx prisma migrate dev --name init
```

Sync database with Prisma schema
```bash
  npx prisma db push
```

Generate require default data
```bash
  npx prisma db seed
```

---
### Run the development server:


Sync database with Prisma schema
```bash
  npx prisma db push
```

Generate require default data
```bash
  npx prisma db seed
```


Run development server, execute command: `npm run dev` or `yarn dev` or `pnpm dev` or `bun dev`
```bash
  npm run dev
```

### Build production:

Create `.env` and fill in correctly

```bash
  cp .env.example .env
```

Generate Prisma Client
```bash
  npx prisma generate
```

Apply pending migrations to the database in production/staging
```bash
   npx prisma migrate deploy
```

Generate require default data
```bash
  npx prisma db seed
```

Build files
```bash
  npm run build
```

Start production
```bash
  npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
