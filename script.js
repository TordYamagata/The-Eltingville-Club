
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const modal = document.getElementById("profileModal");
const modalClose = document.getElementById("modalClose");
const modalNumber = document.getElementById("modalNumber");
const modalName = document.getElementById("modalName");
const modalDescription = document.getElementById("modalDescription");

const profiles = {
    bill: {
        number: "ARQUIVO 001 // LIDERANÇA",
        name: "BILL DICKEY",
        description:
            "Bill é um dos membros mais explosivos do clube. " +
            "Sua necessidade de estar certo e de controlar as discussões " +
            "faz com que o conhecimento sobre quadrinhos se transforme " +
            "em uma ferramenta de poder. Ele representa o fã que confunde " +
            "ser apaixonado por um assunto com ter autoridade sobre todos."
    },

    josh: {
        number: "ARQUIVO 002 // RIVALIDADE",
        name: "JOSH LEVY",
        description:
            "Josh é competitivo e frequentemente entra em choque com Bill. " +
            "As disputas entre os dois mostram como objetos de coleção, " +
            "opiniões e conhecimentos sobre cultura pop podem se tornar " +
            "motivos para conflitos completamente desproporcionais."
    },

    pete: {
        number: "ARQUIVO 003 // MEMBRO",
        name: "PETE DINUNZIO",
        description:
            "Pete integra o quarteto central de Eltingville. Assim como os " +
            "outros membros, participa de um ambiente em que gostos pessoais, " +
            "colecionismo e rivalidades alimentam situações absurdas. " +
            "O grupo funciona como uma sátira coletiva, não como um modelo " +
            "de comunidade saudável."
    },

    jerry: {
        number: "ARQUIVO 004 // MEMBRO",
        name: "JERRY STOKES",
        description:
            "Jerry completa o quarteto formado por Bill, Josh e Pete. " +
            "Sua participação ajuda a construir a dinâmica do clube: " +
            "uma mistura de interesses compartilhados, competição e " +
            "comportamentos exagerados. O humor da obra nasce também " +
            "da forma como os quatro reforçam os defeitos uns dos outros."
    }
};

// Menu responsivo
menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Fechar o menu após clicar em um link
navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

// Abrir o dossiê de cada personagem
document.querySelectorAll("[data-profile]").forEach((button) => {
    button.addEventListener("click", () => {
        const profileId = button.dataset.profile;
        const profile = profiles[profileId];

        if (!profile) return;

        modalNumber.textContent = profile.number;
        modalName.textContent = profile.name;
        modalDescription.textContent = profile.description;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        modalClose.focus();
    });
});

// Fechar a janela
function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);

// Fechar ao clicar fora do conteúdo
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Fechar com a tecla ESC
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});

// Entrada suave dos blocos durante a rolagem
const animatedElements = document.querySelectorAll(
    ".character-card, .release-card, .timeline-item, .fact-board"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    animatedElements.forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });
}
