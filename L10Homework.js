const express = require('express')
// const cors = require('cors')

const app = express()
app.use(cors)
// app.use(cors())


// middle ware
// covert json to js object
app.use(express.json()) 

resList = []
const generateId = generateID()
const getItemID = () => generateId.next().value


// task1
app.post('/tasks', (req, res)=>{
    const {description} = req.body
  
    if(! description){
        return res.status(400).json("descriptionn is missing")
    }

    const task = {id : getItemID(), description, done: false}
    resList.push(task)
    // const temp = req.body
    // res.status(201).json({temp, description: "The task successfully added"})
    return res.status(201).json(task)
})

app.get('/tasks', (req, res)=>{

    const {description} = req.query
    if(description===undefined){
        return res.status(200).json(resList)
    }
  
    // resList.forEach(element =>{
    //     if(element.description.includes(description)){

    //         return res.json(element)
    //     }else{
    //         return res.status(400).json('cannot delete this ID')
    //     }
        
    // })
    const filtered = resList.filter(element => element.description.includes(description))
    return res.json(filtered)
})



app.get('/tasks/:id', (req,res)=>{
    const {id} = req.params
 

    // resList.forEach(element => {
        
    //     if (element.id === parseInt(id)){
    //         // exist = true
    //         task = element
    //         return res.status(200).json(task)
    //     }else{
    //         return res.status(400).json('cannot find this ID')
    //     }
        
    // });
    const task = resList.find(item => item.id === parseInt(id));
    if(!task){
        return res.status(404)
    }

    return res.json(task)
})


app.put('/tasks/:id', (req,res)=>{
    const {id} = req.params
    const {done, description} = req.body

    // for (let index = 0; index < resList.length; index++) {
    //     const element = resList[index];
    //     if (element.id == id){
            
    //         resList[index] = {id:parseInt(id), description, done:true}
    //         return res.status(200).json(req.body)
    //     }
    // }

    const task = resList.find(item => item.id === parseInt(id))
    if(!task){
        return res.status(400).json('cannot find this ID')
    }
    if(done !== undefined){
        // force convert it to boolean
        task.done = !!done
    }
    if(description){
        task.description = description
    }

    return res.json(task)
})


app.delete('/tasks/:id', (req,res)=>{
   
    const {id} = req.params
  
    // method 1
    // let num =-1;
    // resList.forEach((item, index)=>{
    //     if (item.id === parseInt(id)){
    //         num = index
    //     }
    // })
    // // console.log(num);
    // if(num !== -1){
    //     resList.splice(num, 1)

    //     return res.status(204).json( "The task successfully deleted")
    // }else{
    //     return res.status(400).json('cannot delete this ID')
    // }


    // method 2
    // console.log('list',resList);
    const index = resList.findIndex((item) =>{
        return item.id === parseInt(id)
    })
    // console.log('index',index);
    if (index===-1){
        return res.status(400)
    }

    const [task]= resList.splice(index, 1)
    return res.status(204).json( "The task successfully deleted")
    // return res.json(task)
    
})

function cors(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    next()
}

function* generateID(){
    let id = 1
    while(true) {
        yield id++
    }
}

app.listen(3000, () =>{
    console.log("server listening at point 3000");
})


