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
        return entry.includes(phrase);
    }

    function sortData(resData, sortBy) {
        switch (sortBy) {
            case "Ascending":
                resData.sort((entry1, entry2) => {
                    return entry1.localCompare(entry2);
                });
                break;
            case "Descending":
                resData.sort((entry1, entry2) => {
                    return entry2.localCompare(entry1);
                });
                break;
            default:
                break;
        }
    }

    function matchData(phrase, sorting, productsJSON, numOfPositions) {
        const resData = [];

        if (isNaN(phrase)) {
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
        resData.forEach(element => {
            const newElement = createProductElement(element[0], element[1], element[2]);
            productsTable.appendChild(newElement);
        });
    }

    const productsJSON = await fetchJSON("https://dummyjson.com/products");
    const DEFAULT_NUMBER_OF_POSITIONS = 30;

    let resData = matchData(NaN, "Originally", productsJSON, DEFAULT_NUMBER_OF_POSITIONS);
    injectElements(resData);

});