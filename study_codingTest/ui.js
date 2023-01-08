const ADinfo = [
  ['A', '10', '20', 'F'],
  ['B', '1', '2', 'M'],
];
const logs = [
  ['C', 'A', '', 'M'], // A: 20 클릭
  ['V', 'B', '30', 'M'], // B: 2 시청
  ['C', 'B', '', 'F'], //B: 2 클릭
  ['V', 'A', '50', 'F'], //A: 20 시청
];
const A = {}; // 클릭
const B = {}; // 시청

function solution(ADinfo, logs) {
  let answer = '';

  logs.forEach((e, i) => {
    ADinfo.forEach((a, d) => {
      // 광고 아이디가 같다면
      if (e[1] === a[0]) {
        // 광고 노출이 클릭, 아니면 시청
        if (e[1] === 'A') {
          if (e[0] === 'C') {
            // 클릭 수익
            A[e[1]] = Number(a[2]);
            if (e[3] === a[3]) {
              A[e[1]] = Number(a[2]) * 2;
            }
          } else if (e[0] === 'V') {
            // 시청 수익
            B[e[1]] = Number(a[1]);

            if (e[3] === a[3]) {
              B[e[1]] = Number(a[1]) * 2;
            }

            if (e[2] > 50) {
              B[e[1]] = Math.floor(Number(a[1]) / 2);
            }
          }
        }

        if (e[1] === 'B') {
          if (e[0] === 'C') {
            // 클릭 수익
            A[e[1]] = Number(a[2]);

            if (e[3] === a[3]) {
              A[e[1]] = Number(a[2]) * 2;
            }
          } else if (e[0] === 'V') {
            // 시청 수익
            B[e[1]] = Number(a[1]);
            if (e[3] === a[3]) {
              B[e[1]] = Number(a[1]) * 2;
            }

            if (e[2] > 50) {
              B[e[1]] = Math.floor(Number(a[1]) / 2);
            }
          }
        }
      }
    });
  });

  console.log(A, B);

  const newA = { A: A.A + B.A };
  const newB = { B: A.B + B.B };
  const C = { ...newA, ...newB }; //const C = Object.assign(A, B, {});
  const newArr = Object.entries(C);

  const max = Math.max(newArr[0][1], newArr[1][1]);

  console.log(newA);
  console.log(newB);
  console.log(C);
  console.log(max);

  const An = function () {
    newArr.forEach((e) => {
      if (e.indexOf(max) === -1) {
        return e;
      }
      answer = e[0];
    });
  };
  An();
  console.log(answer);
  return answer;
}
solution(ADinfo, logs);

// 광고 정보 : ["광고ID", "시청단가", "클릭단가", "타겟"]
// 광고 노출 상황 : ["시청 or 클릭", "광고ID", "시청률 or 빈 값", 타겟] -> 클릭 발생 시 빈값으로 표기하며, 시청률은 숫자(% 기호 생략)

// 광고 'A'를 시청하면 10원, 클릭하면 20원, 타겟은 여성
// 광고 'B'를 시청하면 30원, 클릭하면 40원, 타겟은 남성
// 타겟이 일치하면 수익을 2배

// 'A'광고를 남성이 클릭함 : 20원 수익
// 'B'광고를 남성이 시청함 : 60원 수익
// 'B'광고를 여성이 클릭함 : 30원 수익

// 수익이 많은 광고를 출력 (기대값 : 'B')
