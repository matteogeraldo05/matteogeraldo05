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

    const commands = {
        "echo": (args) => args.join(" "),
        "cls": () => {
            terminal.innerHTML = splashText;
            return "";
        },
        "help": () => "Commands:\n\necho\ncls\nhelp\ncd\ncolor",
        "cd": (args) => {
            if (args.length > 0) {
                const destination = args[0];
                window.location.href = destination + ".html";
            } else {
                return "The system cannot find the path specified.";
            }
        },
        "onepiece.exe": () => "WEAREWEGOSUNNY!",
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
        if (event.key === "Enter") {
            const userInput = input.value.trim();
            terminal.innerHTML += currentPrompt + userInput + "\n";
            processCommand(userInput);
            input.value = "";
            terminal.scrollTop = terminal.scrollHeight;
        }
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