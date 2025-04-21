let comment = [
    {
        point: 1,
        content: 'dở'
    }
];

if (localStorage.getItem("comment")) {
    comment = JSON.parse(localStorage.getItem("comment"));
} else {
    localStorage.setItem("comment", JSON.stringify(comment));
}

function setComment() {
    localStorage.setItem("comment", JSON.stringify(comment));
}

function renderComment() {
    let container = document.getElementById("comment-list");
    container.innerHTML = comment.map((t) => `
        <li>
            <span>${'★'.repeat(t.point)}${'☆'.repeat(5 - t.point)}</span>
            <b>${t.content}</b>
        </li>
    `).join('');
    setComment();
}

// Lưu rating đang chọn
let currentRating = 0;

const stars = document.querySelectorAll(".stars");
const ratingDisplay = document.getElementById("selected-rating");

stars.forEach(star => {
    star.addEventListener("click", () => {
        currentRating = parseInt(star.getAttribute("data-value"));
        ratingDisplay.textContent = `Bạn đã đánh giá: ${currentRating} sao`;
        highlightStars(currentRating);
    });
});

function highlightStars(rating) {
    stars.forEach(star => {
        const val = parseInt(star.getAttribute("data-value"));
        star.style.color = val <= rating ? "gold" : "gray";
    });
}

function submitReview() {
    const content = document.getElementById("comment-input").value.trim();

    if (currentRating === 0 || content === "") {
        alert("Vui lòng chọn số sao và nhập bình luận.");
        return;
    }

    const newComment = {
        point: currentRating,
        content: content
    };

    comment.push(newComment);
    document.getElementById("comment-input").value = "";
    currentRating = 0;
    ratingDisplay.textContent = "Bạn chưa đánh giá.";
    highlightStars(0);
    renderComment();
}

// Lần đầu tải trang
renderComment();
