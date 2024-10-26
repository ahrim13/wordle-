const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.className = "gameover-message";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#67b360";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#c9b458";
      } else block.style.background = "#787c7e";
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    handleKeyInput(key, keyCode);
  };

  const handleKeyInput = (key, keyCode) => {
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (key === "BACKSPACE") handleBackspace();
    else if (index === 5) {
      if (key === "ENTER") {
        handleEnterKey();
      } else return;
    } else if (key === "ENTER") handleEnterKey();
    else if (65 <= keyCode && keyCode <= 90) {
      if (thisBlock) {
        thisBlock.innerText = key;
        index += 1;
      }
    }
  };

  const handleVirtualKeyClick = (event) => {
    const key = event.target.dataset.key;
    if (!key) return;
    handleKeyInput(key, key.charCodeAt(0));
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#time");
      timeDiv.innerText = `${분}:${초}`;
    }

    // 주기성
    timer = setInterval(setTime, 1000);
  };

  window.addEventListener("keydown", handleKeydown);

  document.querySelectorAll(".keyboard-column").forEach((key) => {
    key.addEventListener("click", handleVirtualKeyClick);
  });

  startTimer();
}

appStart();
