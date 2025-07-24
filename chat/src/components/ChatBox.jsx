import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, push, onValue } from "firebase/database";
import Message from "./Message";

function ChatBox() {
  const [nickname, setNickname] = useState(() => localStorage.getItem("nickname") || "");
  const [tempName, setTempName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!nickname) return;
    const msgRef = ref(db, "messages");
    onValue(msgRef, (snapshot) => {
      const data = snapshot.val() || {};
      setMessages(Object.entries(data).map(([id, val]) => ({ id, ...val })));
    });
  }, [nickname]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msgRef = ref(db, "messages");
    push(msgRef, {
      user: nickname,
      text: input
    });
    setInput("");
  };

  if (!nickname) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-vscode-bg text-vscode-text">
        <div className="mb-4 text-xl">닉네임을 입력하세요</div>
        <input
          className="bg-vscode-input text-white px-4 py-2 border border-vscode-border"
          placeholder="닉네임"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && tempName.trim()) {
              localStorage.setItem("nickname", tempName);
              setNickname(tempName);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-screen bg-vscode-bg text-vscode-text font-mono text-sm flex flex-col">
      <div className="flex items-center bg-vscode-panel text-white text-xs px-3 py-1 border-b border-vscode-border">
        <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
        <span>ChatBox.jsx</span>
      </div>
      <div className="flex-grow p-4 overflow-y-auto bg-vscode-panel">
        {messages.map((msg) => (
          <Message key={msg.id} user={msg.user} text={msg.text} />
        ))}
      </div>
      <div className="flex p-2 border-t border-vscode-border bg-vscode-panel">
        <input
          className="flex-grow bg-vscode-input border border-vscode-border text-white px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="메시지를 입력하세요..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-vscode-accent text-white px-4"
        >
          ⏎
        </button>
      </div>
    </div>
  );
}

export default ChatBox;