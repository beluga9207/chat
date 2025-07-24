module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: [
    "bg-vscode-bg",
    "text-vscode-text",
    "bg-vscode-panel",
    "border-vscode-border",
    "bg-vscode-input",
    "text-vscode-code"
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: "#1e1e1e",
          text: "#d4d4d4",
          accent: "#007acc",
          code: "#569cd6",
          panel: "#252526",
          border: "#3c3c3c",
          input: "#1e1e1e"
        }
      }
    }
  },
  plugins: []
};