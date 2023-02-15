var mkdir=require('../config/mkdir')
var multer=require('multer')

//控制文件存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let url = req.body.url
        mkdir.mkdirs('../data/' + url, err => {
            console.log(err);
        })
        cb(null, './data/' + url)
    },
    filename: function (req, file, cb) {
        let name = req.body.name
        console.log(name);
        cb(null, name)
    }
})

const upload = multer({ storage: storage })

module.exports=upload