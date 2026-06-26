// 드라이버 검색 기능
// 사용 기술: input 이벤트, querySelectorAll(), includes()

// HTML 요소 가져오기
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

    // 검색어가 없으면 전체 다시 표시
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

    // 검색하면 더보기 팀 자동 펼치기
    if (moreTeams) {
        moreTeams.open = true;
    }

    // 모든 팀 카드 숨기기
    teamCards.forEach(function(teamCard) {
        teamCard.classList.add("hide-card");
    });

    // 모든 드라이버 검사
    driverCards.forEach(function(driverCard) {
        const driverName = driverCard.querySelector("h4").textContent.toLowerCase();

        if (driverName.includes(keyword)) {
            // 검색어와 일치하는 드라이버 표시
            driverCard.classList.remove("hide-card");
            driverCard.classList.add("match-driver");

            // 해당 드라이버가 속한 팀 카드 표시
            const parentTeam = driverCard.closest(".team-card");
            parentTeam.classList.remove("hide-card");

            matchCount++;
        } else {
            // 검색어와 맞지 않는 드라이버 숨기기
            driverCard.classList.add("hide-card");
            driverCard.classList.remove("match-driver");
        }
    });

    // 검색 결과 문구 표시
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

// 이벤트 연결
searchInput.addEventListener("input", searchDriver);
resetButton.addEventListener("click", resetSearch);