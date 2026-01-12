document.addEventListener("DOMContentLoaded", () => {
    // html file
    const html = document.documentElement;
    // light and dark mode toggles
    const sun = document.getElementById("sun");
    const moon = document.getElementById("moon");
    // clear local storage
    const trash = document.getElementById("trash");

    // apply theme
    function applyTheme(theme) {
        if (theme === "dark") {
            html.classList.remove("light");
            html.classList.add("dark");
            sun.style.display = "none";
            moon.style.display = "inline";
        } else {
            html.classList.remove("dark");
            html.classList.add("light");
            sun.style.display = "inline";
            moon.style.display = "none";
        }
    };

    // load theme from localstorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
        applyTheme(savedTheme);
    } else {
        // default = light
        applyTheme("light");
    }

    // toggle themes
    function toggleTheme() {
        if (html.classList.contains("light")) {
            applyTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            applyTheme("light");
            localStorage.setItem("theme", "light");
        }
    };

    // clear localstorage
    function clearLocalStorage() {
        localStorage.clear();
        // reset everything to default
        html.classList.remove("dark");
        html.classList.add("light");
        sun.style.display = "inline";
        moon.style.display = "none";
        alert("LocalStorage has been cleared.")
    };

    // listeners
    sun.addEventListener("click", toggleTheme);
    moon.addEventListener("click", toggleTheme);
    trash.addEventListener("click", clearLocalStorage);
})