export default(req,res) => {

        const {
            query: { id },
          } = req
    
        const todos = [
            {
                name:'todo1',
                id:id
            },
            {
                name:'todo2',
                id:id
            }
        ]

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(todos))
      
}