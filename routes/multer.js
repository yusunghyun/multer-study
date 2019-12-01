var express = require('express');
var router = express.Router();
var multer  = require('multer')//복붙
var path=require('path');
var fs=require('fs');
var storage = multer.diskStorage({//통만들기
  destination: function (req, file, cb) {//경로는 어디로 할래?
    cb(null, getPath());
  },
  filename: function (req, file, cb) {//파일명은 뭐로 할래?
    var saveFile = getFile(file.originalname)//객체로 받을예정  originalname->1912-12333333-99.jpg
    cb(null,saveFile.filename);
  }
});//복붙

var upload = multer({storage:storage })//경로설정하는곳.

function getPath(){
  var newPath = path.join(__dirname,'../public/uploads/'+makePath()); //makePath때매 1912 붙 ㅋ
  if(!fs.existsSync(newPath)){//존재하지않다면 폴더를 만들어랏!
    fs.mkdirSync(newPath);
  }
  return newPath; //1912라는 폴더를 만들어라! 1912는 makePath에서 만듬!
};
function makePath(){
  var d = new Date();
  var year = String(d.getFullYear()).substr(2);//19
  var month = (d.getMonth() + 1 < 10) ? "0" + (d.getMonth() + 1 ) : d.getMonth() + 1;
  return year+month;
};

function getFile(oriFile){
  //만약 oriFile = "sample.jpg"면 ext에 .jpg fName에 sample
  var ext = path.extname(oriFile); //확장자! ex)  .jpg
  var fname = path.basename(oriFile,ext);
  var f1 = makePath();//1912가 드감
  var f2 = Date.now();//타임스탬프값이 드감
  var f3 = Math.floor(Math.random() * 90 + 10) // 00~99
  var filename = f1 + '-' + f2 + '-' + f3 + ext;
  return {oriFile,ext,fname,filename};
}

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.render('multer-list', { title: 'Express' });
});

router.post('/',upload.single('img'),(req,res,next)=>{//가운데 인자는 pug form에 있던 type='text',name='img'때문
  res.send('저장되었습니다'+req.file.filename);//윗줄에서 저장된 결과가 req로 간댕!
});

module.exports = router;
