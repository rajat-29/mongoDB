var express = require('express')
var path = require('path') 
var app = express()
var session = require('express-session');
//Acces static files
app.use(express.static(path.join(__dirname, 'public')));

//Bodyparser
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(session({secret: "xYzUCAchitkara"}));
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

// Schema for product
var productSchema = new mongoose.Schema({
    productName: String
  })

var product =  mongoose.model('Products', productSchema);

// Add in db
app.post('/addProduct',function (req, res) {
  console.log(req.body);
  let newProduct = new product({
    productName: req.body.name 
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
      },{'productName': 1})
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
    console.log(req.body);
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
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})

app.post('/deleteProduct',function(req,res){
    console.log(req.body);
    product.findOneAndDelete(
      {
        productName: req.body.name
      })
    .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})

// app.use('/login', function(req, res, next){
//   if(req.session.isLogin){
//     console.log("Already loggedIn")
//  } else {
//    //Ask for id password 
//    req.session.isLogin = 1;
//    console.log("login set by middleware")
//     res.send("Welcome");
//  }  
//   next();
// });

// var middleFunc = function(req, res, next){
//     if(req.session.isLogin){
//       console.log("Already loggedIn")
//    } else {
//      //Ask for id password 
//      req.session.isLogin = 1;
//      console.log("login set by middleware")
//       res.send("Welcome");
//    }  
//     next();
//   }

var middleFunc = function(req, res, next){
  if(req.session.isLogin){
    console.log("Already loggedIn")
 } else {
   //Ask for id password 
   req.session.isLogin = 1;
   console.log("login set by middleware")
    res.send("Welcome");
 }  
  //next();
}
//app.post('/login',middleFunc,function(req,res){
app.post('/login',function(req,res){
  if(req.session.isLogin){
    //proceed 
    res.send("Thankyou");
 } else {
   //Ask for id password 
   req.session.isLogin = 1;
   req.session.userId = req.body.userId ;
   req.session.name = req.body.name;
    res.send("Welcome");
 }  
  
})


  
app.listen(3225)