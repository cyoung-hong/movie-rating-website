export default errorHandler => (err, req, res, next) => {
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
};