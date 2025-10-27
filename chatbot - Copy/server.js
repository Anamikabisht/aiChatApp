const express=require("express");
const weatherOutput=require("./weatheragent");
const app=express();
const main=require("./aichat");

app.use(express.json());

const chatHistory={};


app.post("/intent", async (req, res) => {
  const { msg } = req.body;

  try {
    const prompt = `
Classify the user's intent based on this message:
"${msg}"

Possible labels:
- "weather": if the user is asking about temperature, weather, climate, forecast, rain, etc.
- "chat": if the message is general conversation or not about weather.

Return only one word: "weather" or "chat".
`;

    const aiResponse = await main(prompt); // 👈 your Gemini/OpenAI handler
    const intent = aiResponse.trim().toLowerCase().includes("weather") ? "weather" : "chat";
    res.send(intent);
  } catch (err) {
    res.send("chat"); // default fallback
  }
});


app.post('/chat',async(req,res)=>{
   const {id,msg}=req.body;

   try{
   if(!chatHistory[id]){
    chatHistory[id]=[]; //initialize chat history for new user
   } 

   const history=chatHistory[id];

   const promptmessage=[...history,{
    role:"user",
    parts:[{text:msg}]
   }]

   const ans= await main(promptmessage);
   history.push({role:"user",parts:[{text:msg}]});
   history.push({role:"model",parts:[{text:ans}]});

   chatHistory[id]=history; //update chat history
   res.send(ans);
   //console.log(ans);
   }
   catch(err){
    res.send(err.message);
   }
})


app.post('/weather',async(req,res)=>{
   const {id,msg}=req.body;

   try{
   if(!chatHistory[id]){
    chatHistory[id]=[]; //initialize chat history for new user
   } 

   const history=chatHistory[id];

   const promptmessage=[...history,{
    role:"user",
    parts:[{text:msg}]
   }]

   const ans= await weatherOutput(msg);
   history.push({role:"user",parts:[{text:msg}]});
   history.push({role:"model",parts:[{text:ans}]});

   chatHistory[id]=history; //update chat history
   res.send(ans);
   //console.log(ans);
   }
   catch(err){
    res.send(err.message);
   }
})
app.use(express.static("public"));

app.listen(3000,()=>{
  console.log("server is running on port 3000");
})