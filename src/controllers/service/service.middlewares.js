// middlewares
const validateFileRoute = (req, res, next) =>{
    let errorsPipe = []
    if(typeof req.body === 'undefined' ){
        errorsPipe.push({message: 'projectCode, serviceCode, filename fields are required'})
    }else {
        if(typeof req.body.projectCode === 'undefined'){
            errorsPipe.push({message: 'projectCode field is required'})
        }
        if(typeof req.body.serviceCode === 'undefined'){
            errorsPipe.push({message: 'serviceCode field is required'})
        }
        if(typeof req.body.filename === 'undefined'){
            errorsPipe.push({message: 'filename field is required'})
        }
    }

    if(errorsPipe.length > 0){
        res.status(400).json({message: 'required field missing', errors: errorsPipe})
    }else{
        next()
    }
}

const validateWorkspace = (req, res, next)=>{
    let errorsPipe = []
    if(typeof req.body === 'undefined' ){
        errorsPipe.push({message: 'workspace field is required'})
    }else if(typeof req.body.workspace === 'undefined'){
        errorsPipe.push({message: 'workspace field is required'})
    }

    if(errorsPipe.length > 0){
        res.status(400).json({message: 'required field missing', errors: errorsPipe})
    }else{
        next()
    }
}

module.exports = {
    validateFileRoute,
    validateWorkspace,
}