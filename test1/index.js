let targetDateTime = null;
let countdownInterval = null;
let paused = false;
let remainingTime = 0;

const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resumeButton = document.getElementById("resumeButton");
const resetButton = document.getElementById("resetButton");
const countdownDisplay = document.getElementById("timer");
const timeInput = document.getElementById("targetTimeInput");

// 顯示彈窗
function showPopup(message) {
    alert(message);
}

// 顯示倒數時間
function updateDisplay(ms) {
    const hours = String(Math.floor(ms / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((ms / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, '0');
    countdownDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// 開始倒數
function startCountdown(targetTime) {
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const now = new Date();
        remainingTime = targetTime - now;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = "00:00:00";
            showPopup("時間已到！");
            timeInput.value = "";
            targetDateTime = null;
            remainingTime = 0;
            paused = false;
            showButtons("start");
        } else {
            updateDisplay(remainingTime);
        }
    }, 1000);
}

// 輸入時間事件
timeInput.addEventListener("change", (e) => {
    targetDateTime = new Date(e.target.value);
});

// 按鈕切換控制
function showButtons(mode) {
    startButton.style.display = mode === "start" ? "inline" : "none";
    pauseButton.style.display = mode === "pause" ? "inline" : "none";
    resumeButton.style.display = mode === "resume" ? "inline" : "none";
}

// 開始按鈕
startButton.addEventListener("click", () => {
    const now = new Date();

    if (!targetDateTime) {
        showPopup("請先設定目標日期與時間。");
    } else if (targetDateTime <= now) {
        showPopup("目標時間已過，請重新設定。");
    } else {
        startCountdown(targetDateTime);
        showButtons("pause");
    }
});

// 暫停
pauseButton.addEventListener("click", () => {
    clearInterval(countdownInterval);
    paused = true;
    // 記錄剩餘時間
    showButtons("resume");
});

// 繼續
resumeButton.addEventListener("click", () => {
    const now = new Date();
    targetDateTime = new Date(now.getTime() + remainingTime);
    startCountdown(targetDateTime);
    showButtons("pause");
});

// 重置
resetButton.addEventListener("click", () => {
    clearInterval(countdownInterval);
    countdownDisplay.textContent = "00:00:00";
    timeInput.value = "";
    targetDateTime = null;
    remainingTime = 0;
    paused = false;
    showButtons("start");
});
