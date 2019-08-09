const dev = require("../models/dev")

module.exports = {
    async store(req, res) {
        const { user } = req.headers, //loggedDev
        { devId } = req.params, //targetDev
        loggedDev = await dev.findById(user),
        targetDev = await dev.findById(devId)

        //If devId does not exist, return status 400
        if(!targetDev) {
            return res.status(400).json({ error: "Dev does not exist" })
        }

        //If devId has also liked user, print match message
        if(targetDev.likes.includes(loggedDev._id)) {
            console.log("DEU MATCH!")
        }

        //Pushes like to database
        loggedDev.likes.push(targetDev._id)
        await loggedDev.save()

        return res.json(loggedDev)
    }
}