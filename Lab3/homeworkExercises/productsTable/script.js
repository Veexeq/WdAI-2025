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

    function initialPrint(numOfPositions) {
        for (let i = 0; i < numOfPositions; i++) {
            const productData = productsJSON.products[i];
            const product = createProductElement(
                productData.images[0],
                productData.title,
                productData.description
            );

            productsTable.appendChild(product);
        }
    }

    // Show all elements which 'title' matches with 'phrase'
    function searchByPhrase(phrase) {
        // Skip the first <tr> since it's the header
        productsElementArray = Array.from(productsTable.children).slice(1);
        productsElementArray.forEach(element => {
            
            // Title is always the second one
            const elementTitle = element[1];
            if (!elementTitle.includes(phrase)) {
                productsTable.removeChild(element);
            }
        });
    }

    const productsJSON = await fetchJSON("https://dummyjson.com/products");
    initialPrint(30);

    searchByPhrase();

});