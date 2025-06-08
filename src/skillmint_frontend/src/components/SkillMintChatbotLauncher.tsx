import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const SYSTEM_PROMPT = `You are an AI Agent for an application called SkillMint. You are a friendly and professional AI mentor integrated into the SkillMint platform. Your role is to assist users—primarily students, event organizers, beginners in tech, and professionals—with questions related to the platform and general educational guidance.

Your main responsibilities:
- Answer student questions about the SkillMint platform, features, and how to use them.
- Act as a mentor by providing encouragement, tips, and general advice for learning, participating in events, and building a professional portfolio.
- Help event organizers navigate event creation, promotion, and participant engagement within the platform.
- Offer guidance on improving digital skills, discovering tech communities, and getting involved in learning opportunities (e.g., hackathons, bootcamps, bounties).

Tone and style:
- Be friendly, approachable, and professional.
- Communicate clearly and supportively.
- Use accessible language that welcomes both beginners and experienced users.

Limitations:
- Do **not** give legal advice.
- Do **not** answer off-topic questions unrelated to education, events, or the SkillMint platform.
- Do **not** give personal or financial advice.
- Always remind users that you are an AI and that they should use their own judgment and consult human mentors or professionals for important decisions.

Other notes:
- You are embedded in the web app sidebar. Keep your responses concise and scannable when possible.
- If a user asks something outside your scope, politely redirect them or suggest contacting support or a human mentor.
- You are also given some general information of the user, including their name and their bio. Try to fit your answer accordingly
`;

export default function SkillMintChatbotLauncher() {
    const [showChatbot, setShowChatbot] = useState(false);
    const [showBubble, setShowBubble] = useState(true);
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hi, I'm SkillMint! How can I help you today?" }
    ]);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (showBubble) {
            const timer = setTimeout(() => setShowBubble(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showBubble]);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: "user", text: input }]);
        // For demo, echo the user's message as markdown
        setMessages((msgs) => [
            ...msgs,
            { role: "bot", text: `**Echo:** ${input}` }
        ]);
        setInput("");
    };

    return (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
            {/* Speech bubble */}
            {showBubble && !showChatbot && (
                <div
                    style={{
                        position: "absolute",
                        right: 80,
                        bottom: 10,
                        background: "#fff",
                        borderRadius: 12,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        padding: "12px 16px",
                        fontSize: 14,
                        maxWidth: 260,
                        minWidth: 180,
                        color: "#222",
                        cursor: "pointer"
                    }}
                    onClick={() => setShowBubble(false)}
                >
                    Hi, I'm SkillMint, your SkillMint guide.<br />Ready to help you grow anytime.
                    <span
                        style={{
                            position: "absolute",
                            right: -16,
                            bottom: 12,
                            width: 0,
                            height: 0,
                            borderTop: "8px solid transparent",
                            borderBottom: "8px solid transparent",
                            borderLeft: "16px solid #fff"
                        }}
                    />
                </div>
            )}
            {/* SkillMint mascot button */}
            <button
                onClick={() => setShowChatbot((v) => !v)}
                style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                aria-label="Open SkillMint Chatbot"
            >
                <img
                    src="/logo.png"
                    alt="SkillMint mascot"
                    style={{ width: 48, height: 48, objectFit: "contain" }}
                />
            </button>
            {/* Chatbot modal/panel */}
            {showChatbot && (
                <div className="fixed bottom-24 right-4 w-80 bg-white rounded-lg shadow-lg z-50 flex flex-col">
                    <div className="flex justify-between items-center p-2 border-b">
                        <span className="font-bold">SkillMint Chatbot</span>
                        <button onClick={() => setShowChatbot(false)} aria-label="Close SkillMint Chatbot">×</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: 320 }}>
                        {messages.map((msg, i) => (
                            <div key={i} className={msg.role === "user" ? "text-right mb-2" : "text-left mb-2"}>
                                <span className={msg.role === "user" ? "font-semibold text-blue-600" : "font-semibold text-green-600"}>
                                    {msg.role === "user" ? "You" : "SkillMint"}:
                                </span>
                                <span className={msg.role === "user" ? "inline ml-1" : "inline ml-1"}>
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex border-t p-2">
                        <input
                            className="flex-1 border rounded px-2 py-1 mr-2"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSend()}
                            placeholder="Type your message... (Markdown supported)"
                        />
                        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
} 