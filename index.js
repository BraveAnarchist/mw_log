import express from "express"

const app=express();
const port=8888;
const host='127.0.0.1';
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const loggingMiddleware = (req, res, next) => {
    const start = Date.now();
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  
    const originalEnd = res.end;
    res.end = function (...args) {
      const duration = Date.now() - start;
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${duration}ms \n  HTTP method:${req.method}  \n URL:${req.originalUrl}`);
      originalEnd.apply(res, args); 
      
    };
    next();
    
    }
    app.use(loggingMiddleware);
    app.get('/', (req, res) => {
        res.send('Hello World!');
      });
      
      app.get('/about', (req, res) => {
        res.send('About Page');
      });
app.listen(port,host,()=>{
    console.log(`Server started at http://${host}:${port}`);
});