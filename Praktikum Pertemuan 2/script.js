// ===== BASE CLASS: DataManager (ES6 Class) =====
class DataManager {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.data = this.loadFromStorage();
    }

    // Load data from localStorage
    loadFromStorage() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    // Save data to localStorage
    saveToStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    // Add new item
    add(item) {
        this.data.push({ ...item, id: Date.now() });
        this.saveToStorage();
    }

    // Update existing item
    update(id, updatedItem) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...updatedItem };
            this.saveToStorage();
        }
    }

    // Delete item
    delete(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.saveToStorage();
    }

    // Get all data
    getAll() {
        return [...this.data]; // Spread operator
    }

    // Get item by ID
    getById(id) {
        return this.data.find(item => item.id === id);
    }
}

// ===== SCHEDULE MANAGER CLASS =====
class ScheduleManager extends DataManager {
    constructor() {
        super('schedules');
        this.editingId = null;
    }

    // Arrow function for opening modal
    openModal = (id = null) => {
        this.editingId = id;
        const modal = document.getElementById('scheduleModal');
        const title = document.getElementById('scheduleModalTitle');

        if (id) {
            // Edit mode
            const schedule = this.getById(id);
            if (schedule) {
                title.textContent = 'Edit Jadwal Kuliah';
                document.getElementById('scheduleCourse').value = schedule.course;
                document.getElementById('scheduleDay').value = schedule.day;
                document.getElementById('scheduleStartTime').value = schedule.startTime;
                document.getElementById('scheduleEndTime').value = schedule.endTime;
                document.getElementById('scheduleRoom').value = schedule.room;
            }
        } else {
            // Add mode
            title.textContent = 'Tambah Jadwal Kuliah';
            this.clearForm();
        }

        modal.classList.remove('hidden');
    }

    // Arrow function for closing modal
    closeModal = () => {
        document.getElementById('scheduleModal').classList.add('hidden');
        this.clearForm();
        this.editingId = null;
    }

    // Clear form inputs
    clearForm() {
        document.getElementById('scheduleCourse').value = '';
        document.getElementById('scheduleDay').value = '';
        document.getElementById('scheduleStartTime').value = '';
        document.getElementById('scheduleEndTime').value = '';
        document.getElementById('scheduleRoom').value = '';
    }

    // Save schedule (Arrow function)
    saveSchedule = () => {
        const course = document.getElementById('scheduleCourse').value.trim();
        const day = document.getElementById('scheduleDay').value;
        const startTime = document.getElementById('scheduleStartTime').value;
        const endTime = document.getElementById('scheduleEndTime').value;
        const room = document.getElementById('scheduleRoom').value.trim();

        // Validation
        if (!course || !day || !startTime || !endTime || !room) {
            alert('Semua field harus diisi!');
            return;
        }

        const scheduleData = { course, day, startTime, endTime, room };

        if (this.editingId) {
            this.update(this.editingId, scheduleData);
        } else {
            this.add(scheduleData);
        }

        this.closeModal();
        this.render();
    }

