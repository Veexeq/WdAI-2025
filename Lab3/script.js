document.addEventListener('DOMContentLoaded', () => {
    postsDiv = document.getElementById("posts-section");
    console.log(postsDiv);
    fetch('https://dummyjson.com/posts')
        .then((res) => res.json())
        .then((data) => {
            const T = data.posts;

            const thumbsUp = document.createElement("img");
            thumbsUp.src = "https://media.istockphoto.com/id/1175303918/vector/like-icon-vector-design.jpg?s=612x612&w=0&k=20&c=3dFZEggnAyodAcj9sSnnUvSZ69LQbE9kZof7vgGvAgs=";
            thumbsUp.classList.add("reaction-icon");

            const thumbsDown = document.createElement("img");
            thumbsDown.src = "https://static.vecteezy.com/system/resources/thumbnails/001/500/443/small_2x/dislike-icon-free-vector.jpg";
            thumbsDown.classList.add("reaction-icon");

            T.forEach((element) => {
                const postElement = document.createElement("div");
                postElement.classList.add("post");
                postElement.id = element.id;

                const postTitle = document.createElement("h2");
                postTitle.innerHTML = element.title;
                const postBody = document.createElement("p");
                postBody.innerHTML = element.body;
                
                postElement.appendChild(postTitle);
                postElement.appendChild(postBody);

                reactionDiv = document.createElement("div");
                reactionDiv.classList.add("reactions")
                reactionDiv.appendChild(thumbsUp);
                reactionDiv.appendChild(thumbsDown);

                postElement.appendChild(reactionDiv);
                postsDiv.appendChild(postElement);
            });
        });
});