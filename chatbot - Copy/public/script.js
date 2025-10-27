const chatWindow = document.getElementById("chatwindow");
const msgInput = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");
const userId = Date.now(); // unique id per session

sendBtn.addEventListener("click", sendMessage);
msgInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});




async function sendMessage() {
  const msg = msgInput.value.trim();
  if (!msg) return;

  addMessage("You", msg, "user");
  msgInput.value = "";

  const endpoint = await detectIntent(msg); 

  try {
    const res = await fetch(`/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, msg }),
    });

    const data = await res.text();
    typeMessage("AI", data, "ai"); // Smooth typing effect
  } catch (err) {
    addMessage("System", "Error: " + err.message, "error");
  }
}

function addMessage(sender, text, messageType) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("message-wrapper");
  wrapper.classList.add(messageType + "-wrapper"); // user-wrapper or ai-wrapper

  const name = document.createElement("div");
  name.textContent = sender;
  name.classList.add("name");

  const msgDiv = document.createElement("div");
  msgDiv.textContent = text;
  msgDiv.classList.add("message", messageType);

  const inner = document.createElement("div");
  inner.appendChild(name);
  inner.appendChild(msgDiv);

  wrapper.appendChild(inner);
  chatWindow.appendChild(wrapper);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}


async function detectIntent(msg) {
  try {
    const res = await fetch("/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg }),
    });

    const intent = await res.text();
    console.log(intent)
    return intent.trim().toLowerCase(); // returns "chat" or "weather"
  } catch (err) {
    console.error("Intent detection failed:", err);
    return "chat"; // fallback
  }
}



function typeMessage(sender, fullText, messageType) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("message-wrapper");
  wrapper.classList.add(messageType + "-wrapper");

  const name = document.createElement("div");
  name.textContent = sender;
  name.classList.add("name");

  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", messageType);

  const inner = document.createElement("div");
  inner.appendChild(name);
  inner.appendChild(msgDiv);

  wrapper.appendChild(inner);
  chatWindow.appendChild(wrapper);

  let i = 0;
  function showNextChar() {
    if (i < fullText.length) {
      msgDiv.textContent += fullText.charAt(i);
      i++;
      chatWindow.scrollTop = chatWindow.scrollHeight;
      setTimeout(showNextChar, 25);
    }
  }
  showNextChar();
}

