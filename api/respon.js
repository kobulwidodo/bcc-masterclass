module.exports = {
    ERROR: (res, status, message) => {
        return res.status(status).json({
            data: null,
            message: message
        });
    },
    SUCCESS: (res, status, data) => {
        return res.status(status).json({
            data: data
        });
    }
}