const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const avatarError = document.querySelector(".avatar-msg-text");
const formAvatar = document.getElementById("pfpAvatar");
const removeBtn = document.getElementById("removeBtn");
const changeBtn = document.getElementById("changeBtn");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const githubUsernameInput = document.getElementById("github");
const generateBtn = document.getElementById("generateBtn");
const form = document.getElementById("form");

const mainBody = document.querySelector(".main-body");
const successBody = document.querySelector(".success-container");

const user = document.getElementById("user");
const userEmail = document.getElementById("userEmail");
const ticketAvatar = document.getElementById("ticketAvatar");
const ticketName = document.getElementById("ticketName");
const ticketGithubUsername = document.getElementById("ticketGithubUsername");
const ticketNumber = document.getElementById("ticketNumber");

uploadArea.addEventListener("click", () => {
    if(uploadArea.classList.contains("active")){
        return
    }
    fileInput.click();
});

uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("dragover");
});
uploadArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("dragover")
    const file = e.dataTransfer.files[0];
    if(file){
        handleFile(file)
    }
})

fileInput.addEventListener("change", (e) => {
    handleFile(e.target.files[0])
});

removeBtn.addEventListener("click", (e) => {
    e. preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove("active");
    formAvatar.src = "";
    fileInput.value = "";
});

changeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fileInput.click();
})

function handleFile(file) {

    const maxSize = 500 * 1024;
    if(file.typeOf.startsWith("image/")){
        uploadArea.classList.remove("active");
        uploadArea.classList.add("error");
        avatarError.textContent = "Upload pictures only (JPG or PNG, max size: 500KB).";
        return;
    }
    else if(file.size > maxSize){
        uploadArea.classList.remove("active");
        uploadArea.classList.add("error");
        avatarError.textContent = "File too large. Please upload a photo under 500kb";
        return;
    }else{
        uploadArea.classList.remove("error");
        avatarError.textContent = "Upload your photo (JPG or PNG, max size: 500KB).";
        uploadArea.classList.add("active");
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        formAvatar.src = e.target.result;
    }

    reader.readAsDataURL(file);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-z]{2,5}$/
    const name = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const githubUsername = githubUsernameInput.value.trim();
    let isValid = false;

    if(!email.match(emailPattern)){
        emailInput.parentElement.classList.add("error");
        return;
    }
    else{
        isValid = true;
        emailInput.parentElement.classList.remove("error");
    }

    if(!name || !githubUsername){
        isValid = false;
        window.alert("Please fill out all fields")
        return;
    }else{
        isValid = true;
    }

    if(isValid){
        const randomNumber = Math.floor(Math.random() * 10000);
        const formattedRandomNumber = randomNumber.toString().padStart(5, 0);

        user.textContent = name;
        userEmail.textContent = email;
        ticketName.textContent = name;
        ticketGithubUsername.textContent = `@${githubUsername}`;
        ticketAvatar.src = formAvatar.src || "images/image-avatar.jpg";
        ticketNumber.textContent = formattedRandomNumber;

        mainBody.classList.add("success");
    }
})


