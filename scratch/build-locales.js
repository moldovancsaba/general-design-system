const fs = require('fs');
const path = require('path');

const dicts = {
  en: {
    settings: 'Settings', analytics: 'Analytics', dashboard: 'Dashboard', play: 'Play', start: 'Start',
    users: 'Users', add: 'Add', edit: 'Edit', delete: 'Delete', save: 'Save', cancel: 'Cancel', confirm: 'Confirm', close: 'Close', language: 'Language', theme: 'Theme',
    home: 'Home', inbox: 'Inbox', calendar: 'Calendar', gallery: 'Gallery', history: 'History', profile: 'Profile',
    send: 'Send', reply: 'Reply', forward: 'Forward', attach: 'Attach', upload: 'Upload', download: 'Download',
    print: 'Print', copy: 'Copy', duplicate: 'Duplicate', check: 'Check', uncheck: 'Uncheck', complete: 'Complete',
    clear: 'Clear', capture: 'Capture', record: 'Record', flip: 'Flip', flash: 'Flash', course: 'Course',
    lesson: 'Lesson', certificate: 'Certificate', student: 'Student', class: 'Class', grade: 'Grade', child: 'Child',
    family: 'Family', habit: 'Habit', goal: 'Goal', streak: 'Streak', reward: 'Reward', trophy: 'Trophy',
    crown: 'Crown', pause: 'Pause', message: 'Message', mail: 'Mail', refresh: 'Refresh', trendingUp: 'Trending Up',
    trendingDown: 'Trending Down', currency: 'Currency', grid: 'Grid', list: 'List', logout: 'Logout',
    notifications: 'Notifications', back: 'Back', eye: 'View', eyeOff: 'Hide', help: 'Help', filter: 'Filter', sort: 'Sort'
  },
  hu: {
    settings: 'Beállítások', analytics: 'Analitika', dashboard: 'Irányítópult', play: 'Lejátszás', start: 'Indítás',
    users: 'Felhasználók', add: 'Hozzáadás', edit: 'Szerkesztés', delete: 'Törlés', save: 'Mentés', language: 'Nyelv', theme: 'Téma',
    home: 'Főoldal', inbox: 'Beérkező', calendar: 'Naptár', gallery: 'Galéria', history: 'Előzmények', profile: 'Profil',
    send: 'Küldés', reply: 'Válasz', forward: 'Továbbítás', attach: 'Csatolás', upload: 'Feltöltés', download: 'Letöltés',
    print: 'Nyomtatás', copy: 'Másolás', duplicate: 'Duplikálás', check: 'Jelölés', uncheck: 'Jelölés törlése', complete: 'Kész',
    clear: 'Kiürítés', capture: 'Felvétel', record: 'Rögzítés', flip: 'Fordítás', flash: 'Vaku', course: 'Tanfolyam',
    lesson: 'Lecke', certificate: 'Tanúsítvány', student: 'Tanuló', class: 'Osztály', grade: 'Osztályzat', child: 'Gyermek',
    family: 'Család', habit: 'Szokás', goal: 'Cél', streak: 'Sorozat', reward: 'Jutalom', trophy: 'Trófea',
    crown: 'Korona', pause: 'Szünet', message: 'Üzenet', mail: 'Levél', refresh: 'Frissítés', trendingUp: 'Növekvő trend',
    trendingDown: 'Csökkenő trend', currency: 'Pénznem', grid: 'Rács', list: 'Lista', logout: 'Kijelentkezés',
    notifications: 'Értesítések', back: 'Vissza', eye: 'Megtekintés', eyeOff: 'Elrejtés', help: 'Súgó', filter: 'Szűrő', sort: 'Rendezés'
  },
  de: {
    settings: 'Einstellungen', analytics: 'Analyse', dashboard: 'Dashboard', play: 'Abspielen', start: 'Start',
    users: 'Benutzer', add: 'Hinzufügen', edit: 'Bearbeiten', delete: 'Löschen', save: 'Speichern', language: 'Sprache', theme: 'Thema',
    home: 'Startseite', inbox: 'Posteingang', calendar: 'Kalender', gallery: 'Galerie', history: 'Verlauf', profile: 'Profil',
    send: 'Senden', reply: 'Antworten', forward: 'Weiterleiten', attach: 'Anhängen', upload: 'Hochladen', download: 'Herunterladen',
    print: 'Drucken', copy: 'Kopieren', duplicate: 'Duplizieren', check: 'Überprüfen', uncheck: 'Häkchen entfernen', complete: 'Abschließen',
    clear: 'Leeren', capture: 'Aufnehmen', record: 'Aufzeichnen', flip: 'Umdrehen', flash: 'Blitz', course: 'Kurs',
    lesson: 'Lektion', certificate: 'Zertifikat', student: 'Student', class: 'Klasse', grade: 'Note', child: 'Kind',
    family: 'Familie', habit: 'Gewohnheit', goal: 'Ziel', streak: 'Serie', reward: 'Belohnung', trophy: 'Trophäe',
    crown: 'Krone', pause: 'Pause', message: 'Nachricht', mail: 'E-Mail', refresh: 'Aktualisieren', trendingUp: 'Aufwärtstrend',
    trendingDown: 'Abwärtstrend', currency: 'Währung', grid: 'Raster', list: 'Liste', logout: 'Abmelden',
    notifications: 'Benachrichtigungen', back: 'Zurück', eye: 'Anzeigen', eyeOff: 'Ausblenden', help: 'Hilfe', filter: 'Filter', sort: 'Sortieren'
  },
  fr: {
    settings: 'Paramètres', analytics: 'Analytique', dashboard: 'Tableau de bord', play: 'Jouer', start: 'Démarrer',
    users: 'Utilisateurs', add: 'Ajouter', edit: 'Modifier', delete: 'Supprimer', save: 'Enregistrer', language: 'Langue', theme: 'Thème',
    home: 'Accueil', inbox: 'Boîte de réception', calendar: 'Calendrier', gallery: 'Galerie', history: 'Historique', profile: 'Profil',
    send: 'Envoyer', reply: 'Répondre', forward: 'Transférer', attach: 'Joindre', upload: 'Téléverser', download: 'Télécharger',
    print: 'Imprimer', copy: 'Copier', duplicate: 'Dupliquer', check: 'Cocher', uncheck: 'Décocher', complete: 'Terminer',
    clear: 'Effacer', capture: 'Capturer', record: 'Enregistrer', flip: 'Retourner', flash: 'Flash', course: 'Cours',
    lesson: 'Leçon', certificate: 'Certificat', student: 'Étudiant', class: 'Classe', grade: 'Note', child: 'Enfant',
    family: 'Famille', habit: 'Habitude', goal: 'Objectif', streak: 'Série', reward: 'Récompense', trophy: 'Trophée',
    crown: 'Couronne', pause: 'Pause', message: 'Message', mail: 'Courrier', refresh: 'Actualiser', trendingUp: 'Tendance à la hausse',
    trendingDown: 'Tendance à la baisse', currency: 'Devise', grid: 'Grille', list: 'Liste', logout: 'Déconnexion',
    notifications: 'Notifications', back: 'Retour', eye: 'Afficher', eyeOff: 'Masquer', help: 'Aide', filter: 'Filtrer', sort: 'Trier'
  },
  it: {
    settings: 'Impostazioni', analytics: 'Analitica', dashboard: 'Dashboard', play: 'Riproduci', start: 'Inizia',
    users: 'Utenti', add: 'Aggiungi', edit: 'Modifica', delete: 'Elimina', save: 'Salva', language: 'Lingua', theme: 'Tema',
    home: 'Home', inbox: 'Posta in arrivo', calendar: 'Calendario', gallery: 'Galleria', history: 'Cronologia', profile: 'Profilo',
    send: 'Invia', reply: 'Rispondi', forward: 'Inoltra', attach: 'Allega', upload: 'Carica', download: 'Scarica',
    print: 'Stampa', copy: 'Copia', duplicate: 'Duplica', check: 'Seleziona', uncheck: 'Deseleziona', complete: 'Completa',
    clear: 'Pulisci', capture: 'Cattura', record: 'Registra', flip: 'Capovolgi', flash: 'Flash', course: 'Corso',
    lesson: 'Lezione', certificate: 'Certificato', student: 'Studente', class: 'Classe', grade: 'Voto', child: 'Bambino',
    family: 'Famiglia', habit: 'Abitudine', goal: 'Obiettivo', streak: 'Serie', reward: 'Ricompensa', trophy: 'Trofeo',
    crown: 'Corona', pause: 'Pausa', message: 'Messaggio', mail: 'Posta', refresh: 'Aggiorna', trendingUp: 'In crescita',
    trendingDown: 'In calo', currency: 'Valuta', grid: 'Griglia', list: 'Elenco', logout: 'Esci',
    notifications: 'Notifiche', back: 'Indietro', eye: 'Mostra', eyeOff: 'Nascondi', help: 'Aiuto', filter: 'Filtra', sort: 'Ordina'
  },
  ru: {
    settings: 'Настройки', analytics: 'Аналитика', dashboard: 'Панель', play: 'Воспроизвести', start: 'Старт',
    users: 'Пользователи', add: 'Добавить', edit: 'Изменить', delete: 'Удалить', save: 'Сохранить', language: 'Язык', theme: 'Тема',
    home: 'Главная', inbox: 'Входящие', calendar: 'Календарь', gallery: 'Галерея', history: 'История', profile: 'Профиль',
    send: 'Отправить', reply: 'Ответить', forward: 'Переслать', attach: 'Прикрепить', upload: 'Загрузить', download: 'Скачать',
    print: 'Печать', copy: 'Копировать', duplicate: 'Дублировать', check: 'Отметить', uncheck: 'Снять отметку', complete: 'Завершить',
    clear: 'Очистить', capture: 'Снять', record: 'Запись', flip: 'Перевернуть', flash: 'Вспышка', course: 'Курс',
    lesson: 'Урок', certificate: 'Сертификат', student: 'Студент', class: 'Класс', grade: 'Оценка', child: 'Ребенок',
    family: 'Семья', habit: 'Привычка', goal: 'Цель', streak: 'Серия', reward: 'Награда', trophy: 'Трофей',
    crown: 'Корона', pause: 'Пауза', message: 'Сообщение', mail: 'Почта', refresh: 'Обновить', trendingUp: 'Тенденция вверх',
    trendingDown: 'Тенденция вниз', currency: 'Валюта', grid: 'Сетка', list: 'Список', logout: 'Выйти',
    notifications: 'Уведомления', back: 'Назад', eye: 'Показать', eyeOff: 'Скрыть', help: 'Помощь', filter: 'Фильтр', sort: 'Сортировка'
  },
  he: {
    settings: 'הגדרות', analytics: 'ניתוח נתונים', dashboard: 'לוח בקרה', play: 'הפעל', start: 'התחל',
    users: 'משתמשים', add: 'הוסף', edit: 'ערוך', delete: 'מחק', save: 'שמור', language: 'שפה', theme: 'ערכת נושא',
    home: 'דף הבית', inbox: 'דואר נכנס', calendar: 'לוח שנה', gallery: 'גלריה', history: 'היסטוריה', profile: 'פרופיל',
    send: 'שלח', reply: 'השב', forward: 'העבר', attach: 'צרף', upload: 'העלה', download: 'הורד',
    print: 'הדפס', copy: 'העתק', duplicate: 'שכפל', check: 'סמן', uncheck: 'בטל סימון', complete: 'השלם',
    clear: 'נקה', capture: 'צלם', record: 'הקלט', flip: 'הפוך', flash: 'מבזק', course: 'קורס',
    lesson: 'שיעור', certificate: 'תעודה', student: 'תלמיד', class: 'כיתה', grade: 'ציון', child: 'ילד',
    family: 'משפחה', habit: 'הרגל', goal: 'מטרה', streak: 'רצף', reward: 'פרס', trophy: 'גביע',
    crown: 'כתר', pause: 'השהה', message: 'הודעה', mail: 'דואר', refresh: 'רענן', trendingUp: 'מגמה חיובית',
    trendingDown: 'מגמה שלילית', currency: 'מטבע', grid: 'רשת', list: 'רשימה', logout: 'התנתק',
    notifications: 'התראות', back: 'חזור', eye: 'הצג', eyeOff: 'הסתר', help: 'עזרה', filter: 'סנן', sort: 'מיין'
  },
  ar: {
    settings: 'الإعدادات', analytics: 'تحليلات', dashboard: 'لوحة القيادة', play: 'تشغيل', start: 'بدء',
    users: 'المستخدمين', add: 'إضافة', edit: 'تعديل', delete: 'حذف', save: 'حفظ', language: 'اللغة', theme: 'السمة',
    home: 'الرئيسية', inbox: 'صندوق الوارد', calendar: 'التقويم', gallery: 'المعرض', history: 'السجل', profile: 'الملف الشخصي',
    send: 'إرسال', reply: 'رد', forward: 'إعادة توجيه', attach: 'إرفاق', upload: 'رفع', download: 'تنزيل',
    print: 'طباعة', copy: 'نسخ', duplicate: 'تكرار', check: 'تحديد', uncheck: 'إلغاء التحديد', complete: 'اكتمال',
    clear: 'مسح', capture: 'التقاط', record: 'تسجيل', flip: 'قلب', flash: 'فلاش', course: 'دورة',
    lesson: 'درس', certificate: 'شهادة', student: 'طالب', class: 'فصل', grade: 'درجة', child: 'طفل',
    family: 'عائلة', habit: 'عادة', goal: 'هدف', streak: 'سلسلة', reward: 'مكافأة', trophy: 'كأس',
    crown: 'تاج', pause: 'إيقاف مؤقت', message: 'رسالة', mail: 'بريد', refresh: 'تحديث', trendingUp: 'اتجاه صاعد',
    trendingDown: 'اتجاه هابط', currency: 'عملة', grid: 'شبكة', list: 'قائمة', logout: 'تسجيل خروج',
    notifications: 'إشعارات', back: 'رجوع', eye: 'عرض', eyeOff: 'إخفاء', help: 'مساعدة', filter: 'تصفية', sort: 'فرز'
  }
};

