import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import fastifyEnv from '@fastify/env';
import configEnvOptions from './plugins/env';
import { patientRoutes } from './routes/Patient.Routes';
import { userRoutes } from './routes/User.Routes';
import { addressRoutes } from './routes/Address.Routes';

const app = fastify();

app.register(jwt, {
  secret: 'development-challenge-nine',
});

app.register(cors);
app.register(fastifyEnv, configEnvOptions);

app.register(patientRoutes, { prefix: '/patient' });
app.register(userRoutes, { prefix: '/user' });
app.register(addressRoutes, { prefix: '/address' });

export default app;
