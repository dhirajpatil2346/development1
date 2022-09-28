let http = require('http');
var formidable = require('formidable');
let fs = require('fs');
http.createServer(function(req, res)
{
    if(req.url == '/fileupload')
    {
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files)
        {
            let oldpath = files.filetoupload.filepath;
            let newpath = '/home/dhirajpatil2346/development/nodeJS w3schools/filesaver/' + files.filetoupload.originalFilename;
            fs.rename(oldpath, newpath, function(err)
            {
                if(err)
                {
                    throw err;
                }
                else
                {
                    res.write('fileUploaded successfully and moved!');
                    res.end();
                }
            })
            res.write('File uploaded');
            res.end();
        });
    }
    else{
    res.writeHead(200, {'content-type' : 'text/html'});
    res.write('<form action="fileupload" mothod="post" enctype="multipart/form-data">')
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    res.end();
    }
}).listen(3000);