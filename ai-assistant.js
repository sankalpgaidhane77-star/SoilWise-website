const SYSTEM_PROMPT = `You are SoilMitra, a friendly farming expert for Indian farmers. Speak simply in Hinglish style when natural. When analyzing soil photos, provide: soil type guess, texture/color observations, best 3-4 crops for that soil, watering advice, one soil improvement tip, and remind about lab testing. For text questions about farming, soil, or crops, answer helpfully with practical tips. Keep responses under 200 words. Use emojis naturally. Be encouraging like a wise farmer friend.`;

const DEFAULT_WELCOME = {
  sender: 'ai',
  text: "Namaskar! 🙏 I am SoilMitra, your wise farming friend. How can I help you today?\n\nYou can ask me any questions about crop cultivation, soil improvement, or upload a photo of your field soil (using 📷 or 🖼️) to get an immediate analysis!",
  image: null,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

let chatHistory = [];
let selectedImageBase64 = null;
let selectedImageMime = null;

document.addEventListener('DOMContentLoaded', () => {
  initChatHistory();
  initImageUploads();
  initChatActions();
});

// Get Hardcoded API Key
function getApiKey() {
  return "AIzaSyAI1H6lOz1CTD-WldTXaf6hi7gKDEBqt2c";
}

// Chat History Persistence
function initChatHistory() {
  const historyJSON = localStorage.getItem('soilwise_chat_history');
  if (historyJSON) {
    try {
      chatHistory = JSON.parse(historyJSON);
    } catch (e) {
      chatHistory = [DEFAULT_WELCOME];
    }
  } else {
    chatHistory = [DEFAULT_WELCOME];
  }
  renderChatHistory();
}

function saveChatHistory() {
  localStorage.setItem('soilwise_chat_history', JSON.stringify(chatHistory));
}

function renderChatHistory() {
  const container = document.getElementById('chat-history');
  if (!container) return;

  container.innerHTML = chatHistory.map(msg => `
    <div class="chat-message ${msg.sender}">
      ${msg.sender === 'ai' ? '<div class="avatar">🌱</div>' : ''}
      <div class="bubble">
        ${msg.image ? `<img src="${msg.image}" alt="Uploaded Soil Photo" class="message-image">` : ''}
        <div class="message-text" style="white-space: pre-wrap;">${msg.text}</div>
        <span class="message-time">${msg.timestamp}</span>
      </div>
    </div>
  `).join('');

  scrollToBottom();
}

function scrollToBottom() {
  const container = document.getElementById('chat-history');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

// Image Selection and Base64 Parsing
function initImageUploads() {
  const cameraBtn = document.getElementById('camera-btn');
  const galleryBtn = document.getElementById('gallery-btn');
  const cameraInput = document.getElementById('camera-input');
  const galleryInput = document.getElementById('gallery-input');
  const removePreviewBtn = document.getElementById('remove-preview-btn');

  if (cameraBtn && cameraInput) {
    cameraBtn.addEventListener('click', () => cameraInput.click());
  }

  if (galleryBtn && galleryInput) {
    galleryBtn.addEventListener('click', () => galleryInput.click());
  }

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file only.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImageBase64 = e.target.result; // Data URL prefix included
      selectedImageMime = file.type;

      // Show in preview thumbnail
      const previewContainer = document.getElementById('preview-thumbnail-container');
      const previewImg = document.getElementById('preview-image-element');

      if (previewContainer && previewImg) {
        previewImg.src = selectedImageBase64;
        previewContainer.classList.add('active');
      }
    };
    reader.readAsDataURL(file);
  };

  if (cameraInput) {
    cameraInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
  }
  if (galleryInput) {
    galleryInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
  }

  if (removePreviewBtn) {
    removePreviewBtn.addEventListener('click', clearImagePreview);
  }
}

