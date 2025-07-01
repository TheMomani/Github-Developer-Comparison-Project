// Github Developer comparison project

let usernameInput = document.querySelector("#userInput");
let userForm = document.querySelector(".userForm")
const errorBox = document.querySelector(".errorTXT")
const mainDiv = document.querySelector(".divHolder")
const introDiv = document.querySelector(".introDiv")
let storedUsers = []

userForm.addEventListener("reset", event =>{
    mainDiv.innerHTML = "";
    storedUsers = [];
introDiv.classList.remove("d-none")

})

userForm.addEventListener("submit", async event =>{

    event.preventDefault(); //To prevent page from reloading


    let userName = usernameInput.value 
    console.log(userName)
    try {
        let userObject = await fetch(`https://api.github.com/users/${userName}`);
        let userRepos = await fetch(`https://api.github.com/users/${userName}/repos`)
        let userReposJson = await userRepos.json()
        let userData = await userObject.json();
        console.log(userData)
        console.log(userReposJson)
        if (!userObject.ok) {
            throw new Error("User not found");
        };

        introDiv.classList.add("d-none") //to remove the large intro box
        const STARS = userReposJson.reduce((sum, repo) => {
            return sum + repo.stargazers_count;
        }, 0);

        const {
            login: NAME,
            avatar_url: IMG,
            public_repos: REPOSITORYCOUNT,
            followers: FOLLOW,
            created_at: JOIN
        } = userData;


        //Displaying:
        let userDiv = document.createElement("div")
        userDiv.classList.add("userDiv")
        let ImgDiv = document.createElement("div")
        ImgDiv.classList.add("ImgDiv")

        let userImg = document.createElement("img")
        userImg.src = IMG
        userImg.alt = `${NAME}'s profile`
        userImg.classList.add("userImg")

        let userNameDisplay = document.createElement("h4")
        userNameDisplay.classList.add("username")

        let repoCount = document.createElement("h5")
        let totalStars = document.createElement("h5")
        let followCount = document.createElement("h5")
        let dateJoin = document.createElement("h5")
        
        userNameDisplay.innerText = NAME;
        repoCount.innerText = `Repository Count ${REPOSITORYCOUNT}`;
        totalStars.innerText = `Total Stars: ${STARS}`;
        followCount.innerText = `Followers: ${FOLLOW}`;
        dateJoin.innerText = `Date Joined: ${JOIN.slice(0,-10)}`;

        mainDiv.appendChild(userDiv)
        userDiv.appendChild(ImgDiv)
        ImgDiv.appendChild(userImg)
        userDiv.appendChild(userNameDisplay)
        userDiv.appendChild(document.createElement("hr"));
        userDiv.appendChild(repoCount)
        userDiv.appendChild(document.createElement("hr"));
        userDiv.appendChild(totalStars)
        userDiv.appendChild(document.createElement("hr"));
        userDiv.appendChild(followCount)
        userDiv.appendChild(document.createElement("hr"));
        userDiv.appendChild(dateJoin)



        errorBox.classList.add("d-none")
    } catch (error){
        errorBox.classList.remove("d-none")
    }
}

)