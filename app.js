// Mumbai Dry Days Calendar Application
class DryDaysCalendar {
  constructor() {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.today = new Date();

    // Dry days data (Mumbai/Maharashtra excise-observed set)
  this.dryDaysData = {
  "2025": {
    "1": [
      { date: 14, name: "Makar Sankranti", description: "Hindu harvest festival; alcohol sales prohibited in Mumbai." },
      { date: 26, name: "Republic Day", description: "National holiday; dry day across India." },
      { date: 30, name: "Shaheed Diwas", description: "Martyrs' Day honoring freedom fighters; dry day in Maharashtra." }
    ],
    "2": [
      { date: 19, name: "Chhatrapati Shivaji Maharaj Jayanti", description: "Birth anniversary of the Maratha king; state observance dry day." },
      { date: 23, name: "Maharishi Dayanand Saraswati Jayanti", description: "Birth anniversary of Arya Samaj founder; dry day in Maharashtra." },
      { date: 26, name: "Maha Shivratri", description: "Major Hindu festival; dry day." }
    ],
    "3": [
      { date: 14, name: "Holi", description: "Festival of colors; dry day." },
      { date: 31, name: "Eid-ul-Fitr", description: "Islamic festival marking end of Ramadan; dry day." }
    ],
    "4": [
      { date: 6, name: "Ram Navami", description: "Hindu festival celebrating Lord Rama's birth; dry day." },
      { date: 10, name: "Mahavir Jayanti", description: "Jain festival; dry day." },
      { date: 14, name: "Ambedkar Jayanti", description: "Birth anniversary of Dr. B.R. Ambedkar; dry day." },
      { date: 18, name: "Good Friday", description: "Christian observance; dry day." }
    ],
    "5": [
      { date: 1, name: "Maharashtra Day", description: "State formation day; dry day in Maharashtra." },
      { date: 12, name: "Buddha Purnima", description: "Buddhist festival; dry day." }
    ],
    "6": [
      { date: 7, name: "Eid-al-Adha", description: "Islamic festival of sacrifice; dry day." }
    ],
    "7": [
      { date: 6, name: "Muharram & Ashadhi Ekadashi", description: "Islamic New Year and Hindu observance; dry day." },
      { date: 10, name: "Guru Purnima", description: "Festival honoring spiritual teachers; dry day." }
    ],
    "8": [
      { date: 15, name: "Independence Day", description: "National holiday; dry day across India." },
      { date: 16, name: "Janmashtami", description: "Hindu festival celebrating Lord Krishna's birth; dry day." },
      { date: 27, name: "Ganesh Chaturthi", description: "Major Maharashtra festival; dry day." }
    ],
    "9": [
      { date: 5, name: "Eid-e-Milad", description: "Islamic festival celebrating Prophet Muhammad's birth; dry day." }
    ],
    "10": [
      { date: 2, name: "Gandhi Jayanti & Dussehra", description: "National holiday and Hindu festival; dry day." },
      { date: 20, name: "Diwali", description: "Festival of lights; dry day." }
    ],
    "11": [
      { date: 5, name: "Guru Nanak Jayanti", description: "Sikh festival; dry day." }
    ],
    "12": [
      { date: 25, name: "Christmas", description: "Christian festival; dry day." }
    ]
  },
  "2026": {
    "1": [
      { date: 14, name: "Makar Sankranti", description: "Hindu harvest festival; dry day." },
      { date: 26, name: "Republic Day", description: "National holiday; dry day." },
      { date: 30, name: "Shaheed Diwas", description: "Martyrs' Day; dry day." }
    ],
    "2": [
      { date: 16, name: "Maha Shivratri", description: "Major Hindu festival; dry day." },
      { date: 19, name: "Shivaji Maharaj Jayanti", description: "State observance; dry day." }
    ],
    "3": [
      { date: 6, name: "Holi", description: "Festival of colors; dry day." },
      { date: 21, name: "Eid-ul-Fitr", description: "Islamic festival; dry day." }
    ],
    "4": [
      { date: 3, name: "Good Friday", description: "Christian observance; dry day." },
      { date: 14, name: "Ambedkar Jayanti", description: "Dr. Ambedkar's birth anniversary; dry day." }
    ],
    "5": [
      { date: 1, name: "Maharashtra Day", description: "State formation day; dry day." },
      { date: 2, name: "Buddha Purnima", description: "Buddhist festival; dry day." }
    ],
    "8": [
      { date: 6, name: "Janmashtami", description: "Hindu festival; dry day." },
      { date: 15, name: "Independence Day", description: "National holiday; dry day." },
      { date: 17, name: "Ganesh Chaturthi", description: "Major Maharashtra festival; dry day." }
    ],
    "10": [
      { date: 2, name: "Gandhi Jayanti", description: "National holiday; dry day." },
      { date: 11, name: "Diwali", description: "Festival of lights; dry day." }
    ],
    "12": [
      { date: 25, name: "Christmas", description: "Christian festival; dry day." }
    ]
  }
};


    this.monthNames = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ];

