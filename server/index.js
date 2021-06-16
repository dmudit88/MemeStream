var express = require('express');
var mongoose=require('mongoose');
var cors=require('cors');

var app = express();
require("dotenv").config();

app.options('*', cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/memestream', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var CounterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);
var memeSchema= new mongoose.Schema({
    id : {type:Number},
    name : String,
    caption: String,
    url : String
});
var memeModel=new mongoose.model('memes',memeSchema);

app.get('/memes', function(req, res, next) {
    var q = memeModel.find({}).sort({'id': -1}).select('-_id').limit(100);
    q.exec(function(err, memedb) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(memedb);
    });
});
app.get('/memes/:id',(req,res) => {
    //console.log(req.params.id);
    var q = memeModel.findOne({id:req.params.id}).select('-_id');
    q.exec(function(err, memedb) {
        if(memedb){
            res.header("Access-Control-Allow-Origin", "*");
            res.send(memedb);
        }else{
            res.header("Access-Control-Allow-Origin", "*");
            res.sendStatus(404);
        }
    });
});

app.patch('/memes/:id',(req,res) => {
    //console.log(req.params.id);
    //console.log({caption: req.body.caption, url: req.body.url});
    memeModel.findOneAndUpdate({id : req.params.id},{caption: req.body.caption, url: req.body.url},(err,doc)=>{
        if(err){
            return err;
        }
        if(doc){
            res.header("Access-Control-Allow-Origin", "*");
            res.sendStatus(200);
        }else{
            res.header("Access-Control-Allow-Origin", "*");
            res.sendStatus(404);
        }
    });
});
app.post('/memes', function(req, res, next) {
    //console.log(req);
    //console.log(req.body);
    //console.log(req.body.name);
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, {upsert: true , new: true} ,function(error, counter){
        if(error)
            return next(error);
        var obj=new memeModel({
            id: counter.seq,
            name: req.body.name,
            caption: req.body.caption,
            url : req.body.url
        });
        obj.save();
        res.header("Access-Control-Allow-Origin", "*");
        res.send({
            "id": String(counter.seq)
        });
    });
});

app.listen(process.env.PORT || 8081, ()=>{
    //console.log('server running on port 8081');
});