// calculator
function calculator(operator) {
    console.log("calculator() started");
    let x = document.getElementById("input_x").value;
    let y = document.getElementById("input_y").value;
    console.log(`x = ${x}, y = ${y}`);
    x = parseInt(x);
    y = parseInt(y);
    switch (operator) {
        case 'add':
            answer = x + y;
            break;
        case 'sub':
            answer = x - y;
            break;
        case 'mul':
            answer = x * y;
            break;
        case 'div':
            answer = x / y;
            break;
        default:
            answer = 'Invalid operator';
    }
    console.log(`result = ${answer}`);
    result = document.getElementById("result");
    result.innerHTML = ''
    result.innerHTML = answer;
    return answer;
}

// write answer history
function writeAnswerLog(answer) {
    console.log(`answer = ${answer}`);
    let history = document.getElementById("history");
    let number = document.createElement("li");
    number.innerHTML = answer;
    history.appendChild(number);
    // add a hide button beside each answer
    let hide = document.createElement("button");
    hide.className = "hide";
    hide.innerHTML = "hide";
    number.appendChild(hide);
}

// clear answer history
function clearAnswerLog() {
    console.log("clearAnswerLog() started");
    let history = document.getElementById("history");
    history.innerHTML = '';
}

// hide one answer on click hide button
function hideAnswer() {
    console.log("hideAnswer is called.");
    $(this).parent().remove(); // 使用 jQuery 的 hide 方法隐藏父元素
}

// setup function
function setup() {
    document.querySelectorAll('.operator').forEach(function (button) {
        button.addEventListener('click', function () {
            let answer = calculator(button.id);
            console.log(`answer = ${answer}`);
            writeAnswerLog(answer);
        });
    });

    $("#history").on("click", ".hide", hideAnswer); // 使用 jQuery 的 on 方法为动态元素绑定事件


    document.getElementById("clear_history").addEventListener('click', function () {
        clearAnswerLog();
    });
}

setup();