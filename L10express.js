const express = require('express')
const app = express()

// middle ware
app.use(express.json()) // convert json body to js object and assign and assign it to req.body

// application.method(path, route handler => callback)
// app.get('/', function(req, res){
//     // req: 与请求的相关信息，eg. route, content of body, 
//     // res.send('Hello World')
//     res.json([])
// })

// get data from request
//1. req.body(require app.use(express.json())) => post, put, patch -> create or update
// 2. req.params(route param) -> get, put, patch, delete -> mostly id
// 3. req.query -> get -> filtering
app.post('/', (req, res)=>{
    // res.json(req.body)

    // localhost:3000/shawn?title=shuo
    const{name} = req.params
    const{title} = req.query

    // respond
    // res.json -> 200
    // res.send -> 200
    // res.sendStatus(201) -> 201
    // res.status(201).json([]) -> [], 201
    // res.status(401).json(error:"invalid input")
    res.json({name,title})
})
//

// app.put('/student/:id', (req, res)=>{
//     const{id} = req.params;
// })

// app.delete('/student/:id', (req, res)=>{
//     const{id} = req.params;
// })


app.listen(3000, () =>{
    console.log("server listening at point 3000");
})