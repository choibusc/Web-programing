// ==========================================
// 1. 기존 드라이버 검색 기능
// ==========================================

const searchInput = document.querySelector("#driverSearch");
const resetButton = document.querySelector("#resetSearch");
const resultText = document.querySelector("#searchResultText");

const teamCards = document.querySelectorAll(".team-card");
const driverCards = document.querySelectorAll(".team-driver");
const moreTeams = document.querySelector(".more-teams");

// 검색 결과가 없을 때 보여줄 박스 생성
const noResultBox = document.createElement("div");
noResultBox.className = "no-result";
noResultBox.textContent = "검색 결과가 없습니다.";
document.querySelector("#teams").appendChild(noResultBox);

// 드라이버 검색 함수
function searchDriver() {
    const keyword = searchInput.value.toLowerCase().trim();
    let matchCount = 0;

    if (keyword === "") {
        teamCards.forEach(function(teamCard) {
            teamCard.classList.remove("hide-card");
        });

        driverCards.forEach(function(driverCard) {
            driverCard.classList.remove("hide-card");
            driverCard.classList.remove("match-driver");
        });

        noResultBox.style.display = "none";
        resultText.textContent = "전체 드라이버가 표시되고 있습니다.";
        return;
    }

    if (moreTeams) {
        moreTeams.open = true;
    }

    teamCards.forEach(function(teamCard) {
        teamCard.classList.add("hide-card");
    });

    driverCards.forEach(function(driverCard) {
        const driverName = driverCard.querySelector("h4").textContent.toLowerCase();

        if (driverName.includes(keyword)) {
            driverCard.classList.remove("hide-card");
            driverCard.classList.add("match-driver");

            const parentTeam = driverCard.closest(".team-card");
            parentTeam.classList.remove("hide-card");

            matchCount++;
        } else {
            driverCard.classList.add("hide-card");
            driverCard.classList.remove("match-driver");
        }
    });

    if (matchCount > 0) {
        noResultBox.style.display = "none";
        resultText.textContent = matchCount + "명의 드라이버가 검색되었습니다.";
    } else {
        noResultBox.style.display = "block";
        resultText.textContent = "검색 결과가 없습니다.";
    }
}

// 검색 초기화 함수
function resetSearch() {
    searchInput.value = "";
    searchDriver();
}

// 검색 이벤트 연결
searchInput.addEventListener("input", searchDriver);
resetButton.addEventListener("click", resetSearch);


// ==========================================
// 2. 드라이버 상세정보 모달(팝업) 기능
// ==========================================

const modalOverlay = document.querySelector("#driverModal");
const closeModalBtn = document.querySelector("#closeModal");

const modalName = document.querySelector("#modalName");
const modalImage = document.querySelector("#modalImage");
const modalNumber = document.querySelector("#modalNumber");
const modalTeam = document.querySelector("#modalTeam");
const modalCountry = document.querySelector("#modalCountry");
const modalTitle = document.querySelector("#modalTitle");
const modalDesc = document.querySelector("#modalDesc");

driverCards.forEach(function(card) {
    card.addEventListener("click", function(e) {
        const driver = e.currentTarget.closest(".team-driver");

        const name = driver.dataset.name;
        const number = driver.dataset.number;
        const team = driver.dataset.team;
        const country = driver.dataset.country;
        const title = driver.dataset.title;
        const desc = driver.dataset.description;
        const imageSrc = driver.dataset.image;

        modalName.textContent = name;
        modalNumber.textContent = number;
        modalTeam.textContent = team;
        modalCountry.textContent = country;
        modalTitle.textContent = title;
        modalImage.src = imageSrc;
        modalImage.alt = name + " 사진";
        
        modalDesc.innerHTML = "<p>" + desc + "</p>";

        modalOverlay.classList.add("active");
    });
});

function closeModal() {
    modalOverlay.classList.remove("active");
}

closeModalBtn.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        closeModal();
    }
});


// ==========================================
// 3. 메인 배너(Hero) 배경 이미지 자동 슬라이드 기능
// ==========================================
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

if (slides.length > 0) {
    setInterval(function() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000);
}