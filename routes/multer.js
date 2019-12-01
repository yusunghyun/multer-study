var express = require('express');
var router = express.Router();
var multer  = require('multer')//복붙
var path=require('path');
var fs=require('fs');
var upload = multer({ dest: path.join(__dirname,'../public/uploads') })//경로설정하는곳.
var storage = multer.diskStorage({
  destination: function (req, file, cb) {//경로는 어디로 할래?
    cb(null, getPath());
  },
  filename: function (req, file, cb) {//파일명은 뭐로 할래?
    var saveFile = getFile(file.originalname)//객체로 받을예정  originalname->1912-12333333-99.jpg
    cb(null,saveFile.savename);
  }
});//복붙
function getPath(){
  var newPath = path.join(__dirname,'../public/uploads/'+makePath()); //makePath때매 1912 붙 ㅋ
  if(!fs.existsSync(newPath)){//존재하지않다면 폴더를 만들어랏!
    fs.mkdirSync(newPath);
  }
  return newPath; //1912
};
function makePath(){
  var d = new Date();
  var year = d.getFullYear().substr(2);//19
  var month = (d.getMonth() + 1 < 10) ? "0" + (d.getMonth() + 1 ) : d.getMonth() + 1;
  return year+month;

};

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.render('multer-list', { title: 'Express' });
});

router.post('/',upload.single('img'),(req,res,next)=>{//가운데 인자는 pug form에 있던 type='text',name='img'때문
  res.send('저장되었습니다'+req.file.filename);//윗줄에서 저장된 결과가 req로 간댕!
});

module.exports = router;
