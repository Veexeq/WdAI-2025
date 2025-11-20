document.addEventListener("DOMContentLoaded", async () => {
    const productsTable = document.getElementById("products-table");

    async function fetchJSON(url) {
        const response = await fetch(url);
        const productJSON = await response.json();
        return productJSON;
    }

    function createProductElement(photoLink, title, description) {
        const newRow = document.createElement("tr");
        newRow.classList.add("product");
        
        const imageCell = document.createElement("td");
        const image = document.createElement("img");
        image.src = photoLink;
        image.alt = title;
        imageCell.appendChild(image);

        const titleCell = document.createElement("td");
        titleCell.textContent = title;

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = description;

        newRow.appendChild(imageCell);
        newRow.appendChild(titleCell);
        newRow.appendChild(descriptionCell);

        return newRow;
    }

    function containsPhrase(entry, phrase) {
        return entry.toLowerCase().includes(phrase.toLowerCase());
    }

    function sortData(resData, sortBy) {
        const TITLE_INDEX = 1;

        if (sortBy === "Ascending") {
            resData.sort((a, b) => {
                const title1 = a[TITLE_INDEX].toLowerCase();
                const title2 = b[TITLE_INDEX].toLowerCase();
                if (title1 < title2) return -1;
                if (title1 > title2) return 1;
                return 0;
            });
        }

        if (sortBy === "Descending") {
            resData.sort((a, b) => {
                const title1 = a[TITLE_INDEX].toLowerCase();
                const title2 = b[TITLE_INDEX].toLowerCase();
                if (title1 < title2) return 1;
                if (title1 > title2) return -1;
                return 0;
            });
        }
    }

    function matchData(phrase, sorting, productsJSON, numOfPositions) {
        const resData = [];

        if (phrase === "") {
            for (let i = 0; i < numOfPositions; i++) {
                const currPosition = productsJSON.products[i];
                resData.push([currPosition.images[0], currPosition.title, 
                    currPosition.description]);
            }
        } else {
            for (let i = 0; i < numOfPositions; i++) {
                const currPosition = productsJSON.products[i];
                if (containsPhrase(currPosition.title, phrase)) {
                    resData.push([currPosition.images[0], currPosition.title, 
                        currPosition.description]);
                }
            }
        }

        sortData(resData, sorting);

        return resData;
    }

    function injectElements(resData) {
        // Firstly, remove all existing entries
        const allRows = productsTable.querySelectorAll(".product");
        allRows.forEach(row => {row.remove()});

        resData.forEach(element => {
            const newElement = createProductElement(element[0], element[1], element[2]);
            productsTable.appendChild(newElement);
        });
    }

    const productsJSON = await fetchJSON("https://dummyjson.com/products");
    const DEFAULT_NUMBER_OF_POSITIONS = 30;

    // Initial print - first n elements
    let resData = matchData("", "Originally", productsJSON, DEFAULT_NUMBER_OF_POSITIONS);
    injectElements(resData);

    const searchBar = document.getElementById("filter-text");
    const searchBtn = document.getElementById("search-btn");
    const filterMode = document.getElementById("filter-mode");

    searchBtn.addEventListener("click", () => {
        const searchText = searchBar.value;
        const filter = filterMode.value;

        resData = matchData(searchText, filter, productsJSON, DEFAULT_NUMBER_OF_POSITIONS);
        
        
        injectElements(resData);
    });

});