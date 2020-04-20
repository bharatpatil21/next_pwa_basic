const express = require('express')
const next = require('next')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => {
  const server = express()
    
  server.get('/posts',(req,res) => {
    const todos = [
      {
          name:'todo1',
          id:1
      },
      {
          name:'todo2',
          id:2
      }
  ]
    res.send(JSON.stringify(todos));
  })

  server.get('*', (req, res) => {
    //here we are telling next.js to handle the request for us
    return handle(req, res);
    //res.send("frontend route");
  })
  
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})