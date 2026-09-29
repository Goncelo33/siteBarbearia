const WHATSAPP = "https://wa.me/5548996100867";

function abrirAgendamento(servico = "") {
    const mensagem = servico
        ? `Olá! Gostaria de agendar ${servico} na Barbearia Souza.`
        : "Olá! Gostaria de agendar um horário na Barbearia Souza.";
    window.open(`${WHATSAPP}?text=${encodeURIComponent(mensagem)}`, "_blank", "noopener");
}

// Menu mobile
const menuMobile = document.getElementById("menu-mobile");
const menuPrincipal = document.getElementById("menu-principal");

if (menuMobile && menuPrincipal) {
    menuMobile.addEventListener("click", () => {
        const aberto = menuPrincipal.classList.toggle("open");
        menuMobile.setAttribute("aria-expanded", String(aberto));
        menuMobile.textContent = aberto ? "✕" : "☰";
    });

    menuPrincipal.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menuPrincipal.classList.remove("open");
            menuMobile.setAttribute("aria-expanded", "false");
            menuMobile.textContent = "☰";
        });
    });
}

// Referência visual de visagismo usando a imagem que já existe no projeto.
// Evita apontar para arquivos assets/modelo-antes.jpg inexistentes.
const btnTransformacao = document.getElementById("btn-transformacao");
const fotoVisagismo = document.getElementById("foto-visagismo");

if (btnTransformacao && fotoVisagismo) {
    let ampliada = false;
    btnTransformacao.addEventListener("click", () => {
        ampliada = !ampliada;
        fotoVisagismo.style.transform = ampliada ? "scale(1.015)" : "scale(1)";
        btnTransformacao.textContent = ampliada ? "Fechar referência" : "Ver imagem de referência";
    });
}

// Depoimentos
const depoimentos = [
    {
        texto: '"O Marcelo é fera demais. Uso o serviço de visagismo dele há anos e não troco por nada. A cerveja está sempre trincando!"',
        autor: "- Pedro Silva (Cliente desde 2017)"
    },
    {
        texto: '"Ambiente sensacional em Laguna. O videogame deixa a espera muito divertida e o corte de cabelo é o melhor da região."',
        autor: "- Lucas Ramos (Cliente de Laguna)"
    },
    {
        texto: '"O diferencial realmente é o visagismo. Ele sabe exatamente o que combina com o formato do seu rosto e barba."',
        autor: "- Mateus Gonçalves (Parceiro comercial)"
    }
];

let indiceAtual = 0;
const textoDepoimento = document.getElementById("texto-depoimento");
const autorDepoimento = document.getElementById("autor-depoimento");
const dots = document.getElementById("dots-depoimentos");

function criarDots() {
    if (!dots) return;
    dots.innerHTML = "";
    depoimentos.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = `dot ${i === indiceAtual ? "active" : ""}`;
        dots.appendChild(dot);
    });
}

function atualizarDepoimento() {
    if (!textoDepoimento || !autorDepoimento) return;
    textoDepoimento.style.opacity = "0";
    setTimeout(() => {
        textoDepoimento.textContent = depoimentos[indiceAtual].texto;
        autorDepoimento.textContent = depoimentos[indiceAtual].autor;
        textoDepoimento.style.opacity = "1";
        criarDots();
    }, 120);
}

function proximoDepoimento() {
    indiceAtual = (indiceAtual + 1) % depoimentos.length;
    atualizarDepoimento();
}

function depoimentoAnterior() {
    indiceAtual = (indiceAtual - 1 + depoimentos.length) % depoimentos.length;
    atualizarDepoimento();
}

criarDots();
atualizarDepoimento();
setInterval(proximoDepoimento, 6000);

// Animações de entrada
const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observador.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observador.observe(el));
