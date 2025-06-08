import React, { useState } from "react";

const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAvRh1jKz0ogMtxt7SAiWaAAEKg7eksLdw";

interface GeminiChatbotProps {
    systemPrompt: string;
}

export default function GeminiChatbot({ systemPrompt }: GeminiChatbotProps) {
    const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasSentPrompt, setHasSentPrompt] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;
        setMessages((msgs) => [...msgs, { role: "user", text: input }]);
        setLoading(true);

        try {
            // Always send the system prompt as the first message in the conversation
            const parts = [];
            if (!hasSentPrompt) {
                parts.push({ text: systemPrompt });
                setHasSentPrompt(true);
            }
            parts.push({ text: input });

            const body = JSON.stringify({
                contents: [
                    {
                        parts
                    }
                ]
            });

            const response = await fetch(GEMINI_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            // Parse the Gemini response
            const botText =
                data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Sorry, I couldn't understand the response.";

            setMessages((msgs) => [...msgs, { role: "bot", text: botText }]);
        } catch (err: any) {
            setMessages((msgs) => [
                ...msgs,
                { role: "bot", text: "Error: " + (err.message || "Unknown error") }
            ]);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-2">Mentor Mintaro</h2>
            <div className="h-64 overflow-y-auto border p-2 mb-2 bg-gray-50 rounded">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left text-blue-700"
                            }`}
                    >
                        <span className="inline-block px-2 py-1 rounded bg-gray-200">
                            <b>{msg.role === "user" ? "You" : "Gemini"}:</b> {msg.text}
                        </span>
                    </div>
                ))}
                {loading && <div className="text-gray-400">Gemini is typing...</div>}
            </div>
            <div className="flex gap-2">
                <input
                    className="flex-1 border rounded px-2 py-1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                    disabled={loading}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                    onClick={sendMessage}
                    disabled={loading}
                >
                    Send
                </button>
            </div>
        </div>
    );
} 