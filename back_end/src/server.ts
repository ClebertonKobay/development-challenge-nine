import app from './app'

app.ready(async () => {
  app.listen(
    {
      port: app.config.PORT,
    },
    (error, address) => {
      if (error) {
        console.error(error);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    }
  );
});
