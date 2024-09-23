//nodemon ke help se hm apne server ko automatically restart kr skte h by using nodemon filename
//(multer) hme node.js me file upload krne me madat krta h
const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer')
const { mergePdfs } = require('./merge')
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'));
const port = 3000;
const hostname = '127.0.0.1';

app.get('/', (req, res) => {
    // res.send('hello world1');
    res.sendFile(path.join(__dirname, 'template', '/index.html'));
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    console.log(req.files);
    try {
        let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
        res.redirect(`http://${hostname}:${port}/static/${d}.pdf`);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error processing your request");
    }
    // res.send({data: req.files});
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
})

app.listen(port, hostname, () => {
    console.log(`server: http://${hostname}:${port}`);
})