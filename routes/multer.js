var express = require('express');
var router = express.Router();
var {upload} = require('../modules/multer-conn.js');

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.render('multer-list', { title: 'Express' });
});

router.post('/',upload.single('img'),(req,res,next)=>{//가운데 인자는 pug form에 있던 type='text',name='img'때문
  if(req.isFileValidate) res.json(req.file);//윗줄에서 저장된 결과가 req로 간댕! 이름만적고 그냥 저장하면 저장x라고 뜸.
  else res.send("업로드를 할 수 없는 파일입니당!");
});

module.exports = router;
