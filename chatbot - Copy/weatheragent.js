//var readlineSync = require('readline-sync');
const main=require("./aichat");

async function agent(msg){
  // const question= readlineSync.question('');

   try{

   const promptmessage=`You are an information extraction system.

The user will ask weather-related questions in natural language.

Your task:
1. Extract all cities and dates mentioned in the question.
2. Return them strictly as a JSON array of objects, where each object has:
   - "city": the city name in lowercase
   - "date": either "today", or an explicit date in YYYY-MM-DD format

Format Example:
Input: "What is the weather in Delhi today and Mumbai on 2023-10-10?"
Output: [{"city":"delhi","date":"today"},{"city":"mumbai","date":"2023-10-10"}]

Rules:
- Do not output anything else except the JSON array not even .
- If date is missing, default to "today" .
- If multiple cities are asked, return multiple objects.
- Normalize city names (e.g., "New Delhi" → "new delhi").
if the question is not related to weather like city is not mentioned and its saying - whats meaning of weather in hindi then generate- meaning of weather is mausam simple response chats  not weather related weather
The extracted JSON array will be sent to the getweather agent.
The results from getweather will be given to Gemini to generate the final natural-language answer user question: ${msg}
`

    const temp = await main(promptmessage);
    const ans = temp.replace(/```(?:json)?/gi, "").trim();
    const location = JSON.parse(ans);

    const weatherdata = await getweather(location);
    return weatherdata;
  } catch (err) {
    return { error: err.message };
  }
}


async function getweather(location){

  const weatherInfo=[];
  for(const {city,date} of location){
    if(date.toLowerCase()==="today"){
      const response=await fetch( `http://api.weatherapi.com/v1/current.json?key=f1b98a0a80d2457fba463526250103&q=${city}`)

      const data=await response.json();
      weatherInfo.push(data);

  }
  else{
      const response= await fetch( `http://api.weatherapi.com/v1/current.json?key=f1b98a0a80d2457fba463526250103&q=${city}&dt=${date}`)
      const data=await response.json();
      weatherInfo.push(data);
  }
}
  return weatherInfo;
}



async function weatherOutput(msg) {
  const weatherDetails = await agent(msg);

  if (weatherDetails.error) return "Sorry, I couldn’t fetch weather data.";

  const prompt = `
You are a friendly Hinglish weather bot.
Given this JSON weather data:
${JSON.stringify(weatherDetails, null, 2)}

Describe weather naturally, like:
"Arey, Dehradun ka weather bada mast hai aaj! 22°C ke around temperature hai aur thoda cloudy sa mood bana hua hai 😌."
Keep it short and casual.
`;

  const response = await main(prompt);
  return response;
}

 
//weatherOutput()



module.exports=weatherOutput;


//now tell llm to give location array exyracting from question format[{city:"delhi",date:"today"},{city:"mumbai",date:"2023-10-10"}]
//location array will be passes to agent function getweather
//output from getweather will be given to gemini as context to answer question
 