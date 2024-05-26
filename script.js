document.addEventListener("DOMContentLoaded", function() {
    var textBox = document.getElementById("textbox");
    textBox.style.display = "none";
});

var interval; // Declare interval variable globally

function showTextBox() {
    var textBox = document.getElementById("textbox");
    var question = document.getElementById("the-question");
    var overlay = document.getElementById("overlay");
    var yesBtn = document.getElementById("yes-button");
    var noBtn = document.getElementById("no-button");

    textBox.style.display = "block";
    question.style.display = "none";
    overlay.style.display = "block"; // Show overlay
    yesBtn.style.display = "none";
    noBtn.style.display = "none";

    interval = showLettersOneByOne(); // Assign interval to global variable
    disableInteractions(); // Disable interactions with other elements
}

function showLettersOneByOne() {
    var text = "הכרתי אותך בכיתה ז' לפני 6 שנים, במשך השנים שעברו עברנו המון דברים ביחד, גם טובים וגם פחות, אך תמיד בסוף הסתדרנו ונשארנו חברים הכי טובים ואני (ומקווה שגם את) שמח מזה. כאות תודה על כל השנים שנאלצת לסבול אותי, ומהרצון להזמין את הילדה הכי יפה, אני אשמח להזמין אותך לפרום";
    var index = 0;
    var textBox = document.getElementById("letter-text");
    return setInterval(function() {
        if (index < text.length) {
            playSound(); // Play sound for each letter
            textBox.textContent += text[index];
            index++;
        } else {
            clearInterval(interval); // Clear interval when text is fully shown
            var question = document.getElementById("the-question");
            question.style.display = "block";
            pauseSound(); // Stop the sound
            showButtons(); // Show buttons when text is fully shown
        }
    }, 50); // Adjust the interval as needed (milliseconds between each letter)
}

function playSound() {
    var sound = document.getElementById("sound");
    sound.play();
}

function pauseSound() {
    var sound = document.getElementById("sound");
    sound.pause();
    sound.currentTime = 0; // Reset sound to beginning
}

function disableInteractions() {
    // Disable interactions with other elements
    var overlay = document.getElementById("overlay");
    overlay.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent clicks on the overlay from reaching underlying elements
    });
}

function showButtons() {
    var yesButton = document.getElementById("yes-button");
    var noButton = document.getElementById("no-button");
    yesButton.style.display = "inline-block";
    noButton.style.display = "inline-block";

    var yesFontSize = 24; // Initial font size for the "Yes" button
    var noFontSize = 16; // Initial font size for the "No" button
    var yesPadding = 15; // Initial padding for the "Yes" button
    var noPadding = 15; // Initial padding for the "No" button
    var counter = 1;

    var interval = setInterval(function() {
        yesFontSize += 0.1; // Increase the font size of the "Yes" button every second
        noFontSize -= 0.1; // Decrease the font size of the "No" button every second
        yesPadding += 0.1; // Increase the padding of the "Yes" button every second
        noPadding -= 0.1; // Decrease the padding of the "No" button every second

        // Apply the new font sizes and padding to the buttons
        yesButton.style.fontSize = yesFontSize + 'px';
        noButton.style.fontSize = noFontSize + 'px';
        yesButton.style.padding = yesPadding + 'px ' + (yesPadding * 2) + 'px';
        noButton.style.padding = noPadding + 'px ' + (noPadding * 2) + 'px';

        // Check if the "No" button font size is smaller than a certain threshold
        if (noFontSize <= 1) {
            clearInterval(interval); // Stop adjusting the font sizes when the "No" button is really small
        }

        if(yesFontSize > 37)
        {
            counter++;
            yesButton.textContent = '!' + yesButton.textContent;   
        }

    }, 70); // Adjust the interval as needed
}

function sendResponse(response) {
    if (response === 'yes') 
    {
        var textBox = document.getElementById("textbox");
        var overlay = document.getElementById("overlay");
        var yesBtn = document.getElementById("yes-button");
        var noBtn = document.getElementById("no-button");
        var gif = document.getElementById("gif");
        var sub = document.getElementById("sub-gif-msg");
        var msg = document.getElementById("yes-message");
        var heart = document.getElementById("heart");

        textBox.style.display = "none";
        overlay.style.display = "none"; 
        yesBtn.style.display = "none";
        noBtn.style.display = "none";
        gif.style.display = "none";
        sub.style.display = "none";
        msg.textContent = "או שיט לא ציפיתי להגיע כזה רחוק אז העמוד הזה לא מתוכנן, אבל תודה שאת מסכימה לסבול אותי לעוד ערב";
        msg.style.display = "block";
        heart.style.display = "block";
        createSprinkles();
    }
}
function blockNo() {
    // You can add additional logic here if needed
    alert("To select 'No', please proceed with the payment.");
}

function createSprinkles() {
    const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
  
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
  
    const particleCount = 50 * (timeLeft / duration);
  
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}