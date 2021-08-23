const express = require('express')
// const cors = require('cors')

const app = express()
app.use(cors)
// app.use(cors())


// middle ware
app.use(express.json()) 

resList = []
// task1
app.post('/tasks', (req, res)=>{
    resList.push(req.body)
    // const temp = req.body
    // res.status(201).json({temp, description: "The task successfully added"})
    res.status(201).json(req.body)
})

app.get('/tasks', (req, res)=>{
    res.status(200).json(resList)
})

app.get('/tasks/:id', (req,res)=>{
    const {id} = req.params
    // const exist = false
    resList.forEach(element => {
  
        if (element.id == id){
            // exist = true
            res.status(200).json(element)
            
        } 
    });

    // if (exist == false){
    //     res.status(404).json({description:"task not found"})
    // }

})


app.put('/tasks/:id', (req,res)=>{
    const {id} = req.params

    for (let index = 0; index < resList.length; index++) {
        const element = resList[index];
        if (element.id == id){
            resList[index] = req.body
            res.status(200).json(req.body)
        }
    }
})


app.delete('/tasks/:id', (req,res)=>{
    const {id} = req.params
    for (let index = 0; index < resList.length; index++) {
        const element = resList[index];
        if (element.id == id){
            resList.splice(index, 1)
            res.status(204).json({description: "The task successfully deleted"})
        }
    }
})

function cors(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    next()
}

app.listen(3000, () =>{
    console.log("server listening at point 3000");
})