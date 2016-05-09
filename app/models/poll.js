var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var pollSchema=new Schema({
	id1:{type:Schema.Types.ObjectId,ref:'User'},
	title:{type:String},
	category:{type:String},
	sub:{type:String},
	img:{data :Buffer,contentType:String},
	location:{type:String},
	age:{type:Number,min:6,max:80},
	idd:{type:String},
    entity:{type:String},
    marital:{type:String},
    sdate:{type:Date},
    edate:{type:Date}
});

module.exports=mongoose.model('Poll',pollSchema);
