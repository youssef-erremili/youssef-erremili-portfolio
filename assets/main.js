let container = document.getElementsByClassName("projectContainer")
let project_box = document.querySelector("#projects")

document.addEventListener('alpine:init', () => {
    Alpine.data('portfolio', () => ({
        projects: [],
        open: false,
        description: '',
        link: '',
        demo: '',
        technologies: [],
        image: '',
        colorClasses: [
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
        ],
        init() {
            fetch('assets/file/data.json')
                .then(response => response.json())
                .then(data => {
                    this.projects = data.projects;
                })
                .catch(error => console.error("Error loading projects:", error));
        },
        getColorClass(tech) {
            let hash = 0;
            for (let c = 0; c < tech.length; c++) hash += tech.charCodeAt(c);
            return this.colorClasses[hash % this.colorClasses.length];
        }
    }));
});

document.addEventListener("DOMContentLoaded", function () {
    const loader = document.querySelector('#loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.classList.add('hide');
            }, 800);
        }, 3500);
    }
});