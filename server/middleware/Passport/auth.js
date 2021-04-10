const auth = (req, res, next) => {
    //console.log(req.session);
    if(req.isAuthenticated()) {
        console.log('Pass');
        //console.log(res);
        next(res.passport);
    } else {
        res.status(401).json({msg: 'Unauthorized access'});
    }
}

export default auth;