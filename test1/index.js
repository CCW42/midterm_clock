let targetDateTime = null;
let countdownInterval = null;

const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const countdownDisplay = document.getElementById("timer");

// 顯示彈跳視窗
function showPopup(message) {
    alert(message); // 可以換成 modal 或 toast 效果
}

// 設定目標時間
function setTargetDateTime(inputString) {
    targetDateTime = new Date(inputString);
    console.log("已設定目標時間為:", targetDateTime);
}

// 開始倒數邏輯
function startCountdown(targetTime) {
    clearInterval(countdownInterval); // 清除前一個倒數

    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeLeft = targetTime - now;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = "暫停";
        } else {
            const hours = String(Math.floor(timeLeft / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
            const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');
            countdownDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }, 1000);
}

// 開始按鈕事件
startButton.addEventListener("click", () => {
    const now = new Date();

    if (!targetDateTime) {
        showPopup("請先設定目標日期與時間。");
    } else if (targetDateTime <= now) {
        showPopup("目標時間已過，請重新設定。");
    } else {
        startCountdown(targetDateTime);
    }
});

// 重製按鈕事件
resetButton.addEventListener("click", () => {
    clearInterval(countdownInterval);
    countdownDisplay.textContent = "00:00:00";
    targetDateTime = null;
    document.getElementById("targetTimeInput").value = "";
});
