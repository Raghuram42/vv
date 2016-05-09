var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var quesSchema =new Schema({
	id2:{type:Schema.Types.ObjectId,ref:'Poll'},
	//idu:{type:Schema.Types.ObjectId,ref:'User'},
	title:{type:Schema.Types.ObjectId,ref:'Poll'}
	img:{data:Buffer,contentType:String},
	Waq:{type:String},
	display:{type:Number},
    results:{type:Date},
    sdate:{type:Date},
    edate:{type:Date}  
});

module.exports=mongoose.model('Question',quesSchema);