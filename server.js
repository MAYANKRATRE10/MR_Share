const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/MR_Share');

const File = require('./models/File');

const app = express();
const upload = multer({dest:'uploads/'})

app.set('view engine','ejs');

app.route('/')
.get((req,res)=>{
    res.render('home',{data:''})
})
.post(upload.single('file'), (req,res)=>{
    // console.log(req.file);
    const fileData = {
        path:req.file.path,
        fileName:req.file.originalname,
        password:req.body.password
    }
    const newFile = new File(fileData);

    newFile.save().then(()=>{
        console.log('file saved');
        console.log(newFile);
    })
    let link =req.headers.origin+'/file/'+newFile._id;
    console.log(link)
    res.render('home',{data:link});
    // res.render('uploaded',{data:link});
})

app.get('/file/:id',async(req,res)=>{
    const file = await File.findById(req.params.id);
    res.download(file.path,file.fileName);
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server Started At Port 3000");
})