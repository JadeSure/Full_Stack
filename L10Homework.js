const express = require('express')
const app = express()

// middle ware
app.use(express.json()) 

resList = []
// task1
app.post('/task1', (req, res)=>{
    resList.push(req.body)
    // const temp = req.body
    // res.status(201).json({temp, description: "The task successfully added"})
    res.status(201).json(req.body)
})

app.get('/task2', (req, res)=>{
    res.status(200).json(resList)
})

app.get('/task3', (req,res)=>{
    const {id} = req.query
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


app.put('/task4/:id', (req,res)=>{
    const {id} = req.params

    for (let index = 0; index < resList.length; index++) {
        const element = resList[index];
        if (element.id == id){
            resList[index] = req.body
            res.status(200).json(req.body)
        }
    }
})


app.delete('/task5/:id', (req,res)=>{
    const {id} = req.params
    for (let index = 0; index < resList.length; index++) {
        const element = resList[index];
        if (element.id == id){
            resList.splice(index, 1)
            res.status(204).json({description: "The task successfully deleted"})
        }
    }
})

app.listen(3000, () =>{
    console.log("server listening at point 3000");
})