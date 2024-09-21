// change the title to matteogeraldo05
function normalTitle() {
    document.title = "Matteogeraldo05";
}

// change the title to this
function newTitle() {
    document.title = "Leaving So Soon?";
}

// change title when out/in focus
window.onblur = newTitle;
window.onfocus = normalTitle;

window.onload = function() {
    const terminal = document.getElementById("output");
    const input = document.getElementById("input");
    const prompt = document.getElementById("prompt");
    const terminalContainer = document.getElementById("terminal");
  
    const splashText = "MatteOS [Version 11.26]\n(c) MatteOS. All rights reserved.\n\n";
    let currentPrompt = "C:\\";

    // Call the function to type out the greeting text first, then reveal the name
    typeOutText("Hello, my name is", 100, function() {
        const nameText = document.getElementById('name-text');
        nameText.style.visibility = 'visible'; // Make the name visible
        typeOutText("Matteo De Angelis Geraldo", 100);
    });

    function typeOutText(text, speed, callback) {
    const targetElement = document.getElementById(text.includes("name") ? 'greeting-text':'name-text');
    targetElement.classList.add('typing-effect'); // Add blinking cursor
    targetElement.innerHTML = ''; // Clear existing text
    let i = 0;

    function type() {
        if (i < text.length) {
            targetElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            targetElement.classList.remove('typing-effect'); // Remove cursor when done
            if (callback) callback(); // Call the callback function when done
        }
    }
    type();
}
    

    // splash text
    terminal.innerHTML += splashText;
    // autoscroll down
    terminal.scrollTop = terminal.scrollHeight; 

    // wherever on the terminal you click it defaults to the input line
    terminalContainer.addEventListener("click", function() {
        input.focus();
    });

    const colors = {
        red: "var(--terminal_red)",
        green: "var(--terminal_green)",
        yellow: "var(--terminal_yellow)",
        blue: "var(--terminal_blue)",
        purple: "var(--terminal_purple)",
        cyan: "var(--terminal_cyan)",
        white: "var(--terminal_white)"
    };

    // audio for keypresses and key releases
    const audioElements = {
        backspaceKeyPress: new Audio("audio/press/BACKSPACE.mp3"),
        enterKeyPress: new Audio("audio/press/ENTER.mp3"),
        spacebarKeyPress: new Audio("audio/press/SPACE.mp3"),
        genericKeyPress: new Audio("audio/press/GENERIC_R0.mp3"),
        backspaceKeyRelease: new Audio("audio/release/BACKSPACE.mp3"),
        enterKeyRelease: new Audio("audio/release/ENTER.mp3"),
        spacebarKeyRelease: new Audio("audio/release/SPACE.mp3"),
        genericKeyRelease: new Audio("audio/release/GENERIC.mp3"),
        weAreAudio: new Audio("audio/we_are.mp3")
    };

    // detect key input then play sound accordingly
    const soundMap = {
        "Backspace": {
            keyDown: audioElements.backspaceKeyPress,
            keyUp: audioElements.backspaceKeyRelease
        },
        "Enter": {
            keyDown: audioElements.enterKeyPress,
            keyUp: audioElements.enterKeyRelease
        },
        " ": {
            keyDown: audioElements.spacebarKeyPress,
            keyUp: audioElements.spacebarKeyRelease
        }
    };
    
    function playSound(event, isKeyDown) {
        const key = event.key;
        const sound = soundMap[key];
        
        if (sound) {
            (isKeyDown ? sound.keyDown : sound.keyUp)?.play();
        } else {
            (isKeyDown ? audioElements.genericKeyPress : audioElements.genericKeyRelease)?.play();
        }
    }

    const commands = {
        //repeat user input
        "echo": (args) => args.join(" "),
        //clear screen
        "cls": () => {
            terminal.innerHTML = splashText;
            return "";
        },
        //list commands
        "help": () => "Commands:\n\nhelp          -> list of commands\n"+
        "echo {text}   -> repeats input\n"+
        "cls           -> clears terminal\n"+
        "cd {html}     -> redirects to the html page\n"+
        "color {color} -> changes terminal color\n"+
        "dir           -> shows list of files\n"+
        "exit          -> closes tab\n",
        //change directory
        "cd": (args) => {
            if ((args.length > 0) && (args == "about" || args == "projects" || args == "contact")) {
                const destination = args[0];
                window.location.href = destination + ".html";
            } else {
                return "The system cannot find the path specified.";
            }
        },
        //list directory
        "dir": () => "2024-06-16  12:33 PM    {DIR}      about\n" +
                     "2024-07-14   4:12 PM    {DIR}      projects\n" +
                     "2024-08-22  12:33 PM    {DIR}      contact\n" +
                     "2024-09-17  11:54 AM    {EXE}      virus.exe\n",
        //close site
        "exit": () => {close();},
        //change terminal color
        "color": (args) => {
            if (args.length > 0) {
                const colorName = args[0].toLowerCase();
                if (colors[colorName]) {
                    const selectedColor = colors[colorName];
                    // Apply color to terminal, prompt, and input
                    terminal.style.color = selectedColor;
                    prompt.style.color = selectedColor;
                    input.style.color = selectedColor;
                    return `Text color changed to ${colorName}.`;
                } else {
                    return `Invalid color. Available colors: ${Object.keys(colors).join(", ")}.`;
                }
            } else {
                return "Please specify a color.";
            }
        },
        //EASTER EGGS
        //one piece easter egg
        "onepiece.exe": () => {
            terminal.innerHTML += "now playing: 🎶 We Are 🎶\n";
            audioElements.weAreAudio.play(); // Play the BEST ANIME OPENING OF ALL TIME
            return "";
        },
        "silly.bat": () => {
            // Change all <img> elements' src attributes
            const imageInputs = document.querySelectorAll('input[type="image"]');
            imageInputs.forEach(input => {
                input.src = "images/car.jpg"; // Replace with your desired image path
            }); 
            return "wait, im websited";
        },
        //virus easter egg
        "virus.exe": () => {
            const virusText = ""+ //LOL
                "⠀⠀⠀⠀⠀⣀⡴⠖⠒⠒⢒⣒⡖⠒⠒⠒⠒⠒⠒⠶⠶⠤⣤⣀⣀⠀⠀⠀⠀⠀\n" +
                "⠀⠀⠀⠀⣴⠋⠀⠀⠤⣪⣝⡲⠯⠭⠥⠀⠀⠀⠀⠀⣀⣐⣒⡒⠉⠙⢦⡀⠀⠀\n" +
                "⠀⠀⠀⣼⠃⠀⠈⠰⠫⠋⣀⣀⣀⣀⠀⠃⠀⠀⠀⠸⠀⠀⠀⠈⠆⠀⠀⢧⠠⠀\n" +
                "⠀⣠⡾⠁⠀⡀⠠⠄⢰⣿⠿⠿⢯⣍⣙⣶⠀⠀⢀⣠⣶⣾⣿⠶⠆⠤⠤⢜⣷⡄\n" +
                "⡾⢻⢡⡞⠋⣽⠛⠲⠤⡤⠴⠋⠀⠀⠉⠁⠀⠀⠈⣿⠁⠀⢀⣀⣠⠶⠶⣽⣵⣿\n" +
                "⣇⢠⢸⡥⠶⣟⠛⠶⣤⣀⠀⠀⠀⢲⡖⣂⣀⠀⠀⠈⢳⣦⡀⠉⠉⣽⡄⠰⣻⣿\n" +
                "⠙⣮⡪⠁⠀⠻⣶⣄⣸⣍⠙⠓⠶⣤⣥⣉⣉⠀⠠⠴⠋⠁⣈⣥⣴⣿⡇⠈⣽⠃\n" +
                "⠀⠈⢻⡄⠀⠀⠙⣆⢹⡟⠷⣶⣤⣇⣀⠉⠙⡏⠉⣻⡟⢉⣹⣅⣼⣿⡇⠀⡏⠀\n" +
                "⠀⠀⠀⠻⣄⠀⠀⠈⠻⢦⡀⠀⣽⠉⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⡇⠀\n" +
                "⠀⠀⠀⠀⠙⢦⣀⠄⡀⢄⡙⠻⠧⣤⣀⣀⣿⠀⠀⣿⢀⣼⣃⣾⣼⠟⠁⠀⡇⠀\n" +
                "⠀⠀⠀⠀⠀⠀⠉⠓⢮⣅⡚⠵⣒⡤⢄⣉⠉⠉⠉⠉⠉⠉⠉⠉⢀⡠⠀⠀⣷⠀\n" +
                "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠳⢦⣄⡉⠙⠛⠃⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⡿⠀\n" +
                "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠲⠶⢤⣤⣀⣀⣀⣀⣀⣀⡤⠞⠁⠀\n";
                
            terminal.innerHTML += "your pc is going to explode now!\n";
            terminal.innerHTML += virusText;
            setTimeout(() => {
                close(); 
            }, 5000);
        }
    };

    // Handle input
    input.addEventListener("keydown", function(event) {
        playSound(event, true); // Play sound on keydown
        if (event.key === "Enter") {
            const userInput = input.value.trim();
            terminal.innerHTML += currentPrompt + userInput + "\n";
            processCommand(userInput);
            input.value = "";
            terminal.scrollTop = terminal.scrollHeight;
        }
    });

    input.addEventListener("keyup", function(event) {
        playSound(event, false); // Play sound on keyup
    });

    function processCommand(userInput) {
        const parts = userInput.split(" ");
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        if (commands[command]) {
            const result = commands[command](args);
            if (result !== undefined) {
                terminal.innerHTML += result + "\n";
            }
        } else {
            terminal.innerHTML += `${userInput} is not recognized as a command.\n`;
        }
    }

    // Sidebar functionality
    const sidebar = document.getElementById("sidebar");
    // Fade in each button with a delay
    const icons = document.querySelectorAll(".sidebar-buttons input, .sidebar-buttonIco input");
    icons.forEach((icon, index) => {
        setTimeout(() => {
            icon.classList.add("fade-in");
        }, index * 150); // stagger the fade-in by 150ms
    });
};
    