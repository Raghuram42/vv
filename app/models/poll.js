var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var objectId=Schema.ObjectId;
var pollSchema=new Schema({
	id1:objectId;
	title:{type:String},
	category:{type:String},
	sub:{type:String},
	img:{data :Buffer,contentType:String},
	location:{type:String},
	age:{type:Number,min:6,max:80},
	id:{type:String}

});

module.exports=mongoose.model('Poll',pollSchema);
