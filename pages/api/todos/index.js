export default(req,res) => {
if(req.method === "PUT"){
    
}
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

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(todos))
  
}