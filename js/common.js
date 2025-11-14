// js/common.js

// ---------- 공통 버튼 ----------
function goHome() {
  window.location.href = "../index.html";
}

async function sharePage() {
  const url = window.location.origin + "/humanitas/index.html";
  try {
    await navigator.clipboard.writeText(url);
    alert("📎 페이지 링크가 복사되었습니다!");
  } catch (err) {
    alert("복사 실패! 수동으로 복사해주세요.");
  }
}

// ---------- 댓글 공통 로직 ----------

// ① Apps Script Web App URL (배포 화면의 "웹 앱" URL 그대로, /exec 까지만)
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxqMXokTr2isatE-vb6YtT6oW9gmZf0BWvbZlsvPGu4hQonu3dBm7aoxhgwDPH7aHfZpw/exec";

// HTML escape (XSS 방지)
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, s => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[s]));
}

// JSONP 방식으로 목록 불러오기
function loadComments(SLUG, listEl) {
  const cbName = "handleComments_" + SLUG + "_" + Date.now();

  window[cbName] = function (comments) {
    listEl.innerHTML = "";
    comments.forEach(c => {
      const div = document.createElement("div");
      div.className = "comment-item";
      const time = new Date(c.timestamp).toLocaleString();
      div.innerHTML = `
        <p>${escapeHtml(c.message || "")}</p>
        <span>${escapeHtml(c.name || "익명")} · ${time}</span>
      `;
      listEl.appendChild(div);
    });
    delete window[cbName];
  };

  const script = document.createElement("script");
  script.src =
    `${SCRIPT_URL}?slug=${encodeURIComponent(SLUG)}&callback=${cbName}`;
  script.onerror = (e) => {
    console.error("JSONP load error", script.src, e);
  };
  document.body.appendChild(script);
}

// 댓글 제출 (POST, no-cors)
async function submitComment(e, SLUG, nameInput, msgInput, listEl) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = msgInput.value.trim();
  if (!message) return;

  const formData = new URLSearchParams();
  formData.append("slug", SLUG);
  formData.append("name", name);
  formData.append("message", message);

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    msgInput.value = "";
    loadComments(SLUG, listEl);
  } catch (err) {
    console.error("submitComment error", err);
    alert("댓글 저장에 실패했습니다. 나중에 다시 시도해주세요.");
  }
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.COMMENT_CONFIG || {};
  const SLUG = cfg.slug;
  if (!SLUG) return;

  const form      = document.getElementById("commentForm");
  const nameInput = document.getElementById("commentName");
  const msgInput  = document.getElementById("commentMessage");
  const listEl    = document.getElementById("commentList");

  if (!form || !nameInput || !msgInput || !listEl) return;

  form.addEventListener("submit", (e) =>
    submitComment(e, SLUG, nameInput, msgInput, listEl)
  );

  loadComments(SLUG, listEl);
});
