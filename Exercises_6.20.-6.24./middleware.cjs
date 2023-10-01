module.exports = (req, res, next) => {
    if (req.method === 'POST') {
        if(req.body.content.length < 5) {
            res.status(400).jsonp({
                error: "Too short anecdote, must have length 5 or more"
            })
        }
    }

    next()
}