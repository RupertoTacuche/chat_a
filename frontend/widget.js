(function() {
    // URL de tu frontend desplegado en Netlify
    const chatbotUrl = "https://chatbotpr.netlify.app/chatbot.html";
    

    // Opcional: crea un botón o un icono flotante
    const chatbotIcon = document.createElement('div');
    chatbotIcon.innerHTML = '🤖'; // Puedes usar un emoji o un icono SVG
    chatbotIcon.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        cursor: pointer;
        font-size: 40px;
        background: #007bff;
        color: white;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    `;

    // Crea el contenedor del chatbot (donde se incrustará el iframe)
    const chatbotContainer = document.createElement('div');
    chatbotContainer.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 350px;
        height: 500px;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        border-radius: 10px;
        overflow: hidden;
        display: none; /* Oculto por defecto */
    `;

    // Crea el iframe
    const iframe = document.createElement('iframe');
    iframe.src = chatbotUrl;
    iframe.frameBorder = "0";
    iframe.width = "100%";
    iframe.height = "100%";

    // Agrega el iframe al contenedor
    chatbotContainer.appendChild(iframe);

    // Agrega el ícono y el contenedor al body del documento
    document.body.appendChild(chatbotIcon);
    document.body.appendChild(chatbotContainer);

    // Lógica para mostrar/ocultar el chatbot al hacer clic en el ícono
    chatbotIcon.addEventListener('click', () => {
        const isHidden = chatbotContainer.style.display === 'none';
        chatbotContainer.style.display = isHidden ? 'block' : 'none';
    });
})();