let container = document.getElementsByClassName("projectContainer")
let project_box = document.querySelector("#projects")

const sharedPortfolioData = {
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
    getColorClass(tech) {
        let hash = 0;
        for (let c = 0; c < tech.length; c++) hash += tech.charCodeAt(c);
        return this.colorClasses[hash % this.colorClasses.length];
    }
};

document.addEventListener('alpine:init', () => {
    Alpine.data('portfolio', () => ({
        projects: [],
        ...sharedPortfolioData,
        init() {
            fetch('assets/file/data.json')
                .then(response => response.json())
                .then(data => {
                    this.projects = data.projects;
                })
                .catch(error => console.error("Error loading projects:", error));
        }
    }));

    Alpine.data('projectDetail', () => ({
        project: null,
        loading: true,
        ...sharedPortfolioData,
        init() {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            if (id !== null) {
                fetch('assets/file/data.json')
                    .then(response => response.json())
                    .then(data => {
                        this.project = data.projects[id];
                        this.loading = false;
                        if (this.project && this.project.title) {
                            document.title = this.project.title + " - Youssef Erremili";
                        }
                    })
                    .catch(error => console.error("Error loading project:", error));
            } else {
                this.loading = false;
            }
        }
    }));
});


// Prevent loader flash on subsequent page loads in the same session
if (sessionStorage.getItem('loader_shown') === 'true') {
    const style = document.createElement('style');
    style.innerHTML = '#loader { display: none !important; opacity: 0 !important; visibility: hidden !important; }';
    document.head.appendChild(style);
}

document.addEventListener("DOMContentLoaded", function () {
    const loader = document.querySelector('#loader');
    if (loader) {
        if (sessionStorage.getItem('loader_shown') !== 'true') {
            setTimeout(() => {
                loader.classList.add('opacity-0', 'invisible', 'pointer-events-none');
                setTimeout(() => {
                    loader.classList.add('hidden');
                }, 600);
                sessionStorage.setItem('loader_shown', 'true');
            }, 3500);
        } else {
            loader.classList.add('opacity-0', 'invisible', 'pointer-events-none', 'hidden');
        }
    }
});