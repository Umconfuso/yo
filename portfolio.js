document.addEventListener('DOMContentLoaded', () => {
    // Elementos do Modal
    const portfolioModal = document.getElementById('portfolio-modal');
    const modalTitle = document.getElementById('modal-project-title');
    const modalSwiperWrapper = document.querySelector('#portfolio-modal .swiper-wrapper');
    const closeModalButton = document.getElementById('close-modal-button');
    const projectItems = document.querySelectorAll('.project-item');

    let modalSwiper = null; // Variável para guardar a instância do Swiper no modal

    // Função para abrir o modal
    const openModal = (projectElement) => {
        const title = projectElement.dataset.projectTitle || 'Detalhes do Projeto';
        const imagesJson = projectElement.dataset.projectImages;

        if (!imagesJson) {
            console.error('Erro: Atributo data-project-images não encontrado ou vazio.');
            // Opcional: Mostrar uma mensagem de erro ao utilizador
            // alert('Não foi possível carregar as imagens deste projeto.');
            return;
        }

        let images = [];
        try {
            images = JSON.parse(imagesJson); // Converte a string JSON num array
        } catch (e) {
            console.error('Erro ao fazer parse do JSON das imagens:', e);
            // alert('Ocorreu um erro ao carregar as imagens.');
            return;
        }

        if (!Array.isArray(images) || images.length === 0) {
            console.error('Erro: Nenhuma imagem encontrada para este projeto ou formato inválido.');
             // alert('Nenhuma imagem encontrada para este projeto.');
            return;
        }

        // Atualizar título do modal
        modalTitle.textContent = title;

        // Limpar slides antigos do wrapper do Swiper
        if (modalSwiperWrapper) {
            modalSwiperWrapper.innerHTML = '';
        } else {
            console.error("Elemento .swiper-wrapper dentro do modal não encontrado.");
            return;
        }


        // Criar novos slides para o carrossel do modal
        images.forEach(imageUrl => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `
                <div class="flex justify-center items-center h-full bg-black bg-opacity-50">
                    <img src="${imageUrl}" alt="${title}" class="max-w-full max-h-[80vh] object-contain rounded-md" onerror="this.onerror=null; this.src='https://placehold.co/800x600/333333/eeeeee?text=Erro+ao+carregar'; this.alt='Erro ao carregar imagem';">
                </div>
            `;
            modalSwiperWrapper.appendChild(slide);
        });

        // Mostrar o modal
        if (portfolioModal) {
            portfolioModal.classList.remove('hidden');
            portfolioModal.classList.add('flex'); // Usar flex para centrar
             document.body.style.overflow = 'hidden'; // Evitar scroll da página principal
        } else {
             console.error("Elemento do modal principal não encontrado.");
             return;
        }


        // Destruir instância anterior do Swiper se existir
        if (modalSwiper) {
            modalSwiper.destroy(true, true);
            modalSwiper = null;
             console.log("Instância anterior do Swiper destruída.");
        }

        // Inicializar o Swiper DENTRO do modal (APÓS adicionar os slides)
        modalSwiper = new Swiper('#portfolio-modal .swiper', {
            loop: images.length > 1, // Loop só se houver mais de 1 imagem
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: '#portfolio-modal .swiper-button-next',
                prevEl: '#portfolio-modal .swiper-button-prev',
            },
            pagination: {
                el: '#portfolio-modal .swiper-pagination',
                clickable: true,
            },
            keyboard: {
                enabled: true, // Permite navegação pelo teclado
            },
            // Garante que o Swiper se recalcula ao ser exibido
            observer: true,
            observeParents: true,
            on: {
                init: function () {
                    // Força a atualização após um pequeno delay para garantir o layout
                    setTimeout(() => this.update(), 50);
                },
            }
        });
         console.log("Nova instância do Swiper inicializada no modal.");

    };

    // Função para fechar o modal
    const closeModal = () => {
         if (portfolioModal) {
            portfolioModal.classList.add('hidden');
            portfolioModal.classList.remove('flex');
             document.body.style.overflow = ''; // Restaurar scroll da página principal

             // Destruir o Swiper ao fechar para libertar memória
             if (modalSwiper) {
                modalSwiper.destroy(true, true);
                modalSwiper = null;
                console.log("Instância do Swiper destruída ao fechar modal.");
             }
             // Limpar conteúdo para evitar flash de conteúdo antigo na próxima abertura
             if (modalSwiperWrapper) modalSwiperWrapper.innerHTML = '';
             if (modalTitle) modalTitle.textContent = '';

         }
    };

    // Adicionar evento de clique a cada item do projeto
    projectItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Previne comportamento padrão se for um link <a>
            openModal(item);
        });
        item.style.cursor = 'pointer'; // Indica que é clicável
    });

    // Adicionar evento de clique ao botão de fechar
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Adicionar evento para fechar ao clicar fora do conteúdo do modal (no overlay)
    if (portfolioModal) {
        portfolioModal.addEventListener('click', (event) => {
            // Verifica se o clique foi no próprio overlay (fundo) e não nos seus filhos
            if (event.target === portfolioModal) {
                closeModal();
            }
        });
    }

     // Adicionar evento para fechar com a tecla Escape
     document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && portfolioModal && !portfolioModal.classList.contains('hidden')) {
            closeModal();
        }
    });

});
