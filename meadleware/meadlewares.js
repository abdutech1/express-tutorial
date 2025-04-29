// Application-level middleware that logs every request
const loggerMeadleware = (req,res,next) => {
  console.log(`Request received at: ${new Date().toLocaleString()} - ${req.method} ${req.url}`);
  next();
  
}


// Router-level middleware specific to /api/users routes

const usersMeadleware = (req,res,next) => {
  console.log('The route /api/users visited');
  next()
}

//Authentication Middleware

const authenticateMeadleware = (req,res,next) => {
  const authHeader = req.headers.authenticate
  if(authHeader === 'Bearer mysecrettoken'){
    req.user = { id: 1, username: 'authenticatedUser',role:'admin' };
    next()
  }else{
    res.status(401).send('Unauthorized');
  }
}

//Authorization Middleware (Route-specific Middleware)

const authorizeMeadleware = (role) => {
  return (req,res,next) => {
    if(req.user && req.user.role === role){
      next()
    }else{
      res.status(403).send('Forbidden');
    }
  }
}

export {loggerMeadleware,usersMeadleware,authenticateMeadleware,authorizeMeadleware}