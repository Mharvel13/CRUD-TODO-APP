let formEL = document.getElementById("form");
let input = document.getElementById("textInput");
let message = document.querySelector(".message");
let post = document.getElementById("posts");

formEL.addEventListener("submit", function (e) {
    e.preventDefault();
    formValidation();

});

function formValidation() {
  if (!input.value) {
    message.innerHTML = "Please enter a post";
  } else {
    message.innerHTML = "";
    acceptData();
  }
}

let data = {};
// let postCount = []

let acceptData = () => {
  data["text"] = input.value;
  
//   postCount.push(1);
//   data['id'] = postCount;
// console.log(data);

    createPost();
};

let createPost = () => {
  post.innerHTML += `
    <div id="post">
        <p>${data.text}</p>
        <span class="options">
            <i class="fas fa-edit" onclick="editPost(this)"></i>
            <i class="fas fa-trash-alt" onclick="deletePost(this)"></i>
        </span>
    </div>`;

    input.value ='';
};



let deletePost = (e) => {
    e.parentElement.parentElement.remove();
}

let editPost = (e) => {
  input.value = e.parentElement.previousElementSibling.innerHTML;
  e.parentElement.parentElement.remove()

}
