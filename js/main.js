/* =========================================================
   main.js — 독서 성향 테스트 (2지선다형 MBTI형, 개선판) [balanced]
   ========================================================= */

// 보기 선택
function chooseAnswer(question, answer, nextPage) {
  localStorage.setItem(question, answer);
  window.location.href = nextPage;
}

// 결과 계산
function calculateResult() {
  const answers = {};
  let countA = 0, countB = 0;

  // Q1~Q8 수집
  for (let i = 1; i <= 8; i++) {
    const ans = localStorage.getItem(`Q${i}`);
    if (ans) {
      answers[`Q${i}`] = ans;
      if (ans === "A") countA++;
      if (ans === "B") countB++;
    }
  }

  // 모든 문항 체크(선택)
  if (Object.keys(answers).length < 8) {
    alert("모든 문항에 응답해 주세요.");
    return;
  }

  // 타입 결정
  let type = "";
  if (countA > countB) type = "HEAL";
  else if (countB > countA) type = "MEAN";
  else type = "MIX";

  let resultPage = "";

  // ===== HEAL: 공중그네 vs 당신이 옳다 (편향 완화) =====
  if (type === "HEAL") {
    const healSignals =
      (answers.Q1 === "A") + (answers.Q2 === "A") + (answers.Q5 === "A");
    if (answers.Q8 === "A" && healSignals >= 2) {
      resultPage = "result_heal_kangaroo.html";   // 공중그네
    } else {
      resultPage = "result_heal_yourmind.html";   // 당신이 옳다
    }
  }

  // ===== MEAN: 우선순위 유지 =====
  else if (type === "MEAN") {
    const q1 = answers.Q1, q2 = answers.Q2, q4 = answers.Q4, q5 = answers.Q5,
          q6 = answers.Q6, q7 = answers.Q7, q8 = answers.Q8;

    if (q7 === "B" && q8 === "B") {
      resultPage = "result_mean_boy.html";              // 소년이 온다
    } else if (q7 === "A" && q8 === "B") {
      resultPage = "result_mean_moss.html";             // 이끼숲
    } else if (q4 === "A" && q8 === "B") {
      resultPage = "result_mean_sonnet.html";           // 소네트집
    } else if (q4 === "B" && q8 === "B") {
      resultPage = "result_mean_nightflight.html";      // 야간비행
    } else if (q4 === "B" && q6 === "B") {
      resultPage = "result_mean_alchemist.html";        // 연금술사
    } else if (q5 === "B") {
      resultPage = "result_mean_kagan.html";            // 죽음이란 무엇인가
    } else if (q7 === "B") {
      resultPage = "result_mean_frankl.html";           // 죽음의 수용소에서
    } else {
      resultPage = "result_mean_frankl.html";           // 기본값
    }
  }

  // ===== MIX: HEAL-공중그네 조건을 동일하게 적용 =====
  else if (type === "MIX") {
    const q1 = answers.Q1, q2 = answers.Q2, q4 = answers.Q4, q5 = answers.Q5,
          q6 = answers.Q6, q7 = answers.Q7, q8 = answers.Q8;

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
      // HEAL스러운 혼합일 때만 공중그네, 아니면 '당신이 옳다'
      const healSignals =
        (q1 === "A") + (q2 === "A") + (q5 === "A");
      if (q8 === "A" && healSignals >= 2) {
        resultPage = "result_heal_kangaroo.html";
      } else {
        resultPage = "result_heal_yourmind.html";
      }
    }
  }

  // 이동
  window.location.href = `results/${resultPage}`;
}
