const express = require('express') //importing the express
const app = express() //calling the express function and storing it in a variable
const port = 3000 //assigning a port to it
const fs = require('fs') // importing fs
var bodyParser = require("body-parser"); //importing body parser, body-parser is which allows express to read the body and then parse that into a Json object that we can understand
app.use(bodyParser.json());
const midFun = require('./middlewareFun')

// The app.listen() function is used to bind and listen the connections on the
// specified host and port.
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

function CreateTable(req, res, next) {
    if (fs.existsSync('./database/' + req.params.table_name + '.json')) {
        res.end("Table already exists")
        next('route')
    } else {
        next()
        // res.end()
    }

}
function CreateRecordInTable(req, res, next) {
    if (fs.existsSync('./database/' + req.params.table_name + '.json')) {
        next()
    } else {
        res.end("Table does not exists")
        // next('route')

    }

}

app.post('/create_table/:table_name', CreateTable, (req, res) => {
    let table_name = req.params.table_name
    let data = '[]'
    fs.writeFile('./database/' + table_name + '.json', data, (err) => { //writing the new data from postman and appending it with existing data in file
        if (err) 
            console.log(err);
        else {
            console.log("table written successfully\n");
            res.end(data);
        }
    });
});

app.post('/create_record/:table_name', CreateRecordInTable, (req, res) => {
    let table_name = req.params.table_name

    fs.readFile('./database/' + table_name + '.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        data.push(req.body)
        data = JSON.stringify(data)
        fs.writeFile('./database/' + table_name + '.json', data, (err) => { //writing the new data from postman and appending it with existing data in file
            if (err) 
                console.log(err);
            else {
                console.log("table written successfully\n");
                res.end(data);
            }
        });
    });

});