    // Delete schedule with confirmation
    deleteSchedule = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
            this.delete(id);
            this.render();
        }
    }

    // Render schedule list using template literals
    render() {
        const container = document.getElementById('scheduleList');
        const schedules = this.getAll();

        if (schedules.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📅</div>
                    <p class="empty-state-text">Belum ada jadwal kuliah. Tambahkan jadwal pertama Anda!</p>
                </div>
            `;
            return;
        }

        // Template literals with map and arrow function
        container.innerHTML = schedules.map(schedule => `
            <div class="schedule-item">
                <div class="schedule-header">
                    <h3 class="schedule-course">${schedule.course}</h3>
                    <div class="schedule-actions">
                        <button class="btn btn-info btn-sm" onclick="dashboard.scheduleManager.openModal(${schedule.id})">
                            ✏️
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="dashboard.scheduleManager.deleteSchedule(${schedule.id})">
                            🗑️
                        </button>
                    </div>
                </div>
                <div class="schedule-info">
                    <div class="schedule-day">📌 ${schedule.day}</div>
                    <div>🕐 ${schedule.startTime} - ${schedule.endTime}</div>
                    <div>🏫 Ruangan ${schedule.room}</div>
                </div>
            </div>
        `).join('');
    }
}

// ===== TASK MANAGER CLASS =====
class TaskManager extends DataManager {
    constructor() {
        super('tasks');
        this.editingId = null;
    }

    openModal = (id = null) => {
        this.editingId = id;
        const modal = document.getElementById('taskModal');
        const title = document.getElementById('taskModalTitle');

        if (id) {
            const task = this.getById(id);
            if (task) {
                title.textContent = 'Edit Tugas';
                document.getElementById('taskName').value = task.name;
                document.getElementById('taskCourse').value = task.course;
                document.getElementById('taskDeadline').value = task.deadline;
                document.getElementById('taskPriority').value = task.priority;
            }
        } else {
            title.textContent = 'Tambah Tugas';
            this.clearForm();
        }

        modal.classList.remove('hidden');
    }

    closeModal = () => {
        document.getElementById('taskModal').classList.add('hidden');
        this.clearForm();
        this.editingId = null;
    }

    clearForm() {
        document.getElementById('taskName').value = '';
        document.getElementById('taskCourse').value = '';
        document.getElementById('taskDeadline').value = '';
        document.getElementById('taskPriority').value = 'medium';
    }

    saveTask = () => {
        const name = document.getElementById('taskName').value.trim();
        const course = document.getElementById('taskCourse').value.trim();
        const deadline = document.getElementById('taskDeadline').value;
        const priority = document.getElementById('taskPriority').value;

        if (!name || !course || !deadline) {
            alert('Semua field harus diisi!');
            return;
        }

        const taskData = { 
            name, 
            course, 
            deadline, 
            priority, 
            completed: false 
        };

        if (this.editingId) {
            this.update(this.editingId, taskData);
        } else {
            this.add(taskData);
        }

        this.closeModal();
        this.render();
    }

    toggleComplete = (id) => {
        const task = this.getById(id);
        if (task) {
            this.update(id, { completed: !task.completed });
            this.render();
        }
    }

    deleteTask = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
            this.delete(id);
            this.render();
        }
    }

    // Format deadline using arrow function
    formatDeadline = (deadline) => {
        const date = new Date(deadline);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    render() {
        const container = document.getElementById('taskList');
        const tasks = this.getAll();

        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">✅</div>
                    <p class="empty-state-text">Belum ada tugas. Tambahkan tugas pertama Anda!</p>
                </div>
            `;
            return;
        }

        // Destructuring and template literals
        container.innerHTML = tasks.map(({ id, name, course, deadline, priority, completed }) => `
            <div class="task-item priority-${priority} ${completed ? 'completed' : ''}">
                <div class="task-header">
                    <h3 class="task-name ${completed ? 'completed' : ''}">${name}</h3>
                    <div class="task-actions">
                        <button class="btn btn-sm ${completed ? 'btn-warning' : 'btn-success'}" 
                                onclick="dashboard.taskManager.toggleComplete(${id})"
                                title="${completed ? 'Tandai belum selesai' : 'Tandai selesai'}">
                            ${completed ? '↩️' : '✓'}
                        </button>
                        <button class="btn btn-info btn-sm" onclick="dashboard.taskManager.openModal(${id})">
                            ✏️
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="dashboard.taskManager.deleteTask(${id})">
                            🗑️
                        </button>
                    </div>
                </div>
                <div class="task-info">
                    <div class="task-course">📚 ${course}</div>
                    <div class="task-deadline">⏰ ${this.formatDeadline(deadline)}</div>
                    <span class="priority-badge priority-${priority}">
                        ${priority === 'high' ? '🔥 Prioritas Tinggi' : 
                          priority === 'medium' ? '⚡ Prioritas Sedang' : 
                          '💡 Prioritas Rendah'}
                    </span>
                </div>
            </div>
        `).join('');
    }
}

