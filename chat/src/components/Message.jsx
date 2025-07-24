import React from "react";

function Message({ user, text }) {
  return (
    <div className="pl-4 border-l-2 border-vscode-border text-vscode-text mb-1">
      <span className="text-vscode-code font-bold">{user}:</span> <span>{text}</span>
    </div>
  );
}
export default Message;