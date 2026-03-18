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
        loading: true,
        ...sharedPortfolioData,
        init() {
            fetch('assets/file/data.json')
                .then(response => response.json())
                .then(data => {
                    this.projects = data.projects;
                    this.loading = false;
                })
                .catch(error => {
                    console.error("Error loading projects:", error);
                    this.loading = false;
                });
        }
    }));

    Alpine.data('projectDetail', () => ({
        project: null,
        loading: true,
        ...sharedPortfolioData,
        init() {
            const urlParams = new URLSearchParams(window.location.search);
            const slug = urlParams.get('id');
            if (slug !== null) {
                fetch('assets/file/data.json')
                    .then(response => response.json())
                    .then(data => {
                        this.project = data.projects.find(p => p.slug === slug);
                        this.loading = false;
                        if (this.project && this.project.title) {
                            document.title = this.project.title + " - Youssef Erremili";
                            
                            // Dynamically update canonical URL
                            let canonicalLink = document.querySelector("link[rel='canonical']");
                            if (!canonicalLink) {
                                canonicalLink = document.createElement("link");
                                canonicalLink.rel = "canonical";
                                document.head.appendChild(canonicalLink);
                            }
                            canonicalLink.href = "https://yousseferremili.com/project?id=" + this.project.slug;

                            // Dynamically update meta description
                            let metaDesc = document.querySelector("meta[name='description']");
                            if (!metaDesc) {
                                metaDesc = document.createElement("meta");
                                metaDesc.name = "description";
                                document.head.appendChild(metaDesc);
                            }
                            metaDesc.content = this.project.description;

                            // Update OG tags
                            const ogTitle = document.getElementById('og-title');
                            if (ogTitle) ogTitle.setAttribute('content', this.project.title + ' — Youssef Erremili');

                            const ogDesc = document.getElementById('og-desc');
                            if (ogDesc) ogDesc.setAttribute('content', this.project.description);

                            const ogImage = document.getElementById('og-image');
                            if (ogImage && this.project.image) 
                                ogImage.setAttribute('content', 'https://yousseferremili.com/' + this.project.image);

                            const ogUrl = document.getElementById('og-url');
                            if (ogUrl) ogUrl.setAttribute('content', 'https://yousseferremili.com/project?id=' + this.project.slug);

                            // Update Twitter tags
                            const twTitle = document.getElementById('tw-title');
                            if (twTitle) twTitle.setAttribute('content', this.project.title + ' — Youssef Erremili');

                            const twDesc = document.getElementById('tw-desc');
                            if (twDesc) twDesc.setAttribute('content', this.project.description);

                            const twImage = document.getElementById('tw-image');
                            if (twImage && this.project.image)
                                twImage.setAttribute('content', 'https://yousseferremili.com/' + this.project.image);

                            // Update canonical
                            const canonical = document.getElementById('page-canonical');
                            if (canonical) canonical.setAttribute('href', 'https://yousseferremili.com/project?id=' + this.project.slug);

                            // Update page-level schema
                            const schema = document.getElementById('project-schema');
                            if (schema) {
                                schema.textContent = JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "CreativeWork",
                                    "name": this.project.title,
                                    "description": this.project.description,
                                    "url": "https://yousseferremili.com/project?id=" + this.project.slug,
                                    "author": {
                                        "@type": "Person",
                                        "name": "Youssef Erremili",
                                        "url": "https://yousseferremili.com"
                                    },
                                    "keywords": this.project.technologies.join(", ")
                                });
                            }
                        }
                    })
                    .catch(error => {
                        console.error("Error loading project:", error);
                        this.loading = false;
                    });
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
    if (!loader) return;

    if (sessionStorage.getItem('loader_shown') === 'true') {
        loader.classList.add('opacity-0', 'invisible', 'pointer-events-none', 'hidden');
        return;
    }

    function hideLoader() {
        loader.classList.add('opacity-0', 'invisible', 'pointer-events-none');
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 600);
        sessionStorage.setItem('loader_shown', 'true');
    }

    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 300);
    } else {
        window.addEventListener('load', () => setTimeout(hideLoader, 300), { once: true });
    }
});