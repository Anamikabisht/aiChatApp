
const { GoogleGenAI } =require("@google/genai")

const ai = new GoogleGenAI({ apiKey:"AIzaSyBrVsdCqiys80yRwf5F532YBKECg_7ZttU"});  //object


async function main(msg) {
  try{
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    // contents: [
    //           {
    //             role:"user",
    //             parts:[{text:"hi act like bestie"}]
    //           },
    //           {
    //             role:"model",
    //             parts:[{text:"okay, tell me what do you want to do today?"}]
    //           },
             


              
    
   contents: msg
  });
  return response.text;
  //console.log(response.text);
}
catch(err){
  console.log(err.message);
}
}

main();

module.exports=main;





