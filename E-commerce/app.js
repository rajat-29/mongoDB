  var express = require('express')
  var path = require('path')
  var app = express()

  app.use(express.static(path.join(__dirname,'public')))

  app.use(express.urlencoded({extended: true}))
  app.use(express.json())

  var mongoose = require('mongoose');
  var mongoDB = 'mongodb://localhost/meraDB';

  mongoose.connect(mongoDB);

  mongoose.connection.on('error',(err) => {
    console.log('DB connection Error');
  })

  mongoose.connection.on('connected',(err) => {
    console.log('DB connected');
  })

  var productSchema = new mongoose.Schema({
    Name: String,
    Desc: String,
    Price: Number,
    Quantity: Number,
  })

  var product = mongoose.model('Product', productSchema);

  app.post('/:pro',function (req, res)
  {
      console.log(req.body);
      product.create(req.body,function(error,result)
      {
        if(error)
        throw error;
        else
        {
          console.log(result);
        }
      })

       res.send("data has been saved");
  })

  //Get from DB
  app.get('/:pro',function(req,res)
  {
      var data = product.find({}).exec(function(error,result)
      {
        if(error)
        throw error;
        else
        res.send(JSON.stringify(result))
      });
  })

  app.put('/:pro',function(req,res)
  {
    /*
        console.log(req.body)
        console.log(req.params.pro)*/
        var id =  req.params.pro.toString()
        console.log(id)
        product.updateOne( { "_id" : id, $set : req.body.text } , function(err,result)
        {
          if(err)
          throw err
          else
          {
            res.send("DATA UPDATED SUCCESFULLY")
          }
        })

  })

  app.delete('/:pro',function(req,res)
  {
      var id = req.params.pro.toString();
      console.log(id);
      product.deleteOne({ "_id": id },function(err,result)
      {
          if(err)
          throw error
          else
          {
            console.log(result);
              res.send("data deleted SUCCESFULLY")
          }
      });
  })

//  app.get('/hello',function(req,res){
//    res.send('hello');
//})

  console.log("Running on port 3000");
  app.listen(8000)
