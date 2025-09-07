const { subscription } = require("../models")
const {addMonths} = require("date-fns");
const planDurationInMonths = 1;

module.exports = setPlan = async (req, res)=>{
    const data = req.body
    const endDate =  addMonths(new Date(), planDurationInMonths)
    const UpdatedData =  {...data, CurrentPeriodStart:new Date(), currentPeriodEnd:endDate, status:"active" }
    
    try {
        const isPlancreated = await subscription.create(UpdatedData)
        if(isPlancreated){
            return res.status(200).send({error:"", message:"Plan subscribed successfully", success:true, data:UpdatedData})
        }else{
            return res.status(500).send({error:"Internal Server error", message:"", success:false, data:null})
        } 
    } catch (error) {
        console.log(error)
        return res.status(500).send({error:error, message:"Internal Server error", success:false, data:null})
    }
}