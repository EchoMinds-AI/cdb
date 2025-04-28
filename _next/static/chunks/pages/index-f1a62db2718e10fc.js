const { useState, useEffect, useRef } = React;

const messages = [
  "Market News: Tech sector up 2% today.",
  "Next Meeting: 10:00 AM in Conference Room A.",
  "Reminder: Product Launch Review at 2:00 PM.",
  "Update: Marketing budget adjusted by +5%.",
  "Competitor A: +500 X mentions today.",
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messagesList, setMessagesList] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false },
  ]);
  const [messageIndex, setMessageIndex] = useState(0);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessagesList([...messagesList, { text: input, isUser: true }]);
    setInput("");
    setTimeout(() => {
      let response = "I'm processing your request.";
      if (input.toLowerCase().includes("meeting")) {
        response = "Your next meeting is at 10:00 AM in Conference Room A.";
      } else if (input.toLowerCase().includes("competitor")) {
        response = "Competitor A has seen a 15% increase in social media mentions today.";
      } else if (input.toLowerCase().includes("revenue") || input.toLowerCase().includes("sales")) {
        response = "Current revenue is $24.8M, up 12.5% from last quarter.";
      } else if (input.toLowerCase().includes("help")) {
        response = "I can provide updates on meetings, competitors, revenue, and other business metrics. Just ask!";
      }
      setMessagesList((prev) => [...prev, { text: response, isUser: false }]);
    }, 500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setMessagesList((prev) => [...prev, { text: messages[messageIndex], isUser: false }]);
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 30000);
    return () => clearInterval(interval);
  }, [isOpen, messageIndex]);

  return (
    <React.Fragment>
      {isOpen && (
        <motion.div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "300px",
            maxHeight: "400px",
            display: "flex",
            flexDirection: "column",
            background: "#1A2533",
            color: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 0 8px #00ffcc",
            overflow: "hidden",
            zIndex: 1000,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 16px",
              background: "linear-gradient(90deg, #00ffcc, #ff00ff)",
              color: "#000000",
            }}
          >
            <span style={{ fontWeight: 600, fontSize: "16px" }}>AI Assistant</span>
            <button
              onClick={toggleChat}
              style={{ color: "#000000", background: "none", border: "none", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>
          <div
            style={{
              flexGrow: 1,
              padding: "16px",
              overflowY: "auto",
              maxHeight: "280px",
              background: "rgba(0, 0, 0, 0.7)",
            }}
          >
            {messagesList.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: msg.isUser ? "flex-end" : "flex-start",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    padding: "8px 16px",
                    marginBottom: "8px",
                    maxWidth: "80%",
                    alignSelf: msg.isUser ? "flex-end" : "flex-start",
                    background: msg.isUser
                      ? "linear-gradient(90deg, #00ffcc, #00ccff)"
                      : "#2A3545",
                    color: msg.isUser ? "#000000" : "#ffffff",
                    borderRadius: "12px",
                    boxShadow: msg.isUser ? "0 0 8px rgba(0, 255, 204, 0.3)" : "none",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>{msg.text}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px",
              background: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              style={{
                flexGrow: 1,
                marginRight: "8px",
                padding: "8px",
                color: "white",
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "4px",
                outline: "none",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                color: "#00ffcc",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ➤
            </button>
          </div>
        </motion.div>
      )}
      <motion.div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00ffcc, #ff00ff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 0 8px #00ffcc",
          zIndex: 1000,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
      >
        {isOpen ? "✕" : "💬"}
      </motion.div>
    </React.Fragment>
  );
};

const Dashboard = () => {
  const router = { push: (path) => (window.location.href = path) }; // Mock router for standalone
  const variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #00ffcc33 0%, #00ffcc00 70%)",
          filter: "blur(30px)",
        }}
        initial={{ x: -150, y: -150, opacity: 0.5 }}
        animate={{ x: -100, y: -100, opacity: [0.5, 0.8, 0.5], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #ff00ff33 0%, #ff00ff00 70%)",
          filter: "blur(40px)",
        }}
        initial={{ x: 200, y: 200, opacity: 0.5 }}
        animate={{ x: 150, y: 150, opacity: [0.5, 0.7, 0.5], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #00ccff33 0%, #00ccff00 70%)",
          filter: "blur(35px)",
        }}
        initial={{ x: 200, y: -200, opacity: 0.5 }}
        animate={{ x: 150, y: -150, opacity: [0.5, 0.7, 0.5], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />
      <motion.div
        style={{ zIndex: 1, textAlign: "center", maxWidth: "800px" }}
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }}
      >
        <motion.div variants={variants}>
          <h2
            style={{
              fontWeight: 800,
              marginBottom: "16px",
              background: "linear-gradient(90deg, #00ffcc, #ff00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 15px rgba(0, 255, 204, 0.3)",
              fontSize: "32px",
            }}
          >
            CEO Dashboard
          </h2>
        </motion.div>
        <motion.div variants={variants}>
          <h5
            style={{
              marginBottom: "32px",
              color: "#b0b0b0",
              fontSize: "20px",
            }}
          >
            A cutting-edge dashboard that empowers CEOs to make informed decisions efficiently, while enjoying the process through thoughtful design and interactivity.
          </h5>
        </motion.div>
        <motion.div variants={variants}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <button
              onClick={() => router.push("/dashboard")}
              style={{
                padding: "8px 32px",
                borderRadius: "30px",
                background: "linear-gradient(90deg, #00ffcc, #00ccff)",
                color: "#000",
                border: "none",
                fontWeight: 600,
                marginRight: "16px",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              Enter Dashboard
            </button>
            <button
              onClick={() => router.push("/test")}
              style={{
                padding: "8px 32px",
                borderRadius: "30px",
                background: "rgba(0, 0, 0, 0.3)",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              View Components
            </button>
          </div>
        </motion.div>
      </motion.div>
      <ChatWidget />
    </div>
  );
};

ReactDOM.render(<Dashboard />, document.getElementById("root"));
