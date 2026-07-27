const items = document.querySelectorAll(".slider .item");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let active = 0;

function updateSlider() {

    items.forEach((item, index) => {

        const offset = index - active;
        const abs = Math.abs(offset);

        item.style.transition = "all .45s ease";

        if (offset === 0) {

            item.style.left = "50%";
            item.style.transform =
                "translateX(-50%) scale(1)";
            item.style.opacity = "1";
            item.style.filter = "none";
            item.style.zIndex = "100";

        } else {

            const direction = offset > 0 ? 1 : -1;

            item.style.left = "50%";
            item.style.transform =
                `translateX(calc(-50% + ${direction * abs * 180}px))
                 scale(${Math.max(0.7, 1 - abs * 0.12)})`;

            item.style.opacity = abs > 3 ? "0" : String(1 - abs * 0.25);
            item.style.filter = `blur(${abs * 2}px)`;
            item.style.zIndex = String(100 - abs);
        }
    });

}

updateSlider();

next.addEventListener("click", () => {
    active = (active + 1) % items.length;
    updateSlider();
});

prev.addEventListener("click", () => {
    active = (active - 1 + items.length) % items.length;
    updateSlider();
});

/* Tastiera */

document.addEventListener("keydown", e => {

    if (e.key === "ArrowRight")
        next.click();

    if (e.key === "ArrowLeft")
        prev.click();

});

/* Swipe Mobile */

let startX = 0;

document.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) < 50) return;

    if (diff > 0)
        next.click();
    else
        prev.click();

});
