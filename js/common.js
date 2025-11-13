// js/common.js
function goHome(){
  window.location.href = "../index.html";
}

async function sharePage(){
  const url = window.location.origin + "/humanitas/index.html"; // 리포지토리 하위라면 이렇게
  try {
    await navigator.clipboard.writeText(url);
    alert("📎 페이지 링크가 복사되었습니다!");
  } catch {
    alert("복사 실패! 수동으로 복사해주세요.");
  }
}

// js/common.js

// ① Google Apps Script Web App URL (네가 발급받은 주소로 교체)
const SCRIPT_URL = 'https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbxqMXokTr2isatE-vb6YtT6oW9gmZf0BWvbZlsvPGu4hQonu3dBm7aoxhgwDPH7aHfZpw/exec/exec';

// 간단한 HTML escape (XSS 방지)
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, s => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[s]));
}

async function loadComments(SLUG, listEl) {
  try {
    const res = await fetch(`${SCRIPT_URL}?slug=${encodeURIComponent(SLUG)}`);
    const comments = await res.json();

    listEl.innerHTML = '';
    comments.forEach(c => {
      const div = document.createElement('div');
      div.className = 'comment-item';

      const time = new Date(c.timestamp).toLocaleString();

      div.innerHTML = `
        <p>${escapeHtml(c.message || '')}</p>
        <span>${escapeHtml(c.name || '익명')} · ${time}</span>
      `;
      listEl.appendChild(div);
    });
  } catch (err) {
    console.error('loadComments error', err);
  }
}

async function submitComment(e, SLUG, nameInput, msgInput, listEl) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = msgInput.value.trim();
  if (!message) return;

  const formData = new URLSearchParams();
  formData.append('slug', SLUG);
  formData.append('name', name);
  formData.append('message', message);

  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      body: formData
    });

    msgInput.value = '';
    await loadComments(SLUG, listEl); // 저장 후 목록 다시 불러오기
  } catch (err) {
    console.error('submitComment error', err);
    alert('댓글 저장에 실패했습니다. 나중에 다시 시도해주세요.');
  }
}

// 페이지 로드 후 댓글 기능 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 이 페이지에서 설정한 slug 읽기
  const cfg = window.COMMENT_CONFIG || {};
  const SLUG = cfg.slug;

  // slug 가 없으면(댓글 없는 페이지) 그냥 패스
  if (!SLUG) return;

  const form     = document.getElementById('commentForm');
  const nameInput = document.getElementById('commentName');
  const msgInput  = document.getElementById('commentMessage');
  const listEl    = document.getElementById('commentList');

  // 요소가 없으면 역시 패스
  if (!form || !nameInput || !msgInput || !listEl) return;

  form.addEventListener('submit', (e) =>
    submitComment(e, SLUG, nameInput, msgInput, listEl)
  );

  loadComments(SLUG, listEl);
});

// 공통 버튼용 (이미 쓰고 있던 거라면 여기에 같이 둬도 됨)
function goHome() {
  window.location.href = "../index.html";
}

async function sharePage() {
  const url = window.location.origin + "/index.html";
  try {
    await navigator.clipboard.writeText(url);
    alert("📎 페이지 링크가 복사되었습니다!");
  } catch (err) {
    alert("복사 실패! 수동으로 복사해주세요.");
  }
}

