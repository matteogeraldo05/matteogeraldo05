// Change the title to "Matteogeraldo05"
function normalTitle() {
    document.title = "Matteogeraldo05";
}

// Change the title to "Leaving So Soon?"
function newTitle() {
    document.title = "Leaving So Soon?";
}

// Change title when out/in focus
window.onblur = newTitle;
window.onfocus = normalTitle;

window.onload = function() {
    // Typing effect for name
    typeOutText("Hello, my name is", 100, function() {
        const nameText = document.getElementById('name-text');
        nameText.style.visibility = 'visible'; // Make the name visible
        typeOutText("Matteo De Angelis Geraldo", 100);
    });

    // Typing function
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

    // Sidebar fade-in functionality
    const icons = document.querySelectorAll(".sidebar-buttons input, .sidebar-buttonIco input");
    icons.forEach((icon, index) => {
        setTimeout(() => {
            icon.classList.add("fade-in");
        }, index * 150); // stagger the fade-in by 150ms
    });
};
