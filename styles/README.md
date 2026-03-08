# 🌍 GoMundo - Agência de Viagens

Landing page moderna, responsiva e de alta performance desenvolvida para uma agência de viagens fictícia. O projeto foca em experiência do usuário (UX), animações fluidas e otimização de recursos.

## 🚀 Funcionalidades e Destaques

### 🎨 Design e Interface (UI/UX)
- **Design Responsivo:** Layout adaptável para Mobile, Tablet e Desktop (Mobile First).
- **Efeito Glassmorphism:** Utilizado na seção de depoimentos e formulários para um visual moderno.
- **Tipografia:** Uso das fontes *Poppins*, *Outfit* e *Benguiat*.
- **Menu Mobile:** Navegação intuitiva com animação de hambúrguer e overlay.

### ✨ Animações Avançadas (GSAP)
O projeto utiliza a biblioteca **GSAP (GreenSock Animation Platform)** para criar uma experiência imersiva:
- **ScrollSmoother:** Rolagem suave para uma navegação elegante.
- **ScrollTrigger:** Animações ativadas conforme o usuário rola a página (Parallax no Hero e Footer).
- **SplitText:** Animação de entrada de texto letra por letra na seção Hero.
- **Micro-interações:** Efeitos de hover em botões e cards.

### ⚡ Otimizações Realizadas
- **Imagens Otimizadas:** Uso de formatos modernos (`.webp`) para carregamento rápido sem perda de qualidade.
- **Lazy Loading & Debounce:** O botão do WhatsApp possui lógica de visibilidade baseada no scroll com *debounce* para não impactar a performance da thread principal.
- **Carrossel Touch:** Implementação do **Swiper.js** para a seção de cidades, garantindo performance nativa em dispositivos móveis.

### 📧 Formulário Funcional
- **Integração Back-end:** Formulário de contato conectado a um script PHP (`enviar.php`).
- **Feedback Visual:** Sistema de Pop-up (Sucesso/Erro) integrado via JavaScript, sem recarregar a página (AJAX/Fetch API).
- **Segurança:** Conexão segura com banco de dados MySQL (`conexao.php`) utilizando `mysqli` e tratamento de erros JSON.

---

## 🛠️ Tecnologias Utilizadas

- **Front-end:**
  - HTML5 / CSS3 (Variáveis CSS, Flexbox, Grid)
  - JavaScript (ES6+)
  - GSAP (ScrollTrigger, ScrollSmoother, SplitText)
  - Swiper.js

- **Back-end:**
  - PHP 7/8
  - MySQL (Banco de dados)

---

## 📂 Estrutura do Projeto

```text
GoMundo-agencia-viagens/
├── css/
│   └── style.css          # Estilos globais e responsivos
├── js/
│   └── script.js          # Lógica de animações, menu e formulário
├── imagens/               # Imagens otimizadas (WebP)
├── fonts/                 # Fontes locais
├── conexao.php            # Configuração de banco de dados
├── enviar.php             # Processamento do formulário (não incluso no repo público)
└── index.html             # Estrutura principal


## 📝 Detalhes do Código

### Tratamento de Erros no Formulário
O JavaScript intercepta o envio padrão do formulário e utiliza `fetch` para comunicação assíncrona:

```javascript
const response = await fetch("enviar.php", {
  method: "POST",
  body: formData 
});
```
Isso garante que o usuário permaneça na página e receba um feedback instantâneo via Pop-up animado com GSAP.

---

Desenvolvido com foco em performance e design.
