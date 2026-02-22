let container = document.getElementsByClassName("projectContainer")
let project_box = document.querySelector("#projects")

function fetchProjcts() {
    fetch('assets/file/data.json')
        .then(response => response.json())
        .then(data => {
            const containerEle = document.getElementById("projects");
            containerEle.className = "!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-8 gap-y-12 py-10 w-full";

            const colorClasses = [
                "bg-blue-500/10 text-blue-400",
                "bg-green-500/10 text-green-400",
                "bg-yellow-500/10 text-yellow-400",
                "bg-red-500/10 text-red-400",
                "bg-purple-500/10 text-purple-400",
                "bg-pink-500/10 text-pink-400",
                "bg-indigo-500/10 text-indigo-400",
                "bg-cyan-500/10 text-cyan-400",
                "bg-orange-500/10 text-orange-400",
                "bg-teal-500/10 text-teal-400"
            ];

            data.projects.forEach((element, index) => {
                const technologies = JSON.stringify(element.technologies);
                const description = element.description.replace(/'/g, "\\'");
                const number = String(index + 1).padStart(2, '0');
                const authorInitial = "Y";
                const authorName = "Youssef Erremili";

                let tagsHTML = element.technologies.slice(0, 3).map((tech) => {
                    let hash = 0;
                    for (let c = 0; c < tech.length; c++) hash += tech.charCodeAt(c);
                    let colorClass = colorClasses[hash % colorClasses.length];
                    return `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${colorClass}">${tech}</span>`;
                }).join('');

                if (element.technologies.length > 3) {  
                    tagsHTML += `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 uppercase">+${element.technologies.length - 3}</span>`;
                }

                let container = document.createElement('div');
                container.className = "flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300 w-full";

                container.innerHTML = `
                    <div class="text-4xl lg:text-5xl font-extrabold text-white/10 select-none hidden sm:block">${number}</div>
                    
                    <div class="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-slate-800 ring-1 ring-white/10 mt-1 cursor-pointer group" 
                         @click='open = true; demo="${element.demo}"; link="${element.link}"; technologies=${technologies}; image="${element.image}"; description="${description}"'>
                        <img src="${element.image}" alt="${element.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    
                    <div class="flex flex-col gap-1.5 w-full">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <div class="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-bold">${authorInitial}</div>
                                <span class="text-xs text-gray-400 font-medium">${authorName}</span>
                            </div>
                            <div class="text-3xl font-extrabold text-white/10 select-none sm:hidden">${number}</div>
                        </div>
                        
                        <h3 @click='open = true; demo="${element.demo}"; link="${element.link}"; technologies=${technologies}; image="${element.image}"; description="${description}"' 
                            class="font-bold text-white text-[15px] leading-snug hover:text-[#3CCF91] cursor-pointer transition-colors max-w-[90%]">
                            ${element.title}
                        </h3>
                        
                        <div class="flex flex-wrap items-center gap-1.5 mt-1">
                            ${tagsHTML}
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


    // document.addEventListener("DOMContentLoaded", function () {
    //     // And use "DOMContentLoaded" method to make sure 
    //     const alert = document.querySelector('#loader');
    //     setTimeout(() => {
    //         alert.classList.add('hide');
    //     }, 5000);
    // });