const tabLinks = document.getElementsByClassName("tab-links");
const tabContents = document.getElementsByClassName("tab-contents");


function openTab(tabName) {
    for (tabLink of tabLinks) {
        tabLink.classList.remove("active-link")
    }
    for (tabContent of tabContents) {
        tabContent.classList.remove("active-tab")
    }
    event.currentTarget.classList.add("active-link")
    document.getElementById(tabName).classList.add("active-tab")
}

const sideMenu = document.getElementById("side-menu");

function openMenu() {
    sideMenu.style.right = "0";
}

function closeMenu() {
    sideMenu.style.right = "-200px";
}


const partial = document.querySelector(".partial")
const seeMore = document.getElementById("see-more")

seeMore.addEventListener("click", _ => {
    partial.classList.toggle("full")

    partial.classList.contains("full") ? seeMore.innerText = "See Less" : seeMore.innerText = "See More";
})


const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Message Sent Successfully!";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});

const unHideBtn = document.querySelector(".unhide-btn");
const work = document.querySelectorAll(".second-row");


unHideBtn.addEventListener("click", _=> {
    work.forEach(element => {
        if (element.classList.contains("hide")) {
            element.classList.remove("hide");
            unHideBtn.innerText = "See Less";
        } else {
            element.classList.add("hide");
            unHideBtn.innerText = "See More";
        }
    })
})
