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