function clearImagePreview() {
  selectedImageBase64 = null;
  selectedImageMime = null;
  const previewContainer = document.getElementById('preview-thumbnail-container');
  const cameraInput = document.getElementById('camera-input');
  const galleryInput = document.getElementById('gallery-input');

  if (previewContainer) previewContainer.classList.remove('active');
  if (cameraInput) cameraInput.value = '';
  if (galleryInput) galleryInput.value = '';
}

// Sending Messages & Gemini API Integration
function initChatActions() {
  const sendBtn = document.getElementById('send-msg-btn');
  const messageInput = document.getElementById('chat-message-input');
  const clearChatBtn = document.getElementById('clear-chat-btn');

  const sendMessage = async () => {
    const text = messageInput.value.trim();
    const image = selectedImageBase64; // base64 string with prefix
    const mime = selectedImageMime;

    const apiKey = getApiKey();

    if (!text && !image) return;

    // Add user message to chat
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      sender: 'user',
      text: text || "Analyzing uploaded soil image...",
      image: image,
      timestamp: timestamp
    };

    chatHistory.push(userMsg);
    saveChatHistory();
    renderChatHistory();

    // Clear input & image preview
    messageInput.value = '';
    clearImagePreview();

    // Show typing loader
    showTypingIndicator();

    try {
      const aiResponseText = await callGeminiAPI(apiKey, text, image, mime);

      // Remove typing loader
      hideTypingIndicator();

      // Add AI response to history
      const aiMsg = {
        sender: 'ai',
        text: aiResponseText,
        image: null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      chatHistory.push(aiMsg);
      saveChatHistory();
      renderChatHistory();

    } catch (err) {
      hideTypingIndicator();

      const errorMsg = {
        sender: 'ai',
        text: `⚠️ Error: ${err.message || 'Something went wrong. Please check your internet connection or Gemini API key.'}`,
        image: null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      chatHistory.push(errorMsg);
      saveChatHistory();
      renderChatHistory();
    }
  };

  if (sendBtn) sendBtn.addEventListener('click', sendMessage);

  if (messageInput) {
    messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your chat history?')) {
        chatHistory = [DEFAULT_WELCOME];
        saveChatHistory();
        renderChatHistory();
      }
    });
  }
}

function showTypingIndicator() {
  const container = document.getElementById('chat-history');
  if (!container) return;

  const indicator = document.createElement('div');
  indicator.className = 'chat-message ai typing-indicator-wrapper';
  indicator.id = 'ai-typing-indicator';
  indicator.innerHTML = `
    <div class="avatar">🌱</div>
    <div class="bubble">
      <div class="typing-indicator">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    </div>
  `;
  container.appendChild(indicator);
  scrollToBottom();
}

function hideTypingIndicator() {
  const indicator = document.getElementById('ai-typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}

// Call Google Gemini API
async function callGeminiAPI(apiKey, userText, base64ImageWithPrefix, mimeType) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

  // Form query description
  let promptText = SYSTEM_PROMPT;
  if (userText) {
    promptText += `\n\nFarmer question: ${userText}`;
  } else {
    promptText += `\n\nPlease analyze this soil photo.`;
  }

  // Set up parts
  const parts = [
    { text: promptText }
  ];

  if (base64ImageWithPrefix) {
    // Split to extract raw base64 string
    const base64Data = base64ImageWithPrefix.split(',')[1];
    parts.push({
      inlineData: {
        mimeType: mimeType || 'image/jpeg',
        data: base64Data
      }
    });
  }

  const requestPayload = {
    contents: [
      { parts: parts }
    ]
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestPayload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Gemini API Error details:', errorData);

    // Throw descriptive error if API key is invalid
    if (response.status === 400 || response.status === 403) {
      throw new Error("Invalid API Key or permission error. Please verify the embedded Gemini API key.");
    }

    throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
  }

  const responseData = await response.json();

  // Extract text response
  const candidates = responseData.candidates;
  if (candidates && candidates.length > 0 && candidates[0].content?.parts?.length > 0) {
    return candidates[0].content.parts[0].text;
  }

  throw new Error("Empty response received from the AI model.");
}
