let body = document.body;
const themeBtn = document.querySelector('.theme-btn');
const themeIcon = document.querySelector('.theme-btn i');

themeBtn.addEventListener('click', ()=>{
    const currentTheme = body.dataset.theme;

    if(currentTheme === "light"){
        body.dataset.theme = "dark";
        themeIcon.className = "ri-sun-fill";
    }else{
        body.dataset.theme = "light";
        themeIcon.className = "ri-moon-fill";
    }

    saveData('theme', body.dataset.theme);
})

function loadTheme(){
    let savedTheme = getData('theme');

    if(savedTheme){
        document.body.dataset.theme = savedTheme;

        themeIcon.className = savedTheme === "dark" ? "ri-sun-fill" : "ri-moon-fill";
    }
}

loadTheme();