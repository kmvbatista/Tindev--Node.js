const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
       /*  console.log(req.params.devId);
        console.log(req.headers.user);
 */
        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev= await Dev.findById(user);
        const targetDev = await Dev.findById(devId);//instancia do banco ou abstração

        if(!targetDev) {
            return res.status(400).json({error: 'dev not exists'});
        }

        if(targetDev.likes.includes(loggedDev._id)) {
            console.log("MATCH");
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

         return res.json({ok: true});
    }
}