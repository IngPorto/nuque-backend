const fs = require('fs')
const path = require('path')
const rootRoute = path.join(__dirname, '/../../..')

const getService = (req, res) => {
    try {
        const server = require('express')()
        const ruta_servicio = rootRoute + '/users_services/' + req.params.proyecto + "/" + req.params.servicio + "/" + req.params.servicio + ".js"
        delete require.cache[require.resolve(ruta_servicio)]    
        res.status(200)
        res.end(require(ruta_servicio)(req, res, server))
    } catch (error) {
        res.status(500).jsonp({message:'Error launching the user service', status:'error', error: error})
    }
}

const loadService = (req, res) => {
    var dir = rootRoute + '/users_services/' + req.body.projectCode + '/' + req.body.serviceCode;
    var dir_complete = dir + "/" + req.body.filename
    
    if (fs.existsSync(dir_complete)){
        fs.readFile(dir_complete, (err, data) => {
            if (err) {
                res.status(400);
                console.log(err);
                res.end();
            }
            res.status(200).jsonp({ workspace: data.toString() })
            res.end();
        });
    }else {
        res.jsonp({ workspace: "No se encontró un archivo previamente guardado." }).end();
    }
}

const createServiceDirectory = (req, res) => {
    var dir = rootRoute + '/users_services/' + req.body.projectCode + '/' + req.body.serviceCode;
    var dir_complete = dir + "/" + req.body.filename

    if (!fs.existsSync(dir)){
        fs.mkdir( dir, { "recursive": true }, err => {
            if (err) {
                res.status(400)
                console.log(err);
                res.end();
            }
            console.log("Directorio del servicio creado:: " + dir);
            
            fs.writeFile( dir_complete, "<xml xmlns=\"http://www.w3.org/1999/xhtml\"></xml>" , (err) => {
                if (err) {
                    res.status(400)
                    console.log(err);
                    res.end();
                }
                console.log("Servicio vacío creado:: " + dir_complete);
                res.status(200)
                res.end();
            });
        });
    }else {
        res.status(200)
        res.end();
    }
}

const saveService = (req, res) => {
    var dir = rootRoute + '/users_services/' + req.body.projectCode + '/' + req.body.serviceCode;
    var dir_complete = dir + "/" + req.body.filename

    fs.writeFile( dir_complete , req.body.workspace, (err) => {
        if (err) {
            res.status(400)
            console.log(err);
            res.end();
        }
        console.log("Servicio actualizado :: " + dir_complete );
        res.status(200)
        res.end();
    });
}

/**
 * Microservicio para guardar la versión .js del proyecto
 */
const deployService = (req, res) => {
    var dir = rootRoute + '/users_services/' + req.body.projectCode + '/' + req.body.serviceCode;
    var dir_complete = dir + "/" + req.body.filename

    var data = "var service = function (req, res, server) { \n"
    data += req.body.workspace
    data += "\n }; \n module.exports = service;"

    fs.writeFile( dir_complete , data, (err) => {
        if (err) {
            res.status(400)
            console.log(err);
            res.end();
        }
        console.log("Servicio construido y desplegado:: " + dir_complete );
        res.status(200)
        res.end();
    });
}

module.exports = {
    getService,
    loadService,
    createServiceDirectory,
    saveService,
    deployService,
}