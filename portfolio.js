document.addEventListener('DOMContentLoaded', () => {
    // Elementos da Galeria Overlay
    const galleryOverlay = document.getElementById('portfolio-gallery-overlay'); // ID atualizado
    const galleryTitle = document.getElementById('gallery-project-title'); // ID atualizado
    const gallerySwiperWrapper = document.querySelector('#portfolio-gallery-overlay .swiper-wrapper');
    const closeGalleryButton = document.getElementById('close-gallery-button'); // ID atualizado
    const projectItems = document.querySelectorAll('.project-item');

    let gallerySwiper = null; // Variável para guardar a instância do Swiper na galeria

    // Função para abrir a galeria
    const openGallery = (projectElement) => {
        const title = projectElement.dataset.projectTitle || 'Detalhes do Projeto';
        const imagesJson = projectElement.dataset.projectImages;

        if (!imagesJson) {
            console.error('Erro: Atributo data-project-images não encontrado ou vazio.');
            return;
        }

        let images = [];
        try {
            images = JSON.parse(imagesJson);
        } catch (e) {
            console.error('Erro ao fazer parse do JSON das imagens:', e);
            return;
        }

        if (!Array.isArray(images) || images.length === 0) {
            console.error('Erro: Nenhuma imagem encontrada para este projeto ou formato inválido.');
            return;
        }

        // Atualizar título da galeria
        if(galleryTitle) galleryTitle.textContent = title;

        // Limpar slides antigos
        if (gallerySwiperWrapper) {
            gallerySwiperWrapper.innerHTML = '';
        } else {
            console.error("Elemento .swiper-wrapper dentro da galeria não encontrado.");
            return;
        }

        // Criar novos slides
        images.forEach(imageUrl => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            // Adiciona flex para centralizar a imagem dentro do slide
            slide.classList.add('flex', 'items-center', 'justify-center');
            slide.innerHTML = `
                <img src="${imageUrl}" alt="${title}" class="max-w-full max-h-full object-contain" onerror="this.onerror=null; this.src='https://placehold.co/1000x700/333333/eeeeee?text=Erro+ao+carregar'; this.alt='Erro ao carregar imagem';">
            `;
            gallerySwiperWrapper.appendChild(slide);
        });

        // Mostrar a galeria (controlando opacidade e eventos)
        if (galleryOverlay) {
            galleryOverlay.classList.remove('opacity-0', 'pointer-events-none');
            galleryOverlay.classList.add('opacity-100', 'pointer-events-auto');
            document.body.style.overflow = 'hidden'; // Evitar scroll da página principal
        } else {
             console.error("Elemento da galeria overlay não encontrado.");
             return;
        }

        // Destruir instância anterior do Swiper se existir
        if (gallerySwiper) {
            gallerySwiper.destroy(true, true);
            gallerySwiper = null;
        }

        // Inicializar o Swiper DENTRO da galeria
        gallerySwiper = new Swiper('#portfolio-gallery-overlay .swiper', {
            loop: images.length > 1,
            slidesPerView: 1,
            spaceBetween: 30, // Espaço entre slides (útil se houver efeitos)
            navigation: {
                nextEl: '#portfolio-gallery-overlay .swiper-button-next',
                prevEl: '#portfolio-gallery-overlay .swiper-button-prev',
            },
            pagination: {
                el: '#portfolio-gallery-overlay .swiper-pagination',
                clickable: true,
            },
            keyboard: {
                enabled: true,
            },
            // Efeito de fade pode ser mais suave (opcional)
            // effect: 'fade',
            // fadeEffect: {
            //   crossFade: true
            // },
            observer: true,
            observeParents: true,
             on: {
                init: function () {
                    // Força a atualização após um pequeno delay
                     setTimeout(() => this.update(), 50);
                },
            }
        });
         console.log("Swiper da galeria inicializado.");
    };

    // Função para fechar a galeria
    const closeGallery = () => {
         if (galleryOverlay) {
            galleryOverlay.classList.remove('opacity-100', 'pointer-events-auto');
            galleryOverlay.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = ''; // Restaurar scroll

            // Adicionar um pequeno delay antes de destruir/limpar para a transição de fade-out terminar
            setTimeout(() => {
                 if (gallerySwiper) {
                    gallerySwiper.destroy(true, true);
                    gallerySwiper = null;
                    console.log("Swiper da galeria destruído.");
                 }
                 // Limpar conteúdo
                 if (gallerySwiperWrapper) gallerySwiperWrapper.innerHTML = '';
                 if (galleryTitle) galleryTitle.textContent = '';
            }, 300); // 300ms (igual à duração da transição de opacidade)
         }
    };

    // Adicionar evento de clique a cada item do projeto
    projectItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            openGallery(item);
        });
        // Manter cursor pointer se já não estiver definido por outras classes group/hover
        if (!item.style.cursor) {
             item.style.cursor = 'pointer';
        }
    });

    // Adicionar evento de clique ao botão de fechar
    if (closeGalleryButton) {
        closeGalleryButton.addEventListener('click', closeGallery);
    }

    // Adicionar evento para fechar com a tecla Escape
     document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && galleryOverlay && galleryOverlay.classList.contains('opacity-100')) {
            closeGallery();
        }
    });

    // Opcional: Fechar ao clicar no fundo escuro (se desejar)
    // if (galleryOverlay) {
    //     galleryOverlay.addEventListener('click', (event) => {
    //         // Verifica se o clique foi no próprio overlay e não num filho (como a imagem ou botão)
    //         if (event.target === galleryOverlay) {
    //              closeGallery();
    //         }
    //     });
    // }

});

