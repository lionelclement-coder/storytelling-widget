// Widget CTA Flottant - Storytelling Cooking
// Fichier autonome pour intégration sur toutes les pages

(function() {
    'use strict';
    
    // Vérifier si le widget n'est pas déjà chargé
    if (document.getElementById('storytelling-widget-container')) {
        return;
    }
    
    // Créer le conteneur principal
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'storytelling-widget-container';
    widgetContainer.className = 'storytelling-widget-container';
    
    // HTML du widget
    widgetContainer.innerHTML = `
        <!-- Widget Button Flottant -->
        <div class="widget-button" onclick="toggleWidget()" id="widgetButton">
            <span class="widget-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor"></path>
                </svg>
            </span>
            <span class="widget-badge">1</span>
            <span class="widget-tooltip">Réservez votre session gratuite</span>
        </div>

        <!-- Widget Popup -->
        <div class="widget-popup" id="widgetPopup">
            <!-- Écran de présentation -->
            <div id="presentationScreen">
                <div class="widget-header">
                    <div class="profile-section">
                        <div class="profile-avatar">
                            <img src="https://storage.googleapis.com/msgsndr/nvkv3jePBtXE5xe8BRwW/media/68c13f415e1b5f63d9430957.png" alt="Lionel Clément" />
                            <div class="profile-online"></div>
                        </div>
                        <div class="profile-info">
                            <h3>Lionel Clément</h3>
                            <p>Fondateur de Storytelling Cooking</p>
                        </div>
                    </div>
                    <button class="widget-close" onclick="toggleWidget()">×</button>
                </div>
                <div class="service-description">
                    <h4>30 minutes pour discuter ensemble de votre projet 🚀</h4>
                    <p>Réservez maintenant votre rendez-vous offert (les places sont limitées)</p>
                </div>
                <div class="urgency-section">
                    <div class="urgency-progress"></div>
                    <div class="urgency-content">
                        <span class="urgency-text">Attention, il ne reste que quelques places !</span>
                        <span class="countdown-timer" id="countdownTimer">02:40</span>
                    </div>
                </div>
                <div class="date-selection">
                    <div class="date-buttons">
                        <button class="date-btn selected" data-date="28">dim. 28</button>
                        <button class="date-btn" data-date="29">lun. 29</button>
                        <button class="date-btn" data-date="30">mar. 30</button>
                        <button class="date-btn" data-date="01">mer. 01</button>
                        <button class="date-btn" data-date="02">jeu. 02</button>
                    </div>
                </div>
                <div class="cta-section">
                    <button class="cta-button" onclick="showCalendar()">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z" fill="currentColor"></path>
                        </svg>
                        Prendre rendez-vous
                    </button>
                </div>
            </div>
            <!-- Écran du calendrier -->
            <div class="widget-body" id="calendarScreen" style="display: none;">
                <div class="widget-iframe-container" id="widgetCalendar">
                    <iframe src="https://api.leadconnectorhq.com/widget/booking/Iai102FH7AznXD12tc0G" style="width: 100%; height: 100%; border:none; overflow: hidden;" scrolling="no" id="bookingIframe"></iframe>
                </div>
            </div>
        </div>

        <!-- Popup de calendrier séparée -->
        <div id="calendarPopup" class="calendar-popup" style="display: none;">
            <div class="calendar-popup-content">
                <div class="calendar-popup-header">
                    <h3>Réservez votre session découverte</h3>
                    <button class="calendar-popup-close" onclick="closeCalendarPopup()">×</button>
                </div>
                <div class="calendar-popup-body">
                    <div class="widget-iframe-container">
                        <iframe src="https://api.leadconnectorhq.com/widget/booking/Iai102FH7AznXD12tc0G" style="width: 100%; height: 100%; border:none; overflow: hidden;" scrolling="no" id="bookingIframePopup"></iframe>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // CSS du widget
    const widgetStyles = document.createElement('style');
    widgetStyles.textContent = `
        /* Import de la police Poppins */
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        /* Variables de couleurs */
        .storytelling-widget-container {
            --widget-primary: #008C45;
            --widget-secondary: #CD212A;
            --widget-dark: #2C3E50;
            --widget-light: #FAFAFA;
        }
        
        /* Widget Button Flottant */
        .storytelling-widget-container .widget-button {
            position: fixed !important;
            bottom: 30px !important;
            right: 30px !important;
            width: 65px !important;
            height: 65px !important;
            background: linear-gradient(135deg, var(--widget-primary), #00A651) !important;
            border-radius: 50% !important;
            box-shadow: 0 5px 20px rgba(0, 140, 69, 0.4) !important;
            cursor: pointer !important;
            z-index: 999999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.3s ease !important;
            animation: pulse-widget 2s infinite !important;
            border: none !important;
            outline: none !important;
        }
        
        @keyframes pulse-widget {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
        }
        
        .storytelling-widget-container .widget-button:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 8px 30px rgba(0, 140, 69, 0.5) !important;
        }
        
        .storytelling-widget-container .widget-button.active {
            background: var(--widget-secondary) !important;
            animation: none !important;
            transform: rotate(90deg) !important;
        }
        
        .storytelling-widget-container .widget-icon {
            font-size: 30px !important;
            color: white !important;
            transition: transform 0.3s ease !important;
        }
        
        .storytelling-widget-container .widget-button.active .widget-icon {
            transform: rotate(-90deg) !important;
        }
        
        /* Badge de notification */
        .storytelling-widget-container .widget-badge {
            position: absolute !important;
            top: -5px !important;
            right: -5px !important;
            background: var(--widget-secondary) !important;
            color: white !important;
            width: 24px !important;
            height: 24px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 11px !important;
            font-weight: bold !important;
            animation: bounce-badge 1s infinite !important;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        }
        
        @keyframes bounce-badge {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
        }
        
        /* Tooltip au survol */
        .storytelling-widget-container .widget-tooltip {
            position: absolute !important;
            right: 80px !important;
            bottom: 20px !important;
            background: var(--widget-dark) !important;
            color: white !important;
            padding: 0.8rem 1.3rem !important;
            border-radius: 10px !important;
            white-space: nowrap !important;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            opacity: 0 !important;
            transform: translateX(10px) !important;
            transition: all 0.3s ease !important;
            pointer-events: none !important;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
            min-width: fit-content !important;
            width: max-content !important;
            line-height: 1.4 !important;
        }
        
        .storytelling-widget-container .widget-button:hover .widget-tooltip {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }
        
        .storytelling-widget-container .widget-tooltip::after {
            content: "" !important;
            position: absolute !important;
            right: -7px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            width: 0 !important;
            height: 0 !important;
            border-left: 8px solid var(--widget-dark) !important;
            border-top: 8px solid transparent !important;
            border-bottom: 8px solid transparent !important;
        }
        
        /* Popup Container */
        .storytelling-widget-container .widget-popup {
            position: fixed !important;
            bottom: 110px !important;
            right: 30px !important;
            width: 400px !important;
            max-width: calc(100vw - 60px) !important;
            max-height: 600px !important;
            background: white !important;
            border-radius: 20px !important;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2) !important;
            z-index: 999997 !important;
            opacity: 0 !important;
            transform: translateY(20px) scale(0.95) !important;
            transition: all 0.3s ease !important;
            visibility: hidden !important;
            overflow: hidden !important;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        }
        
        .storytelling-widget-container .widget-popup.active {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
            visibility: visible !important;
        }
        
        /* Header du popup avec profil */
        .storytelling-widget-container .widget-header {
            padding: 1.5rem !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            border-bottom: 1px solid #eee !important;
        }
        
        .storytelling-widget-container .profile-section {
            display: flex !important;
            align-items: center !important;
            gap: 1rem !important;
        }
        
        .storytelling-widget-container .profile-avatar {
            width: 50px !important;
            height: 50px !important;
            border-radius: 50% !important;
            background: linear-gradient(135deg, var(--widget-primary), #00A651) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            color: white !important;
            font-size: 1.5rem !important;
            position: relative !important;
            overflow: hidden !important;
        }
        
        .storytelling-widget-container .profile-avatar img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            border-radius: 50% !important;
        }
        
        .storytelling-widget-container .profile-online {
            position: absolute !important;
            bottom: 2px !important;
            right: 2px !important;
            width: 12px !important;
            height: 12px !important;
            background: #00ff00 !important;
            border: 2px solid white !important;
            border-radius: 50% !important;
        }
        
        .storytelling-widget-container .profile-info h3 {
            margin: 0 !important;
            font-size: 1.1rem !important;
            color: var(--widget-dark) !important;
            font-weight: 600 !important;
        }
        
        .storytelling-widget-container .profile-info p {
            margin: 0 !important;
            font-size: 0.9rem !important;
            color: #666 !important;
        }
        
        .storytelling-widget-container .widget-close {
            background: #f5f5f5 !important;
            border: none !important;
            width: 35px !important;
            height: 35px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            color: #666 !important;
            font-size: 20px !important;
        }
        
        .storytelling-widget-container .widget-close:hover {
            background: #e0e0e0 !important;
            transform: rotate(90deg) !important;
        }
        
        /* Service description */
        .storytelling-widget-container .service-description {
            padding: 1.5rem !important;
            text-align: center !important;
        }
        
        .storytelling-widget-container .service-description h4 {
            margin: 0 0 0.5rem 0 !important;
            font-size: 1.2rem !important;
            color: var(--widget-dark) !important;
            font-weight: 600 !important;
        }
        
        .storytelling-widget-container .service-description p {
            margin: 0 !important;
            color: #666 !important;
            font-size: 0.9rem !important;
        }
        
        /* Urgency section */
        .storytelling-widget-container .urgency-section {
            margin: 1rem 1.5rem !important;
            background: #f8f9fa !important;
            border-radius: 10px !important;
            padding: 1rem !important;
            position: relative !important;
            overflow: hidden !important;
        }
        
        .storytelling-widget-container .urgency-progress {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            height: 3px !important;
            background: linear-gradient(90deg, var(--widget-primary), #00A651) !important;
            width: 30% !important;
            transition: width 0.3s ease !important;
        }
        
        .storytelling-widget-container .urgency-content {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
        }
        
        .storytelling-widget-container .urgency-text {
            font-size: 0.9rem !important;
            color: var(--widget-dark) !important;
            font-weight: 500 !important;
        }
        
        .storytelling-widget-container .countdown-timer {
            font-size: 1.2rem !important;
            font-weight: bold !important;
            color: var(--widget-secondary) !important;
            font-family: 'Courier New', monospace !important;
        }
        
        /* Date selection */
        .storytelling-widget-container .date-selection {
            padding: 1rem 1.5rem !important;
        }
        
        .storytelling-widget-container .date-buttons {
            display: flex !important;
            gap: 0.5rem !important;
            justify-content: center !important;
            flex-wrap: wrap !important;
        }
        
        .storytelling-widget-container .date-btn {
            padding: 0.8rem 1rem !important;
            border: 2px solid #e0e0e0 !important;
            background: white !important;
            border-radius: 10px !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            font-size: 0.9rem !important;
            font-weight: 500 !important;
            color: var(--widget-dark) !important;
            min-width: 60px !important;
            text-align: center !important;
        }
        
        .storytelling-widget-container .date-btn:hover {
            border-color: var(--widget-primary) !important;
            background: #f8f9fa !important;
        }
        
        .storytelling-widget-container .date-btn.selected {
            border-color: var(--widget-primary) !important;
            background: var(--widget-primary) !important;
            color: white !important;
        }
        
        /* CTA Button */
        .storytelling-widget-container .cta-section {
            padding: 1rem 1.5rem 1.5rem !important;
        }
        
        .storytelling-widget-container .cta-button {
            width: 100% !important;
            padding: 1rem !important;
            background: linear-gradient(135deg, #2b2e71, var(--widget-primary)) !important;
            color: white !important;
            border: none !important;
            border-radius: 10px !important;
            font-size: 1rem !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.5rem !important;
        }
        
        .storytelling-widget-container .cta-button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 5px 15px rgba(0, 140, 69, 0.3) !important;
        }
        
        /* Calendar view */
        .storytelling-widget-container .widget-body {
            height: 500px !important;
            overflow-y: auto !important;
            position: relative !important;
        }
        
        .storytelling-widget-container .widget-iframe-container {
            width: 100% !important;
            height: 100% !important;
            position: relative !important;
            display: none !important;
        }
        
        .storytelling-widget-container .widget-iframe-container.active {
            display: block !important;
        }
        
        .storytelling-widget-container .widget-iframe-container iframe {
            width: 100% !important;
            height: 100% !important;
            border: none !important;
        }
        
        /* Popup de calendrier séparée */
        .storytelling-widget-container .calendar-popup {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: rgba(0, 0, 0, 0.7) !important;
            z-index: 10000 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            animation: fadeIn 0.3s ease !important;
            font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        }
        
        .storytelling-widget-container .calendar-popup-content {
            background: white !important;
            border-radius: 20px !important;
            width: 90% !important;
            max-width: 900px !important;
            max-height: 90vh !important;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
            animation: slideUp 0.3s ease !important;
            overflow: hidden !important;
            margin: auto !important;
            position: relative !important;
        }
        
        .storytelling-widget-container .calendar-popup-header {
            background: linear-gradient(135deg, var(--widget-primary), #00A651) !important;
            color: white !important;
            padding: 1.5rem 2rem !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
        }
        
        .storytelling-widget-container .calendar-popup-header h3 {
            margin: 0 !important;
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        }
        
        .storytelling-widget-container .calendar-popup-close {
            background: rgba(255, 255, 255, 0.2) !important;
            border: none !important;
            width: 40px !important;
            height: 40px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            color: white !important;
            font-size: 24px !important;
            font-weight: bold !important;
        }
        
        .storytelling-widget-container .calendar-popup-close:hover {
            background: rgba(255, 255, 255, 0.3) !important;
            transform: rotate(90deg) !important;
        }
        
        .storytelling-widget-container .calendar-popup-body {
            height: 600px !important;
            overflow: hidden !important;
            position: relative !important;
        }
        
        .storytelling-widget-container .calendar-popup-body .widget-iframe-container {
            width: 100% !important;
            height: 100% !important;
            position: relative !important;
            display: block !important;
        }
        
        .storytelling-widget-container .calendar-popup-body iframe {
            width: 100% !important;
            height: 100% !important;
            border: none !important;
            min-height: 600px !important;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        /* Mobile Responsive */
        @media (max-width: 500px) {
            .storytelling-widget-container .widget-button {
                bottom: 20px !important;
                right: 20px !important;
                width: 60px !important;
                height: 60px !important;
            }
            
            .storytelling-widget-container .widget-popup {
                bottom: 90px !important;
                right: 20px !important;
                left: 20px !important;
                width: auto !important;
                max-height: 70vh !important;
            }
            
            .storytelling-widget-container .widget-header h3 {
                font-size: 1.1rem !important;
            }
            
            .storytelling-widget-container .widget-body {
                height: 400px !important;
            }
            
            .storytelling-widget-container .widget-tooltip {
                display: none !important;
            }
        }
    `;
    
    // Ajouter les styles au head
    document.head.appendChild(widgetStyles);
    
    // Ajouter le widget au body
    document.body.appendChild(widgetContainer);
    
    // Variables globales
    let isWidgetOpen = false;
    let calendarLoaded = false;
    let autoOpenExecuted = false;
    let countdownInterval = null;
    
    // Fonctions du widget
    window.toggleWidget = function() {
        const button = document.getElementById('widgetButton');
        const popup = document.getElementById('widgetPopup');
        const badge = document.querySelector('.widget-badge');
        
        isWidgetOpen = !isWidgetOpen;
        
        if (isWidgetOpen) {
            button.classList.add('active');
            popup.classList.add('active');
            
            // Cache le badge quand on ouvre
            if (badge) {
                badge.style.display = 'none';
            }
            
            // Affiche l'écran de présentation par défaut
            showPresentationScreen();
            
            // Démarre le countdown
            startCountdown();
        } else {
            button.classList.remove('active');
            popup.classList.remove('active');
            
            // Arrête le countdown
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
        }
    };
    
    window.showPresentationScreen = function() {
        document.getElementById('presentationScreen').style.display = 'block';
        document.getElementById('calendarScreen').style.display = 'none';
    };
    
    window.showCalendar = function() {
        // Ferme le widget
        toggleWidget();
        
        // Ouvre la popup de calendrier
        openCalendarPopup();
    };
    
    window.openCalendarPopup = function() {
        // Affiche la popup de calendrier
        document.getElementById('calendarPopup').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Charge le calendrier si pas encore fait
        if (!calendarLoaded) {
            loadCalendar();
        }
        
        // Force le rechargement de l'iframe
        setTimeout(() => {
            const iframe = document.getElementById('bookingIframePopup');
            if (iframe) {
                iframe.src = iframe.src;
            }
        }, 100);
    };
    
    window.closeCalendarPopup = function() {
        document.getElementById('calendarPopup').style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    function loadCalendar() {
        calendarLoaded = true;
        
        // Charge le script form_embed si nécessaire
        if (!document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]')) {
            const script = document.createElement('script');
            script.src = "https://link.msgsndr.com/js/form_embed.js";
            script.type = "text/javascript";
            document.body.appendChild(script);
        }
    }
    
    function startCountdown() {
        let timeLeft = 160; // 2 minutes 40 secondes
        
        countdownInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            const timerElement = document.getElementById('countdownTimer');
            if (timerElement) {
                timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
            
            // Met à jour la barre de progression
            const progressElement = document.querySelector('.urgency-progress');
            if (progressElement) {
                const progress = ((160 - timeLeft) / 160) * 100;
                progressElement.style.width = `${Math.min(progress, 100)}%`;
            }
            
            timeLeft--;
            
            if (timeLeft < 0) {
                clearInterval(countdownInterval);
                // Reset le countdown
                setTimeout(() => {
                    startCountdown();
                }, 1000);
            }
        }, 1000);
    }
    
    // Gestion des boutons de dates
    document.addEventListener('DOMContentLoaded', function() {
        const dateButtons = document.querySelectorAll('.date-btn');
        
        dateButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retire la classe selected de tous les boutons
                dateButtons.forEach(btn => btn.classList.remove('selected'));
                
                // Ajoute la classe selected au bouton cliqué
                this.classList.add('selected');
            });
        });
    });
    
    // Ferme le widget si on clique en dehors
    document.addEventListener('click', function(event) {
        const button = document.getElementById('widgetButton');
        const popup = document.getElementById('widgetPopup');
        const calendarPopup = document.getElementById('calendarPopup');
        
        // Ferme le widget principal
        if (isWidgetOpen && 
            !button.contains(event.target) && 
            !popup.contains(event.target)) {
            toggleWidget();
        }
        
        // Ferme la popup de calendrier
        if (calendarPopup && 
            (calendarPopup.style.display === 'flex' || calendarPopup.style.display === 'block') &&
            event.target.id === 'calendarPopup') {
            closeCalendarPopup();
        }
    });
    
    // Animation du badge après 3 secondes
    setTimeout(() => {
        const badge = document.querySelector('.widget-badge');
        if (badge && !isWidgetOpen) {
            badge.style.animation = 'bounce-badge 1s infinite, pulse-widget 0.5s ease';
        }
    }, 3000);
    
    // Ouverture automatique après 5 secondes
    setTimeout(() => {
        if (!isWidgetOpen && !autoOpenExecuted) {
            toggleWidget();
            autoOpenExecuted = true;
            
            // Animation d'attention sur le popup
            const popup = document.getElementById('widgetPopup');
            if (popup) {
                popup.style.animation = 'pulse-widget 0.5s ease';
                setTimeout(() => {
                    popup.style.animation = '';
                }, 500);
            }
        }
    }, 5000);
    
})();
