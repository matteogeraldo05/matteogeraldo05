// change the title to matteogeraldo05
function normalTitle() {
    document.title = "matteogeraldo05";
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
    let currentPrompt  = "C:\\";

    // splash text
    terminal.innerHTML += splashText;
    // autoscroll down
    terminal.scrollTop = terminal.scrollHeight; 

    // wherever on the terminal you click it defaults to the inpput line
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
    // audio files from kbs.im
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
        'Backspace': {
            keyDown: audioElements.backspaceKeyPress,
            keyUp: audioElements.backspaceKeyRelease
        },
        'Enter': {
            keyDown: audioElements.enterKeyPress,
            keyUp: audioElements.enterKeyRelease
        },
        ' ': {
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
        "echo": (args) => args.join(" "),
        "cls": () => {
            terminal.innerHTML = splashText;
            return "";
        },
        "help": () => "Commands:\n\nhelp          -> list of commands\necho {text}   -> repeats input\ncls           -> clears terminal\ncd {html}     -> redirects to the html page\ncolor {color} -> changes terminal color\ndir           -> shows list of files\nexit          -> closes tab\n",
        "cd": (args) => {
            if (args.length > 0) {
                const destination = args[0];
                window.location.href = destination + ".html";
            } else {
                return "The system cannot find the path specified.";
            }
        },
        "onepiece.exe": () => {
            terminal.innerHTML += "now playing: 🎶 We Are 🎶\n";
            audioElements.weAreAudio.play(); // Play the BEST ANIME OPENING OF ALL TIME
            return "";
        },
        "virus.exe": () => {
        const virusText = "⠀⠀⠀⠀⠀⣀⡴⠖⠒⠒⢒⣒⡖⠒⠒⠒⠒⠒⠒⠶⠶⠤⣤⣀⣀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⣴⠋⠀⠀⠤⣪⣝⡲⠯⠭⠥⠀⠀⠀⠀⠀⣀⣐⣒⡒⠉⠙⢦⡀⠀⠀\n⠀⠀⠀⣼⠃⠀⠈⠰⠫⠋⣀⣀⣀⣀⠀⠃⠀⠀⠀⠸⠀⠀⠀⠈⠆⠀⠀⢧⠠⠀\n⠀⣠⡾⠁⠀⡀⠠⠄⢰⣿⠿⠿⢯⣍⣙⣶⠀⠀⢀⣠⣶⣾⣿⠶⠆⠤⠤⢜⣷⡄\n⡾⢻⢡⡞⠋⣽⠛⠲⠤⡤⠴⠋⠀⠀⠉⠁⠀⠀⠈⣿⠁⠀⢀⣀⣠⠶⠶⣽⣵⣿\n⣇⢠⢸⡥⠶⣟⠛⠶⣤⣀⠀⠀⠀⢲⡖⣂⣀⠀⠀⠈⢳⣦⡀⠉⠉⣽⡄⠰⣻⣿\n⠙⣮⡪⠁⠀⠻⣶⣄⣸⣍⠙⠓⠶⣤⣥⣉⣉⠀⠠⠴⠋⠁⣈⣥⣴⣿⡇⠈⣽⠃\n⠀⠈⢻⡄⠀⠀⠙⣆⢹⡟⠷⣶⣤⣇⣀⠉⠙⡏⠉⣻⡟⢉⣹⣅⣼⣿⡇⠀⡏⠀\n⠀⠀⠀⠻⣄⠀⠀⠈⠻⢦⡀⠀⣽⠉⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⡇⠀\n⠀⠀⠀⠀⠙⢦⣀⠄⡀⢄⡙⠻⠧⣤⣀⣀⣿⠀⠀⣿⢀⣼⣃⣾⣼⠟⠁⠀⡇⠀\n⠀⠀⠀⠀⠀⠀⠉⠓⢮⣅⡚⠵⣒⡤⢄⣉⠉⠉⠉⠉⠉⠉⠉⢀⡠⠀⠀⠀⣷⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠳⢦⣄⡉⠙⠛⠃⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⡿⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠲⠶⢤⣤⣀⣀⣀⣀⣀⣀⡤⠞⠁⠀\n";
            
            terminal.innerHTML += "your pc is going to explode now!\n";
            terminal.innerHTML += virusText;
            setTimeout(() => {
                close; 
            }, 5000);
        },
        "dir": () => "2024-06-16  12:33 PM    {DIR}      about\n2024-07-14   4:12 PM    {DIR}      projects\n2024-08-22  12:33 PM    {DIR}      contact\n2024-09-17  11:54 AM    {EXE}      virus.exe\n",
        "exit": () => {close();},
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
};