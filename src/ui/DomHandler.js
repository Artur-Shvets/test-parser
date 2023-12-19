const output = document.getElementById("output");
const input = document.getElementById("input");

export function setInputContent(content) {
  input.textContent = content;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function setOutputHtml(html) {
  output.innerHTML = html;
}
