import React, { useState, useEffect } from "react";
import GeminiChatbot from "./GeminiChatbot";

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

export default function MintaroChatbotLauncher() {
    const [showChatbot, setShowChatbot] = useState(false);
    const [showBubble, setShowBubble] = useState(true);

    useEffect(() => {
        if (showBubble) {
            const timer = setTimeout(() => setShowBubble(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showBubble]);

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
                    Hi, I'm Mintaro, your SkillMint guide.<br />Ready to help you grow anytime.
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
            {/* Mintaro mascot button */}
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
                aria-label="Open Mintaro Chatbot"
            >
                <img
                    src="/logo.png"
                    alt="Mintaro mascot"
                    style={{ width: 48, height: 48, objectFit: "contain" }}
                />
            </button>
            {/* Chatbot modal/panel */}
            {showChatbot && (
                <div
                    style={{
                        position: "fixed",
                        bottom: 100,
                        right: 24,
                        zIndex: 1001,
                        background: "white",
                        borderRadius: 12,
                        boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                        width: 370,
                        maxWidth: "90vw"
                    }}
                >
                    <div className="flex justify-end p-2">
                        <button
                            onClick={() => setShowChatbot(false)}
                            className="text-gray-400 hover:text-gray-700 text-xl font-bold"
                            aria-label="Close Mintaro Chatbot"
                        >
                            ×
                        </button>
                    </div>
                    <GeminiChatbot systemPrompt={SYSTEM_PROMPT} />
                </div>
            )}
        </div>
    );
} 