// Gerenciamento de navegação e estado global

class Dashboard {
    constructor() {
        this.items = this.loadItems();
        this.initializeMenu();
        this.initializeSettings();
        this.updateStats();
    }

    // Inicializar menu de navegação
    initializeMenu() {
        const menuLinks = document.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo(link.dataset.page);
            });
        });
    }

    // Navegar entre páginas
    navigateTo(page) {
        // Remove active de todos os links
        document.querySelectorAll('.menu-link').forEach(link => {
            link.classList.remove('active');
        });

        // Remove active de todas as páginas
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Adiciona active para a página selecionada
        const pageElement = document.getElementById(`${page}-page`);
        if (pageElement) {
            pageElement.classList.add('active');
        }

        // Adiciona active para o link selecionado
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Salvar itens no localStorage
    saveItems() {
        localStorage.setItem('dashboardItems', JSON.stringify(this.items));
    }

    // Carregar itens do localStorage
    loadItems() {
        const stored = localStorage.getItem('dashboardItems');
        return stored ? JSON.parse(stored) : [];
    }

    // Adicionar novo item
    addItem(name, description, active = true) {
        const item = {
            id: Date.now(),
            name,
            description,
            active,
            createdAt: new Date().toLocaleDateString('pt-BR')
        };
        this.items.push(item);
        this.saveItems();
        this.updateStats();
        this.renderItems();
        return item;
    }

    // Remover item
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveItems();
        this.updateStats();
        this.renderItems();
    }

    // Atualizar status do item
    updateItemStatus(id, active) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            item.active = active;
            this.saveItems();
            this.updateStats();
            this.renderItems();
        }
    }

    // Atualizar estatísticas
    updateStats() {
        const total = this.items.length;
        const active = this.items.filter(i => i.active).length;
        const inactive = total - active;

        document.getElementById('total-items').textContent = total;
        document.getElementById('active-items').textContent = active;
        document.getElementById('inactive-items').textContent = inactive;
    }

    // Renderizar lista de itens
    renderItems() {
        const container = document.getElementById('items-container');
        container.innerHTML = '';

        if (this.items.length === 0) {
            container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #a0aec0;">Nenhum item adicionado ainda</p>';
            return;
        }

        this.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <small>Criado em: ${item.createdAt}</small>
                <div class="item-status ${item.active ? 'ativo' : 'inativo'}">
                    ${item.active ? '✓ Ativo' : '✗ Inativo'}
                </div>
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <button class="btn btn-primary" onclick="dashboard.updateItemStatus(${item.id}, ${!item.active})" style="flex: 1; padding: 0.5rem;">
                        ${item.active ? 'Desativar' : 'Ativar'}
                    </button>
                    <button class="btn btn-danger" onclick="dashboard.removeItem(${item.id})" style="flex: 1; padding: 0.5rem;">
                        Remover
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Inicializar configurações
    initializeSettings() {
        const darkModeToggle = document.getElementById('dark-mode');
        const notificationsToggle = document.getElementById('notifications');
        const clearDataBtn = document.getElementById('clear-data');

        // Dark mode
        darkModeToggle.checked = localStorage.getItem('darkMode') === 'true';
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', darkModeToggle.checked);
        });

        // Notificações
        notificationsToggle.checked = localStorage.getItem('notifications') !== 'false';
        notificationsToggle.addEventListener('change', () => {
            localStorage.setItem('notifications', notificationsToggle.checked);
        });

        // Limpar dados
        clearDataBtn.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja limpar todos os dados?')) {
                this.items = [];
                this.saveItems();
                this.updateStats();
                this.renderItems();
                alert('Dados removidos com sucesso!');
            }
        });
    }
}

// Inicializar dashboard global
let dashboard;

document.addEventListener('DOMContentLoaded', () => {
    dashboard = new Dashboard();
    dashboard.renderItems();
    dashboard.navigateTo('dashboard');

    // Gerenciar formulário de itens
    const itemForm = document.getElementById('item-form');
    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('item-name').value;
        const description = document.getElementById('item-description').value;
        const active = document.getElementById('item-status').checked;

        dashboard.addItem(name, description, active);

        // Limpar formulário
        itemForm.reset();
        document.getElementById('item-status').checked = true;

        // Feedback ao usuário
        alert('Item adicionado com sucesso!');
    });
});