// ===== NOTE MANAGER CLASS =====
class NoteManager extends DataManager {
    constructor() {
        super('notes');
        this.editingId = null;
    }

    openModal = (id = null) => {
        this.editingId = id;
        const modal = document.getElementById('noteModal');
        const title = document.getElementById('noteModalTitle');

        if (id) {
            const note = this.getById(id);
            if (note) {
                title.textContent = 'Edit Catatan';
                document.getElementById('noteTitle').value = note.title;
                document.getElementById('noteContent').value = note.content;
            }
        } else {
            title.textContent = 'Tambah Catatan';
            this.clearForm();
        }

        modal.classList.remove('hidden');
    }

    closeModal = () => {
        document.getElementById('noteModal').classList.add('hidden');
        this.clearForm();
        this.editingId = null;
    }

    clearForm() {
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteContent').value = '';
    }

    saveNote = () => {
        const title = document.getElementById('noteTitle').value.trim();
        const content = document.getElementById('noteContent').value.trim();

        if (!title || !content) {
            alert('Judul dan isi catatan harus diisi!');
            return;
        }

        const noteData = { 
            title, 
            content, 
            createdAt: new Date().toISOString() 
        };

        if (this.editingId) {
            this.update(this.editingId, noteData);
        } else {
            this.add(noteData);
        }

        this.closeModal();
        this.render();
    }

    deleteNote = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
            this.delete(id);
            this.render();
        }
    }

    // Format date using arrow function
    formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    render() {
        const container = document.getElementById('noteList');
        const notes = this.getAll();

        if (notes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <p class="empty-state-text">Belum ada catatan. Buat catatan pertama Anda!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = notes.map(note => `
            <div class="note-item">
                <div class="note-header">
                    <h3 class="note-title">${note.title}</h3>
                    <div class="note-actions">
                        <button class="btn btn-info btn-sm" onclick="dashboard.noteManager.openModal(${note.id})">
                            ✏️
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="dashboard.noteManager.deleteNote(${note.id})">
                            🗑️
                        </button>
                    </div>
                </div>
                <p class="note-content">${note.content}</p>
                <p class="note-date">📅 ${this.formatDate(note.createdAt)}</p>
            </div>
        `).join('');
    }
}

// ===== Async/Await) =====
class async_await {
}

// ===== CLOCK & WEATHER MANAGER =====
class ClockManager {
    constructor() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    // Arrow function for updating clock
    updateClock = () => {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };

        const dateTimeString = now.toLocaleDateString('id-ID', options);
        document.getElementById('currentDateTime').textContent = dateTimeString;
    }
}

// Simple weather (static data - could be replaced with API)
class WeatherManager {
    constructor() {
        this.displayWeather();
    }

    // Arrow function
    displayWeather = () => {
        const weatherInfo = document.getElementById('weatherInfo');
        // Simulated weather data
        const weather = {
            temp: '28°C',
            condition: '☀️ Cerah'
        };

        weatherInfo.innerHTML = `${weather.condition} • ${weather.temp}`;
    }
}

// ===== MAIN DASHBOARD CLASS =====
class Dashboard {
    constructor() {
        this.scheduleManager = new ScheduleManager();
        this.taskManager = new TaskManager();
        this.noteManager = new NoteManager();
        this.async_await = new async_await();
        this.clockManager = new ClockManager();
        this.weatherManager = new WeatherManager();
        
        this.init();
    }

    // Initialize dashboard with async
    async init() {
        // Render all sections
        this.scheduleManager.render();
        this.taskManager.render();
        this.noteManager.render();
        
        // Load quote asynchronously
        await this.async_await.init();
        
        console.log('✅ Dashboard initialized with ES6+ features!');
    }
}

// ===== INITIALIZE APPLICATION =====
// Using const for immutable reference
const dashboard = new Dashboard();

// Export for use in HTML onclick handlers
window.dashboard = dashboard;