    this.notificationSettings = this.loadNotificationSettings();
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderCalendar();
    this.updateNotificationUI();
    this.checkUpcomingDryDays();
    setInterval(() => this.checkUpcomingDryDays(), 24*60*60*1000);
  }

  bindEvents() {
    // Navigation
    document.getElementById('prevBtn')?.addEventListener('click', () => this.previousMonth());
    document.getElementById('nextBtn')?.addEventListener('click', () => this.nextMonth());

    // Settings
    document.getElementById('settingsBtn')?.addEventListener('click', () => this.openSettingsModal());
    document.getElementById('settingsModalClose')?.addEventListener('click', () => this.closeSettingsModal());

    // Dry-day modal
    document.getElementById('modalClose')?.addEventListener('click', () => this.closeDryDayModal());

    // Backdrop close
    document.getElementById('modalBackdrop')?.addEventListener('click', (e) => {
      if (e.target === document.getElementById('modalBackdrop')) this.closeAllModals();
    });
    document.getElementById('dryDayModal')?.addEventListener('click', (e) => {
      if (e.target === document.getElementById('dryDayModal')) this.closeDryDayModal();
    });
    document.getElementById('settingsModal')?.addEventListener('click', (e) => {
      if (e.target === document.getElementById('settingsModal')) this.closeSettingsModal();
    });

    // Notifications
    document.getElementById('enableNotifications')?.addEventListener('click', () => this.requestNotificationPermission());
    ['notify1Day','notify2Days','notify3Days'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', (e) => {
          this.updateNotificationSettings(parseInt(e.target.value), e.target.checked);
        });
      }
    });

    // ESC to close
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closeAllModals(); });
  }

  closeAllModals(){ this.closeDryDayModal(); this.closeSettingsModal(); }

  previousMonth(){
    this.currentMonth--;
    if (this.currentMonth < 0){ this.currentMonth = 11; this.currentYear--; }
    this.renderCalendar();
  }
  nextMonth(){
    this.currentMonth++;
    if (this.currentMonth > 11){ this.currentMonth = 0; this.currentYear++; }
    this.renderCalendar();
  }

  renderCalendar(){
    const monthYear = document.getElementById('monthYear');
    if (monthYear) monthYear.textContent = `${this.monthNames[this.currentMonth]} ${this.currentYear}`;

    const grid = document.querySelector('.calendar-grid');
    if (!grid) return;

    // Clear previous days
    grid.querySelectorAll('.calendar-day').forEach(n => n.remove());

    const first = new Date(this.currentYear, this.currentMonth, 1);
    const last  = new Date(this.currentYear, this.currentMonth+1, 0);
    const daysInMonth = last.getDate();
    const startDow = first.getDay();

    const prevMonth = new Date(this.currentYear, this.currentMonth, 0);
    const prevDays = prevMonth.getDate();

    for (let i=startDow-1;i>=0;i--) grid.appendChild(this.createDayElement(prevDays-i,true));

    for (let day=1; day<=daysInMonth; day++) grid.appendChild(this.createDayElement(day,false));

    const totalCells = grid.children.length - 7; // subtract DOW header cells
    const remaining = 42 - totalCells;          // 6 rows * 7 days
    for (let day=1; day<=remaining; day++) grid.appendChild(this.createDayElement(day,true));
  }

  createDayElement(day,isOtherMonth){
    const el = document.createElement('div');
    el.className = 'calendar-day';
    el.textContent = day;
    el.setAttribute('tabindex','0');

    if (isOtherMonth){
      el.classList.add('other-month');
    } else {
      if (this.currentYear===this.today.getFullYear() &&
          this.currentMonth===this.today.getMonth() &&
          day===this.today.getDate()){
        el.classList.add('today');
      }
      const dry = this.getDryDay(this.currentYear, this.currentMonth+1, day);
      if (dry){
        el.classList.add('dry-day');
        el.addEventListener('click', () => this.showDryDayInfo(day, dry));
        el.addEventListener('keydown', (e) => {
          if (e.key==='Enter' || e.key===' '){ e.preventDefault(); this.showDryDayInfo(day,dry); }
        });
      }
    }
    return el;
  }

  getDryDay(year,month,day){
    const y = this.dryDaysData[year.toString()];
    if (!y) return null;
    const m = y[month.toString()];
    if (!m) return null;
    return m.find(d=>d.date===day) || null;
  }

  showDryDayInfo(day,dry){
    const modal = document.getElementById('dryDayModal');
    const backdrop = document.getElementById('modalBackdrop');
    const modalDate = document.getElementById('modalDate');
    const modalName = document.getElementById('modalName');
    const modalDescription = document.getElementById('modalDescription');

    const date = new Date(this.currentYear, this.currentMonth, day);
    const formatted = date.toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});

    if (modalDate) modalDate.textContent = formatted;
    if (modalName) modalName.textContent = dry.name;
    if (modalDescription) modalDescription.textContent = dry.description || "Alcohol sales restricted by State Excise on this date.";

    if (backdrop) backdrop.classList.remove('hidden');
    if (modal) modal.classList.remove('hidden');
    document.getElementById('modalClose')?.focus();
  }

  closeDryDayModal(){
    document.getElementById('dryDayModal')?.classList.add('hidden');
    document.getElementById('modalBackdrop')?.classList.add('hidden');
  }

  openSettingsModal(){
    this.updateNotificationUI();
    document.getElementById('modalBackdrop')?.classList.remove('hidden');
    document.getElementById('settingsModal')?.classList.remove('hidden');
    document.getElementById('settingsModalClose')?.focus();
  }

  closeSettingsModal(){
    document.getElementById('settingsModal')?.classList.add('hidden');
    document.getElementById('modalBackdrop')?.classList.add('hidden');
  }

  updateNotificationUI(){
    const status = document.getElementById('permissionStatus');
    const enable = document.getElementById('enableNotifications');

    if (!status || !enable) return;

    if ('Notification' in window){
      if (Notification.permission==='granted'){
        status.textContent = 'Notifications are enabled';
        status.className = 'permission-status granted';
        enable.style.display='none';
      } else if (Notification.permission==='denied'){
        status.textContent = 'Notifications are blocked. Please enable them in your browser settings.';
        status.className = 'permission-status denied';
        enable.style.display='none';
      } else {
        status.style.display='none';
        enable.style.display='inline-block';
      }
    } else {
      status.textContent = 'Notifications are not supported in this browser.';
      status.className = 'permission-status denied';
      enable.style.display='none';
    }

    ['notify1Day','notify2Days','notify3Days'].forEach(id=>{
      const cb = document.getElementById(id);
      if (cb){
        const d = parseInt(cb.value);
        cb.checked = this.notificationSettings.includes(d);
      }
    });
  }

  async requestNotificationPermission(){
    if ('Notification' in window){
      const perm = await Notification.requestPermission();
      this.updateNotificationUI();
      if (perm==='granted') this.checkUpcomingDryDays();
    }
  }

  updateNotificationSettings(days,enabled){
    if (enabled){
      if (!this.notificationSettings.includes(days)) this.notificationSettings.push(days);
    } else {
      this.notificationSettings = this.notificationSettings.filter(d=>d!==days);
    }
    this.saveNotificationSettings();
  }

  loadNotificationSettings(){
    try{
      const s = JSON.parse(localStorage.getItem('dryDaysNotifications') || '[]');
      return Array.isArray(s) ? s : [];
    }catch{return []}
  }
  saveNotificationSettings(){
    try{ localStorage.setItem('dryDaysNotifications', JSON.stringify(this.notificationSettings)); }catch(e){}
  }

  checkUpcomingDryDays(){
    if (!('Notification' in window) || Notification.permission!=='granted' || this.notificationSettings.length===0) return;

    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7*24*60*60*1000);

    [now.getFullYear(), now.getFullYear()+1].forEach(year=>{
      const y = this.dryDaysData[year.toString()];
      if (!y) return;
      Object.keys(y).forEach(mKey=>{
        const month = parseInt(mKey)-1;
        y[mKey].forEach(d=>{
          const date = new Date(year, month, d.date);
          if (date >= now && date <= nextWeek){
            const diffDays = Math.ceil((date - now)/ (24*60*60*1000));
            if (this.notificationSettings.includes(diffDays)){
              this.sendNotification(diffDays, d.name);
            }
          }
        });
      });
    });
  }

  sendNotification(days,eventName){
    const dayText = days===1 ? 'day' : 'days';
    const message = `Dry Day in ${days} ${dayText}`;
    new Notification(message, {
      body: `${eventName} - Remember to stock up!`,
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMiIgZmlsbD0iIzRBOTBFMiIvPjwvc3ZnPg==',
      tag: `dry-day-${days}`,
      requireInteraction:false
    });
  }
}

document.addEventListener('DOMContentLoaded', ()=> new DryDaysCalendar());
