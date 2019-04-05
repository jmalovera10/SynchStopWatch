const mongoose = require('mongoose');
const randomstring = require('randomstring');

mongoose.connect(process.env.MLAB_URL)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch(err => {
        console.log(err);
        console.log('MongoDB Not Connected');
    });
let Schema = mongoose.Schema;
let StopWatchSchema = new Schema({
    code: String,
    offset: Number,
    startTime: Number,
    isStarted: Boolean
});
let StopWatch = mongoose.model('StopWatch', StopWatchSchema);


exports.getCode = (req, res) => {
    let code = randomstring.generate({
        length: 10,
        charset: 'alphabetic'
    });
    let config = {
        code: code,
        offset: 0,
        startTime: undefined,
        isStarted: false
    };
    let instance = new StopWatch(config);
    instance.save((err)=>{
        if(err){
            return res.status(500);
        }
        return res.status(200).json({
            message: 'Obtained successfuly!',
            data: config
        });
    });
};

exports.getInfo = (req, res) => {
    let code = req.params.code;
    StopWatch.find({'code': code}, (err, stWatch) => {
        if (err) {
            return res.status(500);
        }
        return res.status(200).json(stWatch);
    });
};