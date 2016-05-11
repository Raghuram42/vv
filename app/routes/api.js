var User=require('../models/user');
var config=require('../../config');

var Poll=require('../models/poll');

num=0;
var secretKey=config.secretKey;
 
var jsonwebtoken=require('jsonwebtoken');



function createToken(user){
   
   var token = jsonwebtoken.sign({
   	id: user._id,
   	name: user.name,
   	username: user.username
   },secretKey,{
          expiresIn: 1440
   });

   return token;

}

module.exports =function(app,express){


var api=express.Router();

api.post('/signup',function(req,res){
	var user=new User({
		name:req.body.name,
		username:req.body.username,
		password:req.body.password
	});
	user.save(function(err){
		if(err){
			res.send(err);
			return;
		}
		res.json({message: 'User has been created'});
	});
});

api.get('/users',function(req,res){
	User.find({},function(err,users){
		if(err){
			res.send(err);
		}
		res.json(users);
	});
});

api.post('/login',function(req,res){
  
  User.findOne({
  	   username: req.body.username
  }).select('password').exec(function(err,user){
  	
  	if(err) throw err;

  	if(!user){

  		res.send({message:"Use doesnt exist"});
  	} else if(user){
          var validPassword=user.comparePassword(req.body.password);
  	  if(!validPassword){
  		res.send({message:"Invalid password"});
  	} else {
               var token= createToken(user);

               res.json({success:true,
			   message:"You r logged and create a poll",
			   token:token});
                 	}
  }
  });
});

api.get('/login',function(req,res){
    res.sendFile(__dirname +'../../public/home.html');

});

api.use(function(req,res,next){
     console.log('Lets start Middleware');
     var token=req.body.token || req.param('token') || req.headers['x-access-token'];

     if(token){

     	jsonwebtoken.verify(token,secretKey, function(err,decoded){

     		if(err){
     			res.status(403).send({ success : false, message: "Failed to authenticate user"});
     		} else{
     			req.decoded=decoded;
     			
     			next();

     		}
     	});
     } else {

     	res.status(403).send({success:false,message:"No token provided"});

     }

});

api.route('/poll')
 
  .post(function(req,res){
      
    var poll =new Poll({
      id1:req.decoded.id,
	  _id:ObjectId(),
      title:req.body.title,
      categeory:req.body.categeory,
      sub:req.body.sub,
      img:req.body.img,
      location:req.body.location,
      age:req.body.age,
      idd:req.body.idd,
      entity:req.body.entity,
      marital:req.body.marital,
      sdate:new Date(),
      edate:new Date()
    });
    poll.save(function(err){
      if(err){
        res.send(err);
        return;
      }
        num=1;
      res.json({message:"New Poll is Created!"});
    });
  })

  .get(function(req,res){


    Poll.find({id1:req.decoded.id},function(err,polls){

      if(err){
        res.send(err);
        return;
      }
      res.send(polls);
    });
  });

  api.get('/me',function(req,res){
    res.json(req.decoded);
  })

api.route('/ques')

  .post(function(req,res){

    var  ques=new Ques({
      title:req.body.title,
      img2:req.body.img,
      Waq:req.body.Waq,
      display:req.body.display,
      results:new Date(),
      sdate:Date(),
      edate:Date()
    });

  if(Poll.find({title})===Ques.find({title})){
     ques.save(function(err){
      if(err){
        res.send(err);
        return;
      }
        
      res.json({message:"New Question is Created!"});
    });
}

})


  .get(function(req,res){

    Ques.find({id2:req.id1},function(err,questions){

      if(err){
        res.send(err);
        return;
      }
      res.send(questions);
    });
  });
return api;
}
   


