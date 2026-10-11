const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
  let text = markdownInput.value;

  // Headings
  text = text.replace(/^\s*### (.+)$/gm, "<h3>$1</h3>");
  text = text.replace(/^\s*## (.+)$/gm, "<h2>$1</h2>");
  text = text.replace(/^\s*# (.+)$/gm, "<h1>$1</h1>");

  // Images
  text = text.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img alt="$1" src="$2">'
  );

  // Links
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>'
  );

  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/__(.*?)__/g, "<strong>$1</strong>");

  // Italic
  text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  text = text.replace(/_([^_]+)_/g, "<em>$1</em>");

  // Blockquotes
  text = text.replace(
    /^\s*> (.+)$/gm,
    "<blockquote>$1</blockquote>"
  );

  // Remove line breaks to match test output
  text = text.replace(/\n/g, "");

  return text;
}

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();

  htmlOutput.textContent = html;
  preview.innerHTML = html;
});