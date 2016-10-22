export default (res, result, code) => {
    if (!code) {
        res.json({ code: 0, msg: null, data: result })
    } else {
        res.json({ code: code, msg: result, data: null })
    }
}
