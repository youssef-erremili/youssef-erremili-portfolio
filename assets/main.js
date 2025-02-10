let container = document.getElementsByClassName("projectContainer")
let project_box = document.querySelector("#projects")

function fetchProjcts() {
    fetch('assets/file/data.json')
        .then(response => response.json())
        .then(data => {
            data.projects.forEach(element => {
                const technologies = JSON.stringify(element.technologies);
                const description = element.description.replace(/'/g, "\\'");
                let container = document.createElement('div')
                container.classList.add('project-box')
                container.innerHTML =
                    `<section>
                    <img src="${element.image}" alt="project image" >
                </section>
                <div class="title-project">
                    <h1 class="project-title text-red-500">${element.title}</h1>
                    <button @click='open = true; demo="${element.demo}"; link="${element.link}"; technologies=${technologies}; description="${description}"' class="flex items-center py-2 px-4 mr-1 rounded-md bg-slate-800 text-white ring-indigo-700 ring-offset-1 ring-offset-transparent focus:ring-1">
                        <ion-icon class="mr-1 text-lg" name="eye-outline"></ion-icon>
                        Details
                    </button>
                </div>
                `;
                document.getElementById("projects").appendChild(container);
            });
        })
        .catch(error => console.error("Error loading projects:", error));
}

document.addEventListener('DOMContentLoaded', function () {
    fetchProjcts();
});


document.addEventListener("DOMContentLoaded", function () {
    // And use "DOMContentLoaded" method to make sure 
    const alert = document.querySelector('#loader');
    setTimeout(() => {
        alert.classList.add('hide');
    }, 5000);
});