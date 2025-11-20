const countElement = document.getElementById("count");
let c = 0;

fetch('https://dummyjson.com/todos')
    .then((res) => res.json())
    .then((data) => {

        data.todos.forEach(element => {
            if (element.completed) {
                c += 1;
            }
        });
        
    countElement.textContent = c.toString();    
    });
