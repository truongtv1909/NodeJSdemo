var http = require('http');
http.createServer(function (req, res) {
   res.end('<h1>CLGT</h1> <button>add</button>',
   '<input type ="text">');

}).listen(4000,console.log('sv start is port:',4000));

app .put("/:id",function (req,res) {
   var newUser = req.body;
   UserModel.update({_id:newUser._id},{$set:newUser},function (err,docs) {
     if(err){
       console.log("some error occurred in update");
     }else{
       console.log("update user",docs);
       res.status(200).json(newUser);
     }
   });
 });

 function(req,res){
   var newUser = req.body;
   UserModel.update({_id:newUser._id},{$set:newUser},function (err,docs) {
     if(err){
       console.log("some error occurred in update");
     }else{
       console.log("update user",docs);
       res.status(200).json(newUser);
     }
   });
 }