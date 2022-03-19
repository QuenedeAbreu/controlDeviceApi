import app from './app';

// Language: typescript
// Path: src\server.ts

//incialize the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server started on port 3333!');
});