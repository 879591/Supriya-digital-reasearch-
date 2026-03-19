<style>
    /* चैट आइकन (Floating Button) */
    #ai-chat-icon {
        position: fixed;
        bottom: 20px;
        left: 20px; /* व्हाट्सप्प के विपरीत दिशा में */
        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        text-align: center;
        font-size: 30px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.3s;
    }

    #ai-chat-icon:hover {
        transform: scale(1.1) rotate(15deg);
    }

    /* चैट विंडो */
    #ai-chat-window {
        display: none; /* शुरू में छिपा हुआ */
        position: fixed;
        bottom: 90px;
        left: 20px;
        width: 350px;
        max-height: 500px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1001;
        overflow: hidden;
        flex-direction: column;
        font-family: 'Poppins', sans-serif;
    }

    /* चैट हेडर */
    #ai-chat-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #ai-chat-header .close-chat {
        cursor: pointer;
        font-size: 1.2rem;
    }

    /* चैट बॉडी (संदेश) */
    #ai-chat-body {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        background: #f9f9f9;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    /* संदेशों का स्टाइल */
    .chat-message {
        padding: 8px 12px;
        border-radius: 10px;
        max-width: 80%;
        font-size: 0.9rem;
    }

    .ai-message {
        background: #eee;
        align-self: flex-start;
        border-top-left-radius: 0;
    }

    .user-message {
        background: #667eea;
        color: white;
        align-self: flex-end;
        border-top-right-radius: 0;
    }

    /* इनपुट एरिया */
    #ai-chat-input-area {
        padding: 10px;
        background: white;
        border-top: 1px solid #eee;
        display: flex;
        gap: 5px;
    }

    #ai-chat-input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 5px;
        outline: none;
    }

    #ai-send-btn {
        background: #667eea;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
    }
</style>

<div id="ai-chat-icon">
    <i class="fas fa-robot"></i>
</div>

<div id="ai-chat-window">
    <div id="ai-chat-header">
        <span>सुप्रिया AI एजेंट</span>
        <span class="close-chat" id="close-ai-chat">&times;</span>
    </div>
    <div id="ai-chat-body">
        <div class="chat-message ai-message">नमस्ते! मैं सुप्रिया AI हूँ। आपकी कैसे मदद करूँ?</div>
    </div>
    <div id="ai-chat-input-area">
        <input type="text" id="ai-chat-input" placeholder="अपना सवाल लिखें...">
        <button id="ai-send-btn"><i class="fas fa-paper-plane"></i></button>
    </div>
</div>

<script>
    // 1. चैट विंडो को खोलने और बंद करने का लॉजिक
    const chatIcon = document.getElementById('ai-chat-icon');
    const chatWindow = document.getElementById('ai-chat-window');
    const closeChat = document.getElementById('close-ai-chat');

    chatIcon.onclick = () => {
        chatWindow.style.display = 'flex';
    };

    closeChat.onclick = () => {
        chatWindow.style.display = 'none';
    };

    // 2. संदेश भेजने और जवाब देने का लॉजिक
    const chatInput = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-send-btn');
    const chatBody = document.getElementById('ai-chat-body');

    // संदेश भेजने का फंक्शन
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === "") return;

        // यूजर का संदेश स्क्रीन पर दिखाएँ
        const userMsgDiv = document.createElement('div');
        userMsgDiv.className = 'chat-message user-message';
        userMsgDiv.innerText = message;
        chatBody.appendChild(userMsgDiv);

        // इनपुट फील्ड खाली करें
        chatInput.value = '';

        // चैट को नीचे तक स्क्रॉल करें
        chatBody.scrollTop = chatBody.scrollHeight;

        // AI का जवाब (थोड़ी देर बाद)
        setTimeout(() => {
            getAIResponse(message);
        }, 800);
    }

    // AI का जवाब पाने का फंक्शन (Rule-based)
    function getAIResponse(userMessage) {
        let response = "माफ़ कीजिये, मैं यह नहीं समझ पाया। क्या आप अपना सवाल दूसरे शब्दों में पूछ सकते हैं?";
        const msg = userMessage.toLowerCase();

        // **जवाबों की लिस्ट (आप इन्हें बदल सकते हैं)**
        if (msg.includes("नमस्ते") || msg.includes("हेलो") || msg.includes("hi") || msg.includes("hello")) {
            response = "नमस्ते! मैं सुप्रिया AI हूँ। 'सुप्रिया डिजिटल रिसर्च' में आपका स्वागत है। आप हमारे द्वारा दी जाने वाली सेवाओं के बारे में पूछ सकते हैं।";
        } else if (msg.includes("सेवा") || msg.includes("service") || msg.includes("क्या करते हो")) {
            response = "हम वेबसाइट डिजाइन, लोगो डिजाइन, पोस्टर, यूट्यूब वीडियो एडिटिंग, 3D इमेज, और बहुत कुछ बनाते हैं! पूरी लिस्ट देखने के लिए 'सेवाएँ' सेक्शन देखें।";
        } else if (msg.includes("वेबसाइट") || msg.includes("website")) {
            response = "हाँ, हम स्कूल, कॉलेज, रेस्टोरेंट और हर तरह के बिजनेस के लिए आकर्षक और प्रोफेशनल वेबसाइट बनाते हैं।";
        } else if (msg.includes("ऑर्डर") || msg.includes("कैसे खरीदें") || msg.includes("apply")) {
            response = "ऑर्डर करने के लिए, आप वेबसाइट पर दिए गए 'ऑर्डर करें' फॉर्म को भरें। या सीधे हमें कॉल करें: 9792006815.";
        } else if (msg.includes("कॉल") || msg.includes("फोन") || msg.includes("संपर्क")) {
            response = "आप सूरज मौर्या (एडमिन) से संपर्क कर सकते हैं। नंबर है: 9792006815.";
        } else if (msg.includes("कार्टून") || msg.includes("एनिमेशन")) {
            response = "हाँ, हम 2D/3D कार्टून कैरेक्टर और एनिमेटेड वीडियो बनाते हैं।";
        } else if (msg.includes("कीमत") || msg.includes("प्राइस") || msg.includes("कितना लगेगा")) {
            response = "कीमतें प्रोजेक्ट पर निर्भर करती हैं। कृपया व्हाट्सएप या कॉल पर बात करें, हम आपको सबसे अच्छी कीमत देंगे।";
        } else if (msg.includes("थैंक्यू") || msg.includes("dhanyawad") || msg.includes("धन्यवाद")) {
            response = "आपका स्वागत है! 'सुप्रिया डिजिटल रीच आर्क' से जुड़ने के लिए धन्यवाद।";
        } else if (msg.includes("सूरज मौर्या कौन है")) {
            response = "सूरज मौर्या 'सुप्रिया डिजिटल रीच आर्क' के एडमिन और मुख्य डेवलपर हैं।";
        }

        // AI का संदेश स्क्रीन पर दिखाएँ
        const aiMsgDiv = document.createElement('div');
        aiMsgDiv.className = 'chat-message ai-message';
        aiMsgDiv.innerText = response;
        chatBody.appendChild(aiMsgDiv);

        // चैट को नीचे तक स्क्रॉल करें
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // बटन क्लिक या 'Enter' की दबाने पर संदेश भेजें
    sendBtn.onclick = sendMessage;
    chatInput.onkeypress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };
</script>
          
