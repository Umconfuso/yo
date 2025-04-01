// Espera que o DOM esteja completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    // Lógica para o Menu Mobile
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Alterna o ícone do botão (opcional)
            const icon = menuButton.querySelector('.lucide');
            if (icon) {
                icon.innerHTML = mobileMenu.classList.contains('hidden') ? '&#xe9a7;' : '&#xe9e0;'; // menu : x
            }
        });
    } else {
        console.warn("Elementos do menu mobile não encontrados.");
    }

    // Atualizar ano no rodapé
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn("Elemento 'current-year' não encontrado no rodapé.");
    }

    // Opcional: Fechar menu mobile se clicar fora dele
    document.addEventListener('click', (event) => {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = menuButton && menuButton.contains(event.target);

            if (!isClickInsideMenu && !isClickOnButton) {
                mobileMenu.classList.add('hidden');
                 const icon = menuButton.querySelector('.lucide');
                 if (icon) {
                    icon.innerHTML = '&#xe9a7;'; // menu icon
                 }
            }
        }
    });

});
