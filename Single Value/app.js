var express = require('express')
var path = require('path') 
var app = express()


//Acces static files
app.use(express.static(path.join(__dirname, 'public')));

//Bodyparser
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

//Connect with db
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/myDB';

mongoose.set('useFindAndModify', false);

mongoose.connect(mongoDB,{ useNewUrlParser: true});


mongoose.connection.on('error', (err) => {
    console.log('DB connection Error');
});

mongoose.connection.on('connected', (err) => {
    console.log('DB connected');
});

var productSchema = new mongoose.Schema({
    productName: String,
    productPrice: String,
  })

var product =  mongoose.model('Product', productSchema);

// Add in db
app.post('/addProduct',function (req,res) {
  //console.log(req.body);
//  console.log(req1.body);
  let newProduct = new product(
  {
  		productPrice: req.body.price
  })
  newProduct.save()
   .then(data => {
    console.log(data)
     res.send(data)
   })
   .catch(err => {
     console.error(err)
     res.send(error)
   })
  
})

//Get from DB
  app.get('/products',function(req,res){
      product.find({
           // search query
           //productName: 'mlbTvrndc'  
      },{})
      .then(data => {
         console.log(data)
          res.send(data)
        })
        .catch(err => {
          console.error(err)
          res.send(error)
        })
  })


//
app.put('/updateProduct',function(req,res){
    //console.log(req.body);
    product.findOneAndUpdate(
    {
        productName: req.body.name  // search query
    }, 
    {
      productName: req.body.nameNew   // field:values to update
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(data => {
       // console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})

app.post('/deleteProduct',function(req,res){
    //console.log(req.body);
    product.findOneAndDelete(
      {
        productName: req.body.name
      })
    .then(data => {
       // console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})

app.get('/test',function(req,res){
    res.send('hello');
})
app.listen(8000)