const glob = require("glob");
const path = require("path");
const fs = require("fs");

class LogController {
    static index = async (req, res) => {
        const {l, download, clean, del, delall} = req.query
        const fileList = await (new this).getFileList()
        const status = {
            Error: {icon:'exclamation-triangle',text:'text-danger'},
            Info: {icon:'info-circle',text:'text-info'},
            Critical: {icon:'exclamation-triangle',text:'text-danger'},
            Debug: {icon:'exclamation-triangle',text:'text-danger'},
            Warning: {icon:'exclamation-triangle',text:'text-danger'}
        }
        var fileData = []
        try {
            if(l){
                fileData = fs.readFileSync(path.join(__dirname, `../../logs/${Buffer.from(l, 'base64').toString('ascii')}`)).toString()
            } else if(fileList.length > 0){
                fileData = fs.readFileSync(path.join(__dirname, `../../logs/${fileList[0]}`)).toString()
            }
            // fileData = fileData.split(/\r?\n(?!\ )/)
            if(fileData && fileData.length){
                fileData = fileData.split(/\n#/)
            }
        }catch (err){
            global.next(err)
            fileData = []
        }
        return res.render(path.join(__dirname, './logViewer.ejs'),{
            layout: false,
            fileList: fileList.sort().reverse(),
            fileData: fileData,
            status : status
        })
    }

    getFileList = async () => {
        const dir = path.join('logs')
        return new Promise(async (resolve, reject) => {
            const files = fs.readdirSync(dir);
            var targetFiles = files.filter(function(file) {
                return path.extname(file).toLowerCase() === '.log';
            });

            resolve(targetFiles)
        })
    }

    deleteFile = async (file) => {

    }

    deleteAllFile = async () => {

    }

    cleanFile = async (file) => {

    }

    downloadFile = async (file) => {

    }
}
module.exports = LogController
