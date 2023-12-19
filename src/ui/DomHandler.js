const output = document.getElementById("output");
const input = document.getElementById("input");

export function setInputContent(content) {
  input.textContent = content;
}

export function setOutputHtml(html) {
  output.innerHTML = html;
}
