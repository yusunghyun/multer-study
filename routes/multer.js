var express = require('express');
var router = express.Router();
var {upload} = require('../modules/multer-conn.js');

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.render('multer-list', { title: 'Express' });
});

router.post('/',upload.single('img'),(req,res,next)=>{//가운데 인자는 pug form에 있던 type='text',name='img'때문
  if(req.file) res.send('저장되었습니다'+req.file.filename);//윗줄에서 저장된 결과가 req로 간댕!
  else res.send("파일을 저장하지 못했습니다.");
});

module.exports = router;
