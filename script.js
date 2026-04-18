// Papers storage - supporting both JSON and localStorage
class PapersManager {
    constructor() {
        this.storageKey = 'mypapers_data';
        this.papers = [];
        this.init();
    }

    async init() {
        // Try to load from papers.json first
        try {
            const response = await fetch('papers.json');
            if (response.ok) {
                const data = await response.json();
                this.papers = data.papers || [];
                console.log(`✅ Loaded ${this.papers.length} papers from papers.json`);
            }
        } catch (error) {
            console.log('📄 papers.json not found or error loading. Using localStorage.');
        }

        // Merge with localStorage if it exists
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            const localPapers = JSON.parse(stored);
            this.papers = [...this.papers, ...localPapers];
            console.log(`✅ Added ${localPapers.length} papers from localStorage`);
        }

        // Remove duplicates based on title
        this.papers = this.removeDuplicates(this.papers);

        // Render after loading
        renderPapers(this.papers);
    }

    removeDuplicates(papers) {
        const seen = new Set();
        return papers.filter(paper => {
            if (seen.has(paper.title)) {
                return false;
            }
            seen.add(paper.title);
            return true;
        });
    }

    savePapers() {
        // Only save newly added papers to localStorage
        const jsonPapers = this.papers.filter(p => !p.id || p.id > 100); // Assume JSON papers have small IDs
        localStorage.setItem(this.storageKey, JSON.stringify(jsonPapers));
    }

    addPaper(paper) {
        paper.id = Date.now(); // Use timestamp for locally added papers
        this.papers.unshift(paper);
        this.savePapers();
        return paper;
    }

    deletePaper(id) {
        this.papers = this.papers.filter(p => p.id !== id);
        this.savePapers();
    }

    getPapers() {
        return this.papers;
    }

    searchPapers(query) {
        if (!query.trim()) {
            return this.papers;
        }
        const lowerQuery = query.toLowerCase();
        return this.papers.filter(paper =>
            paper.title.toLowerCase().includes(lowerQuery) ||
            (paper.conference && paper.conference.toLowerCase().includes(lowerQuery)) ||
            (paper.abstract && paper.abstract.toLowerCase().includes(lowerQuery)) ||
            (paper.authors && paper.authors.toLowerCase().includes(lowerQuery)) ||
            (paper.tags && paper.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
        );
    }
}

// Initialize papers manager
const papersManager = new PapersManager();

// Render papers
function renderPapers(papers = papersManager.getPapers()) {
    const container = document.getElementById('papers-container');

    if (papers.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>暂无论文。使用表单下方的"添加论文"按钮添加你的第一篇论文。</p></div>';
        return;
    }

    container.innerHTML = papers.map(paper => `
        <div class="paper-item">
            <div class="paper-content">
                <div style="margin-bottom: 10px;">
                    <span class="paper-conference">${paper.conference || 'Journal'} ${paper.year || ''}</span>
                    ${paper.type ? `<span class="paper-category">${paper.type}</span>` : ''}
                </div>
                <div class="paper-title">${paper.title}</div>
                ${paper.authors ? `<div class="paper-authors">👥 ${paper.authors}</div>` : ''}
                ${paper.abstract ? `<div class="paper-abstract">${paper.abstract}</div>` : ''}
                ${paper.tags && paper.tags.length > 0 ? `
                    <div class="paper-tags">
                        ${paper.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="paper-actions">
                    ${paper.pdfUrl ? `<a href="${paper.pdfUrl}" target="_blank">📄 [PDF]</a>` : ''}
                    ${paper.arxivUrl ? `<a href="${paper.arxivUrl}" target="_blank">📰 [arXiv]</a>` : ''}
                    ${paper.codeUrl ? `<a href="${paper.codeUrl}" target="_blank">💻 [Code]</a>` : ''}
                </div>
            </div>
            <button class="delete-btn" onclick="deletePaper(${paper.id})">删除</button>
        </div>
    `).join('');
}

// Delete paper
function deletePaper(id) {
    if (confirm('确定要删除这篇论文吗？')) {
        papersManager.deletePaper(id);
        renderPapers();
        updateSearch();
    }
}

// Handle form submission
document.getElementById('paperForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const paper = {
        title: document.getElementById('paperTitle').value.trim(),
        conference: document.getElementById('paperConference').value.trim(),
        category: document.getElementById('paperCategory').value.trim(),
        pdfUrl: document.getElementById('paperUrl').value.trim() || '',
        codeUrl: document.getElementById('codeUrl').value.trim() || '',
        authors: '',
        abstract: '',
        type: 'Paper',
        tags: []
    };

    if (!paper.title || !paper.conference) {
        alert('请填写必填项：论文标题、会议/期刊');
        return;
    }

    papersManager.addPaper(paper);
    renderPapers();
    updateSearch();

    // Clear form
    this.reset();
    alert('论文添加成功！');
});

// Search functionality
function updateSearch() {
    const searchInput = document.getElementById('searchInput').value;
    const results = papersManager.searchPapers(searchInput);
    renderPapers(results);

    // Update results count
    const count = results.length;
    const total = papersManager.getPapers().length;
    if (searchInput.trim()) {
        console.log(`🔍 搜索结果: ${count} / ${total}`);
    }
}

document.getElementById('searchInput').addEventListener('input', updateSearch);

// Wait for papers to load before initial render
setTimeout(() => {
    updateSearch();
}, 100);

// Smooth scrolling for category links
document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('🎓 MyPaper - Academic Papers Management System Loaded!');
