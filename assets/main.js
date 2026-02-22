let container = document.getElementsByClassName("projectContainer")
let project_box = document.querySelector("#projects")

function fetchProjcts() {
    fetch('assets/file/data.json')
        .then(response => response.json())
        .then(data => {
            const containerEle = document.getElementById("projects");
            containerEle.className = "!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-8 gap-y-12 py-10 w-full";

            data.projects.forEach((element, index) => {
                const technologies = JSON.stringify(element.technologies);
                const description = element.description.replace(/'/g, "\\'");
                const number = String(index + 1).padStart(2, '0');
                const authorInitial = "Y";
                const authorName = "Youssef Erremili";
                const category = element.technologies[0] || "Web";

                let container = document.createElement('div');
                container.className = "flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300 w-full";
                container.innerHTML = `
                    <div class="text-4xl lg:text-5xl font-extrabold text-white/10 select-none">${number}</div>
                    <div class="flex flex-col gap-2 w-full">
                        <div class="flex items-center gap-2">
                            <div class="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold">${authorInitial}</div>
                            <span class="text-sm text-gray-400 font-medium">${authorName}</span>
                        </div>
                        <h3 @click='open = true; demo="${element.demo}"; link="${element.link}"; technologies=${technologies}; description="${description}"' 
                            class="font-bold text-white text-lg leading-tight hover:text-[#3CCF91] cursor-pointer transition-colors line-clamp-2">
                            ${element.title}
                        </h3>
                        <div class="text-xs text-gray-500 flex flex-wrap items-center gap-2 mt-1">
                            <span>2024</span>
                            <span class="w-1 h-1 rounded-full bg-slate-600"></span>
                            <span>5 mins</span>
                            <span class="w-1 h-1 rounded-full bg-slate-600"></span>
                            <span class="bg-white/5 px-2 py-0.5 rounded-full text-gray-400 whitespace-nowrap">${category}</span>
                        </div>
                    </div>
                `;
                containerEle.appendChild(container);
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