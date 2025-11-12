/* =========================================================
   main.js — 독서 성향 테스트 (2지선다형 MBTI형, 개선판) [fixed]
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

  for (let i = 1; i <= 8; i++) {
    const ans = localStorage.getItem(`Q${i}`);
    if (ans) {
      answers[`Q${i}`] = ans;
      if (ans === "A") countA++;
      if (ans === "B") countB++;
    }
  }

  let type = "";
  if (countA > countB) type = "HEAL";
  else if (countB > countA) type = "MEAN";
  else type = "MIX";

  let resultPage = "";

  // HEAL: 공중그네 / 당신이 옳다
  if (type === "HEAL") {
    resultPage = (answers.Q8 === "A")
      ? "result_heal_kangaroo.html"
      : "result_heal_yourmind.html";
  }

  // MEAN: 순서 매우 중요 (겹치는 케이스 우선 처리)
  else if (type === "MEAN") {
    const q4 = answers.Q4, q5 = answers.Q5, q6 = answers.Q6, q7 = answers.Q7, q8 = answers.Q8;

    // 1) Q7+B & Q8+B → 소년이 온다
    if (q7 === "B" && q8 === "B") {
      resultPage = "result_mean_boy.html";
    }
    // 2) Q7+A & Q8+B → 이끼숲
    else if (q7 === "A" && q8 === "B") {
      resultPage = "result_mean_moss.html";
    }
    // 3) Q4+A & Q8+B → 소네트집
    else if (q4 === "A" && q8 === "B") {
      resultPage = "result_mean_sonnet.html";
    }
    // 4) Q4+B & Q8+B → 야간비행
    else if (q4 === "B" && q8 === "B") {
      resultPage = "result_mean_nightflight.html";
    }
    // 5) Q4+B & Q6+B → 연금술사
    else if (q4 === "B" && q6 === "B") {
      resultPage = "result_mean_alchemist.html";
    }
    // 6) Q5=B(논리) → 죽음이란 무엇인가
    else if (q5 === "B") {
      resultPage = "result_mean_kagan.html";
    }
    // 7) Q7=B(고전·증언) → 죽음의 수용소에서
    else if (q7 === "B") {
      resultPage = "result_mean_frankl.html";
    }
    else {
      resultPage = "result_mean_frankl.html"; // 기본값
    }
  }

  // MIX: 혼합형
  else if (type === "MIX") {
    const q4 = answers.Q4, q6 = answers.Q6, q7 = answers.Q7, q8 = answers.Q8;

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
    } else if (q4 === "A" && q8 === "A") {
      resultPage = "result_heal_kangaroo.html";
    } else {
      resultPage = "result_heal_yourmind.html";
    }
  }

  if (resultPage) {
    window.location.href = `results/${resultPage}`;
  } else {
    alert("결과를 계산할 수 없습니다. 다시 시도해주세요.");
  }
}
