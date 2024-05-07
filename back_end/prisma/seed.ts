import { prisma } from '../src/lib/prisma';

async function main() {
  const cidades = [
    { name: 'Ponta Grossa', state: 'Paraná' },
    { name: 'São Paulo', state: 'São Paulo' },
    { name: 'Rio de Janeiro', state: 'Rio de Janeiro' },
    { name: 'Belo Horizonte', state: 'Minas Gerais' },
    { name: 'Porto Alegre', state: 'Rio Grande do Sul' },
    { name: 'Salvador', state: 'Bahia' },
    { name: 'Recife', state: 'Pernambuco' },
    { name: 'Fortaleza', state: 'Ceará' },
    { name: 'Brasília', state: 'Distrito Federal' },
    { name: 'Manaus', state: 'Amazonas' },
  ];

  const distritos = [
    'Distrito 1',
    'Distrito 2',
    'Distrito 3',
    'Distrito 4',
    'Distrito 5',
    'Distrito 6',
    'Distrito 7',
    'Distrito 8',
    'Distrito 9',
    'Distrito 10',
  ];

  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    console.log({ error });
  }

  const country = await prisma.country.create({ data: { name: 'Brasil' } });

  for (const cidade of cidades) {
    let city = await prisma.city.create({
      data: {
        name: cidade.name,
        state: {
          create: {
            name: cidade.state,
            country: {
              connect: country
            },
          },
        },
      },
    });
    
    for (const distrito of distritos) {
      await prisma.district.create({
        data: {
          name: distrito,
          city: {
            connect: {
              id: city.id,
            },
          },
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
