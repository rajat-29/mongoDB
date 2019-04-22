var express = require('express')
var path = require('path') 
var app = express()
app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

app.post('/test',function (req, res) {
  console.log(req.body);
  res.send(req.body)
})

app.get('/test',function(req,res){
    res.send('hello');
})
app.listen(8000)