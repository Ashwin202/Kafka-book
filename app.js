// Kafka Book PWA Application
class KafkaBookApp {
    constructor() {
        this.currentSection = 'welcome';
        this.searchResults = [];
        this.isSearching = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderNavigation();
        this.renderContent();
        this.setupServiceWorker();
        this.setupFrontPageNavigation();
    }

    setupEventListeners() {
        // Menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const closeBtn = document.getElementById('closeBtn');

        menuToggle.addEventListener('click', () => this.toggleMenu());
        closeBtn.addEventListener('click', () => this.closeMenu());
        overlay.addEventListener('click', () => this.closeMenu());

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
            if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
                const prevSection = this.getPreviousSection();
                if (prevSection) {
                    this.navigateToSection(prevSection);
                }
            }
            if (e.key === 'ArrowRight' && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
                const nextSection = this.getNextSection();
                if (nextSection) {
                    this.navigateToSection(nextSection);
                }
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.section) {
                this.navigateToSection(e.state.section, false);
            }
        });
    }

    toggleMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const menuToggle = document.getElementById('menuToggle');

        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }

    closeMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const menuToggle = document.getElementById('menuToggle');

        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
        
        // Force close by removing any lingering classes
        setTimeout(() => {
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }, 50);
    }

    renderNavigation() {
        const navList = document.getElementById('navList');
        navList.innerHTML = '';

        // Add welcome section
        const welcomeItem = this.createNavItem('welcome', 'Welcome', '🏠');
        navList.appendChild(welcomeItem);

        // Add content sections
        kafkaContent.sections.forEach(section => {
            const navItem = this.createNavItem(section.id, section.title, this.getSectionIcon(section.id));
            navList.appendChild(navItem);
        });
    }

    createNavItem(id, title, icon) {
        const li = document.createElement('li');
        li.className = 'nav-item';
        
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'nav-link';
        link.innerHTML = `${icon} ${title}`;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeMenu(); // Close immediately
            this.navigateToSection(id);
        });

        li.appendChild(link);
        return li;
    }

    getSectionIcon(sectionId) {
        const icons = {
            'introduction': '📖',
            'kafka-vs-rabbitmq': '⚖️',
            'core-concepts': '🧩',
            'kafka-ecosystem': '🔧',
            'basic-operations': '⚙️',
            'cluster-operations': '🏗️',
            'kafka-workflow': '🔄',
            'producer-consumer': '📤📥',
            'consumer-groups': '👥',
            'kraft-mode': '⚡',
            'installation-setup': '🚀',
            'project-demo': '💻',
            'use-cases': '🎯',
            'summary': '📋'
        };
        return icons[sectionId] || '📄';
    }

    navigateToSection(sectionId, updateHistory = true) {
        // Update active navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[href="#"]`);
        if (activeLink && activeLink.textContent.includes(this.getSectionTitle(sectionId))) {
            activeLink.classList.add('active');
        }

        // Update content
        this.currentSection = sectionId;
        this.renderContent();

        // Update URL
        if (updateHistory) {
            const url = sectionId === 'welcome' ? '/' : `/#${sectionId}`;
            history.pushState({ section: sectionId }, '', url);
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }

    getSectionTitle(sectionId) {
        if (sectionId === 'welcome') return 'Welcome';
        const section = kafkaContent.sections.find(s => s.id === sectionId);
        return section ? section.title : '';
    }

    renderContent() {
        const container = document.getElementById('contentContainer');
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        if (this.currentSection === 'welcome') {
            document.getElementById('welcome').classList.add('active');
            return;
        }

        // Clear search results if not searching
        if (!this.isSearching) {
            this.searchResults = [];
        }

        const section = kafkaContent.sections.find(s => s.id === this.currentSection);
        if (!section) return;

        const sectionElement = this.createSectionElement(section);
        container.innerHTML = '';
        container.appendChild(sectionElement);
    }

    createSectionElement(section) {
        const sectionDiv = document.createElement('section');
        sectionDiv.className = 'content-section active';
        sectionDiv.id = section.id;

        // Section header
        const header = document.createElement('div');
        header.className = 'section-header';
        header.innerHTML = `
            <h1 class="section-title">${section.title}</h1>
            <p class="section-subtitle">${section.subtitle}</p>
            ${section.content.description ? `<p class="section-description">${section.content.description}</p>` : ''}
        `;
        sectionDiv.appendChild(header);

        // Section content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'section';

        // Handle different content types
        if (section.content.cards) {
            section.content.cards.forEach(card => {
                contentDiv.appendChild(this.createCard(card.title, card.content));
            });
        }

        if (section.content.comparison) {
            contentDiv.appendChild(this.createComparisonTable(section.content.comparison));
        }

        if (section.content.concepts) {
            section.content.concepts.forEach(concept => {
                contentDiv.appendChild(this.createConceptCard(concept));
            });
        }

        if (section.content.tools) {
            section.content.tools.forEach(tool => {
                contentDiv.appendChild(this.createToolCard(tool));
            });
        }

        if (section.content.operations) {
            section.content.operations.forEach(operation => {
                contentDiv.appendChild(this.createOperationCard(operation));
            });
        }

        if (section.content.workflow) {
            contentDiv.appendChild(this.createWorkflowCard(section.content.workflow));
        }

        if (section.content.examples) {
            section.content.examples.forEach(example => {
                contentDiv.appendChild(this.createExampleCard(example));
            });
        }

        if (section.content.project) {
            contentDiv.appendChild(this.createProjectCard(section.content.project));
        }

        if (section.content.useCases) {
            section.content.useCases.forEach(useCase => {
                contentDiv.appendChild(this.createUseCaseCard(useCase));
            });
        }

        if (section.content.takeaways) {
            section.content.takeaways.forEach(takeaway => {
                contentDiv.appendChild(this.createTakeawayCard(takeaway));
            });
        }

        if (section.content.steps) {
            section.content.steps.forEach(step => {
                contentDiv.appendChild(this.createStepCard(step));
            });
        }

        sectionDiv.appendChild(contentDiv);
        
        // Add page navigation (except for welcome page)
        if (section.id !== 'welcome') {
            const pageNav = this.createPageNavigation();
            sectionDiv.appendChild(pageNav);
        }
        
        return sectionDiv;
    }

    createCard(title, content) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3 class="card-title">${title}</h3>
            <div class="card-content">${content}</div>
        `;
        return card;
    }

    createComparisonTable(comparison) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const table = document.createElement('table');
        table.className = 'comparison-table';
        
        // Header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        comparison.headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Body
        const tbody = document.createElement('tbody');
        comparison.rows.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        
        card.appendChild(table);
        return card;
    }

    createConceptCard(concept) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = concept.title;
        card.appendChild(title);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'card-content';
        
        const description = document.createElement('p');
        description.textContent = concept.description;
        contentDiv.appendChild(description);
        
        if (concept.code) {
            const codeBlock = this.createCodeBlock(concept.code, 'javascript');
            contentDiv.appendChild(codeBlock);
        }
        
        if (concept.diagram && diagrams[concept.diagram]) {
            const diagramDiv = document.createElement('div');
            diagramDiv.className = 'diagram';
            diagramDiv.innerHTML = diagrams[concept.diagram];
            contentDiv.appendChild(diagramDiv);
        }
        
        if (concept.benefits) {
            const benefitsList = document.createElement('ul');
            benefitsList.className = 'content-list';
            concept.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.innerHTML = `<span class="list-icon">✓</span>${benefit}`;
                benefitsList.appendChild(li);
            });
            contentDiv.appendChild(benefitsList);
        }
        
        card.appendChild(contentDiv);
        return card;
    }

    createToolCard(tool) {
        return this.createConceptCard(tool);
    }

    createOperationCard(operation) {
        return this.createConceptCard(operation);
    }

    createWorkflowCard(workflow) {
        const card = document.createElement('div');
        card.className = 'card';
        
        let content = '<h3 class="card-title">Kafka Workflow</h3><div class="card-content">';
        
        workflow.forEach(step => {
            content += `
                <div style="display: flex; align-items: flex-start; margin-bottom: 1rem; padding: 1rem; background: var(--surface-color); border-radius: var(--radius-md);">
                    <div style="background: var(--primary-color); color: white; width: 2rem; height: 2rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 1rem; font-weight: bold;">${step.step}</div>
                    <div>
                        <h4 style="margin: 0 0 0.5rem 0; color: var(--text-primary);">${step.title}</h4>
                        <p style="margin: 0; color: var(--text-secondary);">${step.description}</p>
                    </div>
                </div>
            `;
        });
        
        content += '</div>';
        card.innerHTML = content;
        return card;
    }

    createExampleCard(example) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = example.title;
        card.appendChild(title);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'card-content';
        
        const codeBlock = this.createCodeBlock(example.code, 'javascript');
        contentDiv.appendChild(codeBlock);
        
        card.appendChild(contentDiv);
        return card;
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = project.title;
        card.appendChild(title);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'card-content';
        
        const description = document.createElement('p');
        description.textContent = project.description;
        contentDiv.appendChild(description);
        
        if (project.components) {
            project.components.forEach(component => {
                const componentTitle = document.createElement('h4');
                componentTitle.style.margin = '1.5rem 0 0.5rem 0';
                componentTitle.style.color = 'var(--text-primary)';
                componentTitle.textContent = component.name;
                contentDiv.appendChild(componentTitle);
                
                const codeBlock = this.createCodeBlock(component.code, 'javascript');
                contentDiv.appendChild(codeBlock);
            });
        }
        
        card.appendChild(contentDiv);
        return card;
    }

    createUseCaseCard(useCase) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3 class="card-title">${useCase.title}</h3>
            <div class="card-content">
                <p>${useCase.description}</p>
                <p><strong>Example:</strong> ${useCase.example}</p>
            </div>
        `;
        return card;
    }

    createTakeawayCard(takeaway) {
        const card = document.createElement('div');
        card.className = 'card';
        
        let content = `
            <h3 class="card-title">${takeaway.title}</h3>
            <div class="card-content">
                <ul class="content-list">
        `;
        
        takeaway.items.forEach(item => {
            content += `<li><span class="list-icon">•</span>${item}</li>`;
        });
        
        content += '</ul></div>';
        card.innerHTML = content;
        return card;
    }

    createStepCard(step) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = step.title;
        card.appendChild(title);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'card-content';
        
        const codeBlock = this.createCodeBlock(step.code, 'bash');
        contentDiv.appendChild(codeBlock);
        
        card.appendChild(contentDiv);
        return card;
    }

    createCodeBlock(code, language = 'javascript') {
        const highlightedCode = this.highlightCode(code, language);
        
        const codeBlockDiv = document.createElement('div');
        codeBlockDiv.className = 'code-block';
        codeBlockDiv.setAttribute('data-language', language);
        
        const pre = document.createElement('pre');
        const codeElement = document.createElement('code');
        codeElement.innerHTML = highlightedCode;
        
        pre.appendChild(codeElement);
        codeBlockDiv.appendChild(pre);
        
        return codeBlockDiv;
    }

    highlightCode(code, language) {
        if (language === 'javascript') {
            return code
                .replace(/\b(const|let|var|function|async|await|if|else|for|while|return|class|extends|import|export|require|module\.exports)\b/g, '<span >$1</span>')
                .replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
                .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
                .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
                .replace(/\b\w+(?=\s*\()/g, '<span class="function">$&</span>');
        }
        return code;
    }

    handleSearch(query) {
        const trimmedQuery = query.trim().toLowerCase();
        
        if (trimmedQuery === '') {
            this.isSearching = false;
            this.searchResults = [];
            this.renderNavigation();
            return;
        }

        this.isSearching = true;
        this.searchResults = [];

        // Search in section titles and content
        kafkaContent.sections.forEach(section => {
            const titleMatch = section.title.toLowerCase().includes(trimmedQuery);
            const subtitleMatch = section.subtitle.toLowerCase().includes(trimmedQuery);
            const descriptionMatch = section.content.description.toLowerCase().includes(trimmedQuery);
            
            if (titleMatch || subtitleMatch || descriptionMatch) {
                this.searchResults.push({
                    id: section.id,
                    title: section.title,
                    subtitle: section.subtitle,
                    type: 'section'
                });
            }

            // Search in cards
            if (section.content.cards) {
                section.content.cards.forEach(card => {
                    if (card.title.toLowerCase().includes(trimmedQuery) || 
                        card.content.toLowerCase().includes(trimmedQuery)) {
                        this.searchResults.push({
                            id: section.id,
                            title: card.title,
                            subtitle: section.title,
                            type: 'card'
                        });
                    }
                });
            }
        });

        this.renderSearchResults();
    }

    renderSearchResults() {
        const navList = document.getElementById('navList');
        navList.innerHTML = '';

        if (this.searchResults.length === 0) {
            const li = document.createElement('li');
            li.className = 'nav-item';
            li.innerHTML = '<div style="padding: 1rem; color: var(--text-muted); text-align: center;">No results found</div>';
            navList.appendChild(li);
            return;
        }

        this.searchResults.forEach(result => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'nav-link';
            link.innerHTML = `🔍 ${result.title}`;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMenu(); // Close immediately
                this.navigateToSection(result.id);
            });

            li.appendChild(link);
            navList.appendChild(li);
        });
    }

    setupFrontPageNavigation() {
        // Quick start cards
        document.querySelectorAll('.quick-card').forEach(card => {
            card.addEventListener('click', () => {
                const section = card.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // Navigation buttons
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', () => {
                const section = button.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });
    }

    getCurrentSectionIndex() {
        if (this.currentSection === 'welcome') return -1;
        return kafkaContent.sections.findIndex(section => section.id === this.currentSection);
    }

    getPreviousSection() {
        const currentIndex = this.getCurrentSectionIndex();
        if (currentIndex <= 0) return 'welcome';
        return kafkaContent.sections[currentIndex - 1].id;
    }

    getNextSection() {
        const currentIndex = this.getCurrentSectionIndex();
        if (currentIndex === -1) return kafkaContent.sections[0].id;
        if (currentIndex >= kafkaContent.sections.length - 1) return null;
        return kafkaContent.sections[currentIndex + 1].id;
    }

    createPageNavigation() {
        const prevSection = this.getPreviousSection();
        const nextSection = this.getNextSection();
        const currentIndex = this.getCurrentSectionIndex();
        const totalSections = kafkaContent.sections.length;

        const nav = document.createElement('div');
        nav.className = 'page-navigation';

        const prevButton = document.createElement('button');
        prevButton.className = 'page-nav-button';
        prevButton.innerHTML = '<span>←</span> Previous';
        prevButton.disabled = !prevSection;
        if (prevSection) {
            prevButton.addEventListener('click', () => this.navigateToSection(prevSection));
        }

        const pageInfo = document.createElement('div');
        pageInfo.className = 'page-info';
        if (currentIndex === -1) {
            pageInfo.textContent = 'Welcome Page';
        } else {
            pageInfo.textContent = `Chapter ${currentIndex + 1} of ${totalSections}`;
        }

        const nextButton = document.createElement('button');
        nextButton.className = 'page-nav-button';
        nextButton.innerHTML = 'Next <span>→</span>';
        nextButton.disabled = !nextSection;
        if (nextSection) {
            nextButton.addEventListener('click', () => this.navigateToSection(nextSection));
        }

        nav.appendChild(prevButton);
        nav.appendChild(pageInfo);
        nav.appendChild(nextButton);

        return nav;
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KafkaBookApp();
});

// Handle initial route
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const app = new KafkaBookApp();
        app.navigateToSection(hash, false);
    }
});
