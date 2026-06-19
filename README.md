# Dashboard p5.js

Um dashboard interativo desenvolvido com **HTML5**, **CSS3**, **JavaScript** e **p5.js**.

## 📋 Características

### ✨ Funcionalidades Principais

- **Dashboard**: Visualização com p5.js e estatísticas em tempo real
- **Gerenciar Itens**: Criar, editar e deletar itens com status ativo/inativo
- **Gráficos**: Gráfico de barras com dados dinâmicos
- **Configurações**: Modo escuro, notificações e limpeza de dados
- **Menu Responsivo**: Navegação fluida entre páginas
- **Footer Otimizado**: Links rápidos e informações importantes

### 🎨 Design

- Layout moderno com gradientes
- Tema claro e escuro (Dark Mode)
- Responsivo para todos os dispositivos
- Animações suaves com CSS
- Paleta de cores consistente

### 💾 Persistência

- Dados salvos em localStorage
- Configurações do usuário preservadas
- Estado do modo escuro mantido

## 📁 Estrutura do Projeto

```
.
├── index.html          # Arquivo principal HTML
├── css/
│   └── style.css       # Estilos e responsividade
├── js/
│   ├── main.js         # Lógica principal e navegação
│   ├── p5-sketch.js    # Sketch p5.js para visualizações
│   └── dashboard.js    # Gerenciamento do dashboard
and
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### 1. Clonar o Repositório

```bash
git clone https://github.com/augustoilhasantos-collab/alura2.git
cd alura2
```

### 2. Abrir no Navegador

Simplemente abra o arquivo `index.html` no seu navegador favorito:

```bash
# No macOS
open index.html

# No Windows
start index.html

# No Linux
firefox index.html
```

### 3. Usar um Servidor Local (Recomendado)

```bash
# Com Python 3
python -m http.server 8000

# Com Python 2
python -m SimpleHTTPServer 8000

# Com Node.js (http-server)
npx http-server
```

Depois acesse: `http://localhost:8000`

## 📖 Guia de Uso

### Dashboard

- Visualize a animação p5.js com partículas interativas
- Mova o mouse sobre o canvas para interagir com as partículas
- Veja estatísticas em tempo real na barra lateral

### Gerenciar Itens

1. Preencha o formulário com:
   - Nome do item
   - Descrição
   - Status (ativo/inativo)
2. Clique em "Adicionar Item"
3. Os itens aparecem na lista abaixo
4. Use os botões para ativar/desativar ou remover itens

### Gráficos

- Visualize um gráfico de barras com dados aleatórios
- Os dados são regenerados a cada atualização

### Configurações

- **Modo Escuro**: Alterna entre tema claro e escuro
- **Notificações**: Habilita/desabilita notificações
- **Limpar Dados**: Remove todos os itens salvos

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Layouts modernos, gradientes, animações
- **JavaScript (ES6+)**: Lógica interativa
- **p5.js**: Visualizações criativas e interativas
- **LocalStorage**: Persistência de dados do cliente

## 📱 Responsividade

O dashboard é totalmente responsivo:

- ✅ Desktop (1920x1080+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

## ⚡ Otimizações

- ⚙️ Código modularizado em classes
- 📦 CSS otimizado com variáveis CSS
- 🎨 Reutilização de estilos
- 🔄 Transições suaves
- 💾 Dados em localStorage para performance
- 🎯 Canvas p5.js para renderização eficiente

## 🐛 Troubleshooting

### p5.js não está carregando

- Verifique sua conexão com a internet (p5.js é carregado do CDN)
- Abra o console do navegador (F12) para ver erros

### Dados não persistem

- Verifique se localStorage está habilitado
- Limpe o cache do navegador e tente novamente

### Modo escuro não funciona

- Certifique-se de que JavaScript está habilitado
- Tente limpar o cache local

## 🏆 Aprendizado

Este projeto demonstra:

- Estrutura de projeto profissional
- Programação orientada a objetos em JavaScript
- Manipulação do DOM
- LocalStorage API
- p5.js para criações interativas
- CSS Grid e Flexbox
- Design responsivo
- Boas práticas de código

## 📜 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

**Augusto Ilhas Santos**
- GitHub: [@augustoilhasantos-collab](https://github.com/augustoilhasantos-collab)

## 🔗 Links Úteis

- [p5.js Documentation](https://p5js.org/reference/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)

## 💡 Ideias Futuras

- [ ] Integração com API backend
- [ ] Autenticação de usuários
- [ ] Exportar dados para CSV/JSON
- [ ] Modo colaborativo
- [ ] PWA (Progressive Web App)
- [ ] Mais visualizações p5.js
- [ ] Sistema de temas customizáveis
- [ ] Notificações push

---

**Desenvolvido com ❤️ usando p5.js, HTML5 e CSS3**