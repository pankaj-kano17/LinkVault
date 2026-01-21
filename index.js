const express = require('express');
const path = require('path');
const app = express();
const PORT = 8001;
const urlRoutes = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const { connectDB } = require('./connect');
const URL = require('./models/url');
connectDB("mongodb://127.0.0.1:27017/short-url").then(()=>
    console.log('Connected to MongoDB')
);

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/test",async(req,res)=>{
    const allUrls= await URL.find({});
    return res.render("home",{urls:allUrls});
});
app.use("/url", urlRoutes);
app.use("/", staticRoute);
app.get('/url/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
      const entry =await URL.findOneAndUpdate({
         shortId } ,{ $push: { visitHistory:  {timestamp: Date.now() } } }, { new: true } );
       
    res.redirect(entry.originalUrl);
}   );

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});