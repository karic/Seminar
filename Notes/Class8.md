Adding middlewares for cookies and authorization
``` app.use(auth(`x-auth`,[`root`]));```

Authorization on a single place and a array of public routes in authorize instead of hardcoded