// 첫 페이지(index.html)에서 호출해 기존 결과 제거
function resetTest(){
  try{
    localStorage.removeItem("scores");
  }catch(e){}
}

// 질문에서 호출: answer('Q1','A','q2.html')
function answer(q, choice, nextHref){
  // 점수 로직은 나중에 채워도 됨. 일단 기록만.
  try{
    const s = JSON.parse(localStorage.getItem("scores")||"{}");
    s[q] = choice;
    localStorage.setItem("scores", JSON.stringify(s));
  }catch(e){}
  if(nextHref) location.href = nextHref;
}
