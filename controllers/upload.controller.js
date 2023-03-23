exports.uploadImage = (req,res,next)=>{
    if(!req.file){
        res.status(417).json({messageError:"You need to upload a file"})
        return;
    }
    
    res.status(201).json({imgUrls: req.file.path})
}

exports.uploadImages = (req,res,next) =>{
    if(!req.files){
        res.status(417).json({messageError:"You need to upload a file"})
        return
    }
    const imgUrls = req.files.map((item) =>{
        return item.path
    })
    res.status(201).json({imgUrls})
}