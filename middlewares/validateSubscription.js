const { subscription, plans } = require("../models")

module.exports = validateSubscription = async (req, res , next)=>{
    const user = req.user

    try {
        const subscriptionInfo = await subscription.findOne({where:{id:user.uid}})
        if(!subscriptionInfo){
            return res.status(401).json({ error: 'no subsciption found' });
        }else{
            const subsciptionData = await plans.findAll({
                where:{id:user.uid},
                attributes:["status", "plan" ,"CurrentPeriodStart", "currentPeriodEnd", "id" ],
                include:[
                    {
                        model:plans,
                        attributes:["id","name","projectsLimit","keywordsPerProject","aiGenerations","maxContentLength","billingCycle","features"]
                    }
                ]
            })
            req.subsciptionData = subsciptionData || []
            next();
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
