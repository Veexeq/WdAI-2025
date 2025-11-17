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

    const productsJSON = await fetchJSON("https://dummyjson.com/products");
    const numOfPositions = 30;

    for (let i = 0; i < numOfPositions; i++) {
        const productData = productsJSON.products[i];
        const product = createProductElement(
            productData.images[0],
            productData.title,
            productData.description
        );

        productsTable.appendChild(product);
    }

});