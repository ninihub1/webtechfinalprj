var button = document.getElementById("get-response");
button.addEventListener("click", function() {

    var responseArea = document.getElementById("response-area");
    var jokesCheckbox = document.getElementById("jokes-generator");

    if (!jokesCheckbox.checked) {
        responseArea.textContent = "Check the box before proceeding!";
        console.error("Check the box before proceeding!");
    }

    if (jokesCheckbox.checked) {
        var limit = document.getElementById("api-content").value;
        if (limit > 30) {
            responseArea.textContent = "The value is over the limit!";
            console.error("The value is over the limit!");
            return;
        }
        if (limit === null || limit === "") {
            responseArea.textContent = "No value inserted for jokes limit!";
            console.error("No value inserted for jokes limit!");
            return;
        }
        const getJokesFromAPI = async () => {
            const apiKey = "YMipbdyEfq2soGKOx/LBqQ==GVqympt7u9Ib2Ypw";
            try {
                const jokesResponse = await fetch("https://api.api-ninjas.com/v1/jokes?limit=" + limit, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        "X-API-Key": apiKey
                    }
                });
                const jokesJsonResponse = await jokesResponse.json()
                    .then(jokesJsonResponse => {
                        let jokes = [];
                        for (let i = 0; i < jokesJsonResponse.length; i++) {
                            jokes += jokesJsonResponse[i].joke;
                        }
                        responseArea.textContent = jokes;
                    })
            } catch (error) {
                console.error("Error fetching jokes from the API, please try again!");
                responseArea.textContent = "Error fetching jokes from the API, please try again!";
            }
        }
        getJokesFromAPI();
    }
});
