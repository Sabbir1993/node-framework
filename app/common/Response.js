exports.setResponse = (data, status, code, message) => {
    return {
        data: data,
        code: code,
        status: status,
        message: message
    }
}
