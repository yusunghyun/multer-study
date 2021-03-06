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

var allowExt = ['.jpg','.png','.jpeg','.gif','.zip','.pdf']//허용 선 수기 입력
var chkFile = (req,file,cb) => {//업로드하기 전 필터 작업
  var ext = path.extname(file.originalname).toLowerCase(); //file.originalname은 원래 있는거 !
  if(allowExt.indexOf(ext) !== -1){
    req.isFileValidate = true;// isFileValidate는 작명ㅋㅋㅋ 나중에 누가 이름만 적고 파일을 스킵했을때 저장x라고 뜨니까 이거 만들어서 구분용!!!!!
    cb(null,true);
  }
  else{
    req.isFileValidate = false;
    cb(null,false);
  }
};

var upload = multer({storage:storage, fileFilter : chkFile })//경로설정하는곳.

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

module.exports = {upload};