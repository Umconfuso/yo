document.addEventListener('DOMContentLoaded', () => {
    // Verifica se o elemento Swiper existe na página atual
    if (document.querySelector('.swiper')) {
        // Inicializa o Swiper
        const swiper = new Swiper('.swiper', {
            // Opções do Swiper
            loop: true, // Navegação infinita
            autoplay: {
                delay: 5000, // Muda de slide a cada 5 segundos
                disableOnInteraction: false, // Continua autoplay após interação do utilizador
            },
            pagination: {
                el: '.swiper-pagination', // Elemento da paginação
                clickable: true, // Permite clicar nos bullets da paginação
            },
            navigation: {
                nextEl: '.swiper-button-next', // Elemento do botão "próximo"
                prevEl: '.swiper-button-prev', // Elemento do botão "anterior"
            },
            // Efeito de transição (opcional, 'fade' é uma alternativa suave)
            // effect: 'fade',
            // fadeEffect: {
            //   crossFade: true
            // },

            // Garante que o Swiper se ajusta quando a janela é redimensionada
             observer: true,
             observeParents: true,
        });
         console.log("Swiper inicializado.");
    } else {
         console.log("Elemento .swiper não encontrado nesta página. Swiper não inicializado.");
    }
});