
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const chatButton = document.querySelector('.chat-bot');
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chat-container';
    chatContainer.className = 'chat-container hidden';
    
    // Chat HTML Structure
    chatContainer.innerHTML = `
        <div class="chat-header">
            <div class="chat-title">
                <i class="fa-solid fa-robot"></i>
                <span>NeoBot Assistente</span>
            </div>
            <button id="close-chat"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="chat-body" id="chat-body">
            <div class="message bot-message">
                <p>Olá! Sou o NeoBot. Como posso ajudar você hoje com seus investimentos?</p>
            </div>
            <div class="chat-options">
                <button class="chat-option" data-action="investimentos">Como funciona a IA?</button>
                <button class="chat-option" data-action="seguranca">É seguro?</button>
                <button class="chat-option" data-action="rendimento">Qual o rendimento médio?</button>
                <button class="chat-option action-whatsapp" data-action="whatsapp">Falar com Especialista Humano</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatContainer);
    
    const closeChatBtn = document.getElementById('close-chat');
    const chatBody = document.getElementById('chat-body');
    const optionsContainer = document.querySelector('.chat-options');
    
    // Toggle Chat
    chatButton.addEventListener('click', function(e) {
        e.preventDefault();
        chatContainer.classList.toggle('hidden');
        if (!chatContainer.classList.contains('hidden')) {
            // Scroll to bottom when opening
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    });
    
    closeChatBtn.addEventListener('click', function() {
        chatContainer.classList.add('hidden');
    });
    
    // Handle Options
    optionsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('chat-option')) {
            const action = e.target.getAttribute('data-action');
            const text = e.target.innerText;
            
            // Add User Message
            addMessage(text, 'user-message');
            
            // Process Response
            setTimeout(() => {
                handleResponse(action);
            }, 500);
        }
    });

    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatBody.insertBefore(messageDiv, optionsContainer);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    function handleResponse(action) {
        let response = "";
        let isFinal = false;

        switch(action) {
            case 'investimentos':
                response = "Nossa IA analisa 50.000 cenários por segundo para prever flutuações de mercado e alocar seu capital automaticamente nas melhores oportunidades globais.";
                break;
            case 'seguranca':
                response = "Utilizamos criptografia de ponta a ponta e seus ativos ficam sob custódia de bancos de nível 1. Sua segurança é nossa prioridade absoluta.";
                break;
            case 'rendimento':
                response = "Embora rentabilidade passada não garanta futuro, nossa metodologia tem superado o benchmark do mercado em 30% consistentemente nos últimos 2 anos.";
                break;
            case 'whatsapp':
                response = "Entendido! Vou te redirecionar para um de nossos especialistas humanos agora mesmo.";
                isFinal = true;
                setTimeout(() => {
                    window.open('https://wa.me/5521980198785', '_blank');
                }, 1500);
                break;
        }
        
        addMessage(response, 'bot-message');
        
        if(!isFinal) {
             // Re-show options after a delay or just keep them visible? 
             // In this simple version, options remain at the bottom. 
             // Ideally we might want to clear them or show 'Anything else?' logic.
             // For now, let's just scroll to bottom.
             chatBody.scrollTop = chatBody.scrollHeight;
        }
    }
});
