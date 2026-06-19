// Gerenciamento específico do dashboard e gráficos

class DashboardManager {
    constructor() {
        this.initializeCharts();
        this.initializeAnimations();
    }

    // Inicializar gráficos
    initializeCharts() {
        const chartContainer = document.getElementById('grafico-container');
        if (chartContainer) {
            this.drawChart(chartContainer);
        }
    }

    // Desenhar gráfico simples com Canvas
    drawChart(container) {
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = 400;
        container.innerHTML = '';
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const data = this.generateChartData();

        this.drawBarChart(ctx, data, canvas.width, canvas.height);
    }

    // Gerar dados fictícios para o gráfico
    generateChartData() {
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
        const valores = meses.map(() => Math.floor(Math.random() * 100) + 50);
        return { meses, valores };
    }

    // Desenhar gráfico de barras
    drawBarChart(ctx, data, width, height) {
        const padding = 50;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        const barWidth = chartWidth / data.meses.length;
        const maxValue = Math.max(...data.valores);

        // Fundo
        ctx.fillStyle = '#f7fafc';
        ctx.fillRect(0, 0, width, height);

        // Grade
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }

        // Barras
        data.valores.forEach((valor, index) => {
            const barHeight = (valor / maxValue) * chartHeight;
            const x = padding + (barWidth * index) + (barWidth * 0.1);
            const y = padding + chartHeight - barHeight;

            // Gradiente
            const gradient = ctx.createLinearGradient(0, y, 0, padding + chartHeight);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth * 0.8, barHeight);
        });

        // Eixo X
        ctx.strokeStyle = '#2d3748';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding + chartHeight);
        ctx.lineTo(width - padding, padding + chartHeight);
        ctx.stroke();

        // Labels do eixo X
        ctx.fillStyle = '#2d3748';
        ctx.textAlign = 'center';
        ctx.font = '12px Arial';
        data.meses.forEach((mes, index) => {
            const x = padding + (barWidth * index) + barWidth / 2;
            ctx.fillText(mes, x, padding + chartHeight + 20);
        });

        // Eixo Y
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, padding + chartHeight);
        ctx.stroke();

        // Labels do eixo Y
        ctx.textAlign = 'right';
        for (let i = 0; i <= 5; i++) {
            const valor = Math.floor((maxValue / 5) * i);
            const y = padding + chartHeight - (chartHeight / 5) * i;
            ctx.fillText(valor, padding - 10, y + 4);
        }
    }

    // Inicializar animações
    initializeAnimations() {
        // Observar elementos para animações de entrada
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.5s ease';
                }
            });
        });

        document.querySelectorAll('.card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Inicializar manager quando o documento estiver pronto
let dashboardManager;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        dashboardManager = new DashboardManager();
    });
} else {
    dashboardManager = new DashboardManager();
}

// Redimensionar gráfico quando a janela mudar
window.addEventListener('resize', () => {
    if (dashboardManager) {
        dashboardManager.initializeCharts();
    }
});