document.addEventListener("DOMContentLoaded", () => {
    let window_width = window.innerWidth;
    let window_height = window.innerHeight;
    if ((window_width/2)-20 < window_height) {
        document.body.classList.remove("windoWV");
        document.body.classList.add("windowVH")
    } else {
        document.body.classList.remove("windowVH");
        document.body.classList.add("windoWV")
    }
});

function reportWindowSize() {
    let window_width = window.innerWidth;
    let window_height = window.innerHeight;
    if ((window_width/2)-20 < window_height) {
        document.body.classList.remove("windoWV");
        document.body.classList.add("windowVH")
    } else {
        document.body.classList.remove("windowVH");
        document.body.classList.add("windoWV")
    }
}

window.onresize = reportWindowSize;
