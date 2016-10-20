export let handler = (res, result, code) => {
    if (typeof result === 'object') {
        res.json({ code: 0, msg: null, data: result })
    } else {
        res.json({ code: code, msg: result, data: null })
    }
}
