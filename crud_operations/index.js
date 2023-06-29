const express = require('express');
const app = express();
const fs = require('fs')

const port =3000;
app.get('/', (req, res) =>{
    res.send("Hello World");
})
app.listen(port,()=>{
    console.log('listening on port 3000');
})

app.get('/api/courses', (req, res) =>{
  res.send([1,2,3]);
})

app.post('/create_table/:games', function (req, res) {
    res.send('POST request to the homepage')
  })
app.get('/read_table/:games', (req, res) =>{
    res.sendStatus(200);
})

app.delete('/delete_table/:games', function (req, res) {
    res.sendStatus(404);
  })
  
  
app.put('/', function (req, res) {
    res.send('PUT request to homepage')
  })


const directory_name = "crud_operations/";
const file_extension = ".json";
var doesFileExistsInMiddleWare =(req,res,next) => {
 var t_name = req.params.table_name;
try {
    if (fs.existsSync(directory_name+t_name+file_extension)){
        next("route");
    }else{
        next();
    }
}catch(err){
    console.error(err);
    next("route");
}

module.exports={
    doesFileExistsInMiddleWare :doesFileExistsInMiddleWare

}
}
