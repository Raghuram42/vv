var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var quesSchema =new Schema({
	id2:{type:Schema.Types.ObjectId,ref:'Poll'},
	//idu:{type:Schema.Types.ObjectId,ref:'User'},
	title:{type: String},
	img2:{data:Buffer,contentType:String},
	Waq:{type:String},
	display:{type:Number},
    results:{type:Date},
    sdate:{type:Date},
    edate:{type:Date}  
});

module.exports=mongoose.model('Question',quesSchema);