const feedbackDicts = {
  en: {
    deleted: 'Deleted', cleared: 'Cleared', unchecked: 'Unchecked',
    saved: 'Saved', added: 'Added', uploaded: 'Uploaded', checked: 'Checked', completed: 'Completed',
    sent: 'Sent', replied: 'Replied', forwarded: 'Forwarded', mailed: 'Mailed',
    rewarded: 'Rewarded', captured: 'Captured', recorded: 'Recorded', copied: 'Copied!'
  },
  hu: {
    deleted: 'Törölve', cleared: 'Kiürítve', unchecked: 'Kijelölés törölve',
    saved: 'Mentve', added: 'Hozzáadva', uploaded: 'Feltöltve', checked: 'Kijelölve', completed: 'Befejezve',
    sent: 'Elküldve', replied: 'Megválaszolva', forwarded: 'Továbbítva', mailed: 'Elküldve',
    rewarded: 'Jutalmazva', captured: 'Rögzítve', recorded: 'Felvéve', copied: 'Másolva!'
  },
  de: {
    deleted: 'Gelöscht', cleared: 'Geleert', unchecked: 'Häkchen entfernt',
    saved: 'Gespeichert', added: 'Hinzugefügt', uploaded: 'Hochgeladen', checked: 'Ausgewählt', completed: 'Abgeschlossen',
    sent: 'Gesendet', replied: 'Geantwortet', forwarded: 'Weitergeleitet', mailed: 'Gemailt',
    rewarded: 'Belohnt', captured: 'Erfasst', recorded: 'Aufgezeichnet', copied: 'Kopiert!'
  },
  fr: {
    deleted: 'Supprimé', cleared: 'Effacé', unchecked: 'Décoché',
    saved: 'Enregistré', added: 'Ajouté', uploaded: 'Téléversé', checked: 'Coché', completed: 'Terminé',
    sent: 'Envoyé', replied: 'Répondu', forwarded: 'Transféré', mailed: 'Envoyé',
    rewarded: 'Récompensé', captured: 'Capturé', recorded: 'Enregistré', copied: 'Copié!'
  },
  it: {
    deleted: 'Eliminato', cleared: 'Svuotato', unchecked: 'Deselezionato',
    saved: 'Salvato', added: 'Aggiunto', uploaded: 'Caricato', checked: 'Selezionato', completed: 'Completato',
    sent: 'Inviato', replied: 'Risposto', forwarded: 'Inoltrato', mailed: 'Inviato',
    rewarded: 'Premiato', captured: 'Catturato', recorded: 'Registrato', copied: 'Copiato!'
  },
  ru: {
    deleted: 'Удалено', cleared: 'Очищено', unchecked: 'Отметка снята',
    saved: 'Сохранено', added: 'Добавлено', uploaded: 'Загружено', checked: 'Отмечено', completed: 'Завершено',
    sent: 'Отправлено', replied: 'Отвечено', forwarded: 'Переслано', mailed: 'Отправлено',
    rewarded: 'Награждено', captured: 'Снято', recorded: 'Записано', copied: 'Скопировано!'
  },
  he: {
    deleted: 'נמחק', cleared: 'נוקה', unchecked: 'הסימון בוטל',
    saved: 'נשמר', added: 'נוסף', uploaded: 'הועלה', checked: 'סומן', completed: 'הושלם',
    sent: 'נשלח', replied: 'נענה', forwarded: 'הועבר', mailed: 'נשלח',
    rewarded: 'תוגמל', captured: 'צולם', recorded: 'הוקלט', copied: 'הועתק!'
  },
  ar: {
    deleted: 'تم الحذف', cleared: 'تم المسح', unchecked: 'تم إلغاء التحديد',
    saved: 'تم الحفظ', added: 'تمت الإضافة', uploaded: 'تم الرفع', checked: 'تم التحديد', completed: 'اكتمل',
    sent: 'تم الإرسال', replied: 'تم الرد', forwarded: 'تمت إعادة التوجيه', mailed: 'تم الإرسال',
    rewarded: 'تمت المكافأة', captured: 'تم الالتقاط', recorded: 'تم التسجيل', copied: 'تم النسخ!'
  }
};

const dir = path.join(process.cwd(), 'packages', 'gds-core', 'src', 'locales');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

for (const [lang, translations] of Object.entries(dicts)) {
  const feedback = feedbackDicts[lang] || {};
  
  const actionKeys = Object.entries(translations).map(([k, v]) => `  'gds.action.${k}': '${v.replace(/'/g, "\\'")}',`);
  const feedbackKeys = Object.entries(feedback).map(([k, v]) => `  'gds.feedback.${k}': '${v.replace(/'/g, "\\'")}',`);
  
  const content = `export const ${lang} = {\n${[...actionKeys, ...feedbackKeys].join('\n')}\n};\n`;
  fs.writeFileSync(path.join(dir, `${lang}.ts`), content);
}
console.log('Dictionaries generated in', dir);
