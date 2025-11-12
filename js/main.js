// 결과 계산 (HEAL 4분기 확장판)
function calculateResult() {
  const answers = {};
  let countA = 0, countB = 0;

  for (let i = 1; i <= 8; i++) {
    const ans = localStorage.getItem(`Q${i}`);
    if (ans) {
      answers[`Q${i}`] = ans;
      if (ans === "A") countA++;
      if (ans === "B") countB++;
    }
  }
  if (Object.keys(answers).length < 8) {
    alert("모든 문항에 응답해 주세요.");
    return;
  }

  let type = "";
  if (countA > countB) type = "HEAL";
  else if (countB > countA) type = "MEAN";
  else type = "MIX";

  const q1 = answers.Q1, q2 = answers.Q2, q4 = answers.Q4, q5 = answers.Q5,
        q6 = answers.Q6, q7 = answers.Q7, q8 = answers.Q8;

  let resultPage = "";

  // ---------- HEAL (4개로 확장) ----------
  if (type === "HEAL") {
    const healSignals = (q1 === "A") + (q2 === "A") + (q5 === "A"); // 위로/가벼움 신호

    if (q8 === "A" && healSignals >= 2) {
      // 경쾌 + (A성향 2+) → 공중그네
      resultPage = "result_heal_kangaroo.html";
    } else if (q4 === "B" && q6 === "A") {
      // 여정 선호 + 쉬어가기 → 연금술사(온화한 여정)
      resultPage = "result_mean_alchemist.html";
    } else if (q8 === "B" && (q1 === "A" || q2 === "A")) {
      // 서정 + 위로 성향 → 소네트집(시적 치유)
      resultPage = "result_mean_sonnet.html";
    } else {
      // 기본: 관계적 공감 → 당신이 옳다
      resultPage = "result_heal_yourmind.html";
    }
  }

  // ---------- MEAN (기존 우선순위 유지) ----------
  else if (type === "MEAN") {
    if (q7 === "B" && q8 === "B") {
      resultPage = "result_mean_boy.html";                 // 소년이 온다
    } else if (q7 === "A" && q8 === "B") {
      resultPage = "result_mean_moss.html";                // 이끼숲
    } else if (q4 === "A" && q8 === "B") {
      resultPage = "result_mean_sonnet.html";              // 소네트집
    } else if (q4 === "B" && q8 === "B") {
      resultPage = "result_mean_nightflight.html";         // 야간비행
    } else if (q4 === "B" && q6 === "B") {
      resultPage = "result_mean_alchemist.html";           // 연금술사
    } else if (q5 === "B") {
      resultPage = "result_mean_kagan.html";               // 죽음이란 무엇인가
    } else if (q7 === "B") {
      resultPage = "result_mean_frankl.html";              // 죽음의 수용소에서
    } else {
      resultPage = "result_mean_frankl.html";
    }
  }

  // ---------- MIX (HEAL 규칙 섞어서 분배) ----------
  else {
    const healSignals = (q1 === "A") + (q2 === "A") + (q5 === "A");

    // MEAN 쪽 강한 패턴 먼저 소거
    if (q7 === "B" && q8 === "B") {
      resultPage = "result_mean_boy.html";
    } else if (q7 === "A" && q8 === "B") {
      resultPage = "result_mean_moss.html";
    } else if (q4 === "A" && q8 === "B") {
      resultPage = "result_mean_sonnet.html";
    } else if (q4 === "B" && q8 === "B") {
      resultPage = "result_mean_nightflight.html";
    } else if (q4 === "B" && q6 === "B") {
      resultPage = "result_mean_alchemist.html";
    } else {
      // 남은 경우 HEAL 4분기로 배분
      if (q8 === "A" && healSignals >= 2) {
        resultPage = "result_heal_kangaroo.html";
      } else if (q4 === "B" && q6 === "A") {
        resultPage = "result_mean_alchemist.html";
      } else if (q8 === "B" && (q1 === "A" || q2 === "A")) {
        resultPage = "result_mean_sonnet.html";
      } else {
        resultPage = "result_heal_yourmind.html";
      }
    }
  }

  window.location.href = `results/${resultPage}`;
}
