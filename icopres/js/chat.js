const initialMessage = `
    <div class="message received center-message">
        <div class="hello-notice">
            ¡Hola! ¿En qué puedo ayudarte?
        </div>
    </div>
    <div class="faq-options">
        <div class="faq-option" onclick="showAnswer(0)">¿Cómo puedo contactarlos?</div>
        <div class="faq-option" onclick="showAnswer(1)">¿Qué servicios tienen?</div>
        <div class="faq-option" onclick="window.open('files/cv-2025.pdf');">Ver nuestra trayectoria</div>
    </div>
`;

const answers = [
    `Para contanctarnos puedes usar las siguientes opciones:<br><br>
    • Email: info@icopres.mx<br>
    • Tel: (614) 430 2438<br>
    • WhatsApp: (614) 430 2438`,

    `Contamos con los siguientes servicios:<br><br>
    • Ingeniería de Presas de Jales<br>
    • Desarrollo de proyectos de infraestructura en minas`
];

function initChat() {
    const chatContent = document.getElementById('chatContent');
    chatContent.innerHTML = initialMessage;
}

function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.classList.toggle('active');
    if (chatContainer.classList.contains('active')) {
        initChat();
    }
}

function showAnswer(index) {
    const chatContent = document.getElementById('chatContent');
    const question = document.querySelectorAll('.faq-option')[index].textContent;

    chatContent.innerHTML = `
        <div class="message sent">
            <div class="message-content">${question}</div>
        </div>
        <div class="message received">
            <div class="message-content">${answers[index]}</div>
        </div>
        <div class="back-notice center-message" onclick="initChat()">
            Click aquí para ver más opciones
        </div>
    `;
}

// Inicializar el chat
document.addEventListener('DOMContentLoaded', initChat);
