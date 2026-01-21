const shortid = require('shortid');
const URL=require('../models/url');
async function handleGeneratenewshorturl(req,res) {
    const {url}= req.body;
    if(!url) 
        return res.status(400).json({error:'URL is required'});
    const shortId=shortid();
    await URL.create({
        shortId,
        originalUrl:url,
        visitHistory:[],
});
         return res.render("home",{id:shortId});
          
}

async function handleGetAnalytics(req,res){
    const shortId= req.params.shortId;
   const result= await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports={
    handleGeneratenewshorturl,
    handleGetAnalytics
};