import { useState } from 'react'
import {
  ArrowUpRight,
  Award,
  Bell,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MapPin,
  Search,
  Settings,
  UserRound,
} from 'lucide-react'
import './App.css'

const courses = [
  { code: 'CS301', name: 'Machine Learning', instructor: 'Dr. Priya Sharma', progress: 78, color: 'blue' },
  { code: 'CS305', name: 'Data Structures & Algorithms', instructor: 'Prof. Arjun Kumar', progress: 64, color: 'purple' },
  { code: 'CS312', name: 'Database Management', instructor: 'Dr. Meera Nair', progress: 86, color: 'green' },
]

const results = [
  { course: 'Machine Learning', code: 'CS301', score: '92 / 100', grade: 'A', tone: 'green' },
  { course: 'Data Structures & Algorithms', code: 'CS305', score: '86 / 100', grade: 'A-', tone: 'blue' },
  { course: 'Database Management', code: 'CS312', score: '78 / 100', grade: 'B+', tone: 'purple' },
]

const announcements = [
  { tag: 'ACADEMIC', title: 'Mid-semester exam schedule is out', date: 'Today · 9:30 AM', icon: CalendarDays, tone: 'blue' },
  { tag: 'CAMPUS', title: 'Tech Fest registrations are now open', date: 'Yesterday · 2:15 PM', icon: Bell, tone: 'purple' },
  { tag: 'COURSE', title: 'Machine Learning: new study materials', date: 'Nov 18, 2026 · 11:00 AM', icon: BookOpen, tone: 'green' },
]

const menu = [
  { name: 'Dashboard', id: 'overview', icon: LayoutDashboard },
  { name: 'My Profile', id: 'profile', icon: UserRound },
  { name: 'My Courses', id: 'courses', icon: BookOpen },
  { name: 'Attendance', id: 'attendance', icon: CalendarCheck },
  { name: 'Results', id: 'results', icon: GraduationCap },
  { name: 'Assignments', id: 'assignments', icon: FileText },
  { name: 'Announcements', id: 'announcements', icon: Bell },
]

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  )
}

function App() {
  const [active, setActive] = useState('Dashboard')
  const [search, setSearch] = useState('')

  const filteredCourses = courses.filter((course) =>
    `${course.name} ${course.code} ${course.instructor}`.toLowerCase().includes(search.toLowerCase()),
  )

  const navigateTo = (item) => {
    setActive(item.name)
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <a className="brand" href="#overview" onClick={() => setActive('Dashboard')} aria-label="StudentHub home">
          <span className="brand-mark"><GraduationCap size={20} /></span>
          <span>student<span className="brand-accent">hub</span><span className="brand-dot">.</span></span>
        </a>

        <p className="menu-title">MENU</p>
        <nav className="menu" aria-label="Main navigation">
          {menu.map(({ name, id, icon: Icon }) => (
            <button
              key={name}
              className={`menu-item ${active === name ? 'active' : ''}`}
              onClick={() => navigateTo({ name, id })}
              aria-label={name}
              aria-current={active === name ? 'page' : undefined}
            >
              <Icon size={18} strokeWidth={1.9} />
              <span>{name}</span>
              {active === name && <span className="active-indicator" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="menu-item" onClick={() => navigateTo({ name: 'My Profile', id: 'profile' })}>
            <Settings size={18} strokeWidth={1.9} />
            <span>Settings</span>
          </button>
          <div className="sidebar-student">
            <div className="avatar avatar-small">DM</div>
            <div className="sidebar-student-copy">
              <strong>Dhanish M</strong>
              <span>Student account</span>
            </div>
            <LogOut size={16} className="logout-icon" aria-hidden="true" />
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Pages</span><ChevronRight size={14} /><strong>{active}</strong>
          </div>
          <div className="top-actions">
            <label className="search-box">
              <Search size={17} aria-hidden="true" />
              <input
                type="search"
                placeholder="Search courses..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search courses"
              />
              <kbd>/</kbd>
            </label>
            <button
              className="icon-button notification-button"
              aria-label="Go to announcements"
              onClick={() => navigateTo({ name: 'Announcements', id: 'announcements' })}
            >
              <Bell size={19} />
              <span className="notification-dot" />
            </button>
            <button
              className="top-profile"
              aria-label="Go to student profile"
              onClick={() => navigateTo({ name: 'My Profile', id: 'profile' })}
            >
              <span className="avatar">DM</span>
              <span className="top-profile-name">Dhanish M</span>
            </button>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome" id="overview">
            <div className="welcome-copy">
              <span className="welcome-label"><span className="live-dot" /> STUDENT PORTAL · 2026–27</span>
              <h1>Good morning, Dhanish <span aria-hidden="true">✦</span></h1>
              <p>Here’s what’s happening with your academics today.</p>
              <button className="welcome-link" onClick={() => navigateTo({ name: 'My Courses', id: 'courses' })}>
                Explore your courses <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="welcome-art" aria-hidden="true">
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-icon"><GraduationCap size={64} strokeWidth={1.35} /></div>
              <span className="art-sparkle sparkle-one">✦</span>
              <span className="art-sparkle sparkle-two">✧</span>
            </div>
          </section>

          <section className="stats" aria-label="Academic overview">
            <article className="stat-card">
              <span className="stat-icon stat-blue"><BookOpen size={19} /></span>
              <div className="stat-copy"><p>Enrolled courses</p><strong>06</strong><span>In this semester</span></div>
              <span className="stat-trend"><ArrowUpRight size={14} /> 2 new</span>
            </article>
            <article className="stat-card">
              <span className="stat-icon stat-purple"><CalendarCheck size={19} /></span>
              <div className="stat-copy"><p>Attendance</p><strong>92<span>%</span></strong><span>Above 75% requirement</span></div>
              <span className="stat-trend"><CheckCircle2 size={14} /> On track</span>
            </article>
            <article className="stat-card">
              <span className="stat-icon stat-green"><Award size={19} /></span>
              <div className="stat-copy"><p>Average grade</p><strong>A<span>-</span></strong><span>Top 12% of your class</span></div>
              <span className="stat-trend"><ArrowUpRight size={14} /> 4.8%</span>
            </article>
            <article className="stat-card">
              <span className="stat-icon stat-orange"><FileText size={19} /></span>
              <div className="stat-copy"><p>Due this week</p><strong>04</strong><span>Assignments to submit</span></div>
              <span className="stat-trend trend-warm"><Clock3 size={14} /> Upcoming</span>
            </article>
          </section>

          <section className="profile-section" id="profile">
            <SectionHeading eyebrow="YOUR ACCOUNT" title="Student profile" />
            <div className="profile-grid">
              <article className="panel profile-panel">
                <div className="profile-main">
                  <div className="profile-avatar">DM</div>
                  <div className="profile-intro">
                    <span className="online-status"><span /> Active student</span>
                    <h3>Dhanish M</h3>
                    <p>Artificial Intelligence &amp; Data Science</p>
                  </div>
                  <button className="subtle-button" aria-label="Edit profile"><Settings size={16} /></button>
                </div>
                <div className="profile-details">
                  <div><span>Student ID</span><strong>STU-2024-0418</strong></div>
                  <div><span>Department</span><strong>AI &amp; Data Science</strong></div>
                  <div><span>Academic year</span><strong>3rd Year · Semester 5</strong></div>
                  <div><span>Advisor</span><strong>Dr. Priya Sharma</strong></div>
                </div>
              </article>

              <article className="student-id-card" aria-label="Student identification card">
                <div className="id-card-top">
                  <div className="id-school-mark"><GraduationCap size={18} /></div>
                  <div><strong>STUDENT IDENTITY</strong><span>Riverside Institute of Technology</span></div>
                  <span className="id-chip">2026–27</span>
                </div>
                <div className="id-card-student">
                  <div className="id-avatar">DM</div>
                  <div><h3>Dhanish M</h3><span>Artificial Intelligence &amp; Data Science</span></div>
                </div>
                <div className="id-card-bottom">
                  <div><span>ID NUMBER</span><strong>STU-2024-0418</strong></div>
                  <div><span>VALID THROUGH</span><strong>JUNE 2027</strong></div>
                  <span className="id-card-watermark"><GraduationCap size={84} /></span>
                </div>
              </article>
            </div>
          </section>

          <section className="attendance-section" id="attendance">
            <SectionHeading
              eyebrow="YOUR PROGRESS"
              title="Attendance"
              action={<span className="term-badge"><CalendarDays size={14} /> Semester 5</span>}
            />
            <div className="attendance-grid">
              <article className="panel attendance-panel">
                <div className="attendance-summary">
                  <div className="attendance-ring"><div><strong>92<span>%</span></strong><small>Present</small></div></div>
                  <div className="attendance-copy">
                    <h3>Great attendance!</h3>
                    <p>You’re comfortably above the required attendance threshold.</p>
                    <div className="attendance-legend">
                      <span><i className="legend-present" /> 46 classes attended</span>
                      <span><i className="legend-absent" /> 4 classes missed</span>
                    </div>
                  </div>
                </div>
                <div className="attendance-meter">
                  <div className="meter-label"><span>Attendance requirement</span><strong>92% <small>/ 75% required</small></strong></div>
                  <div className="meter-track"><span /></div>
                </div>
              </article>
              <article className="panel attendance-week">
                <div className="panel-heading-inline"><div><h3>Weekly attendance</h3><p>Classes attended this week</p></div><span className="week-range">This week</span></div>
                <div className="week-chart" aria-label="Weekly attendance: Monday 4 of 4, Tuesday 3 of 4, Wednesday 4 of 4, Thursday 2 of 3, Friday 3 of 3">
                  {[['Mon', 82], ['Tue', 62], ['Wed', 91], ['Thu', 48], ['Fri', 72]].map(([day, height]) => (
                    <div className="chart-day" key={day}>
                      <div className="chart-track"><span style={{ height: `${height}%` }} /></div>
                      <span>{day}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section className="courses-section" id="courses">
            <SectionHeading
              eyebrow="KEEP LEARNING"
              title="My courses"
              action={<button className="text-button" onClick={() => setSearch('')}>View all courses <ChevronRight size={15} /></button>}
            />
            {filteredCourses.length ? (
              <div className="course-grid">
                {filteredCourses.map((course) => (
                  <article className="panel course-card" key={course.code}>
                    <div className={`course-icon course-${course.color}`}><BookOpen size={19} /></div>
                    <span className="course-code">{course.code} <span>·</span> SEMESTER 5</span>
                    <h3>{course.name}</h3>
                    <p className="course-instructor">Instructor: {course.instructor}</p>
                    <div className="course-progress-label"><span>Course progress</span><strong>{course.progress}%</strong></div>
                    <div className={`course-progress progress-${course.color}`}><span style={{ width: `${course.progress}%` }} /></div>
                    <button className="course-link" onClick={() => navigateTo({ name: 'Results', id: 'results' })}>View course <ArrowUpRight size={15} /></button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="panel empty-state"><Search size={20} /><p>No courses match “{search}”. Try another search.</p></div>
            )}
          </section>

          <section className="results-announcements-grid">
            <div className="results-section" id="results">
              <SectionHeading
                eyebrow="ACADEMIC PERFORMANCE"
                title="Recent results"
                action={<span className="gpa-badge"><Award size={14} /> GPA 3.82</span>}
              />
              <article className="panel results-panel">
                <div className="results-table-head"><span>COURSE</span><span>SCORE</span><span>GRADE</span></div>
                {results.map((result) => (
                  <div className="result-row" key={result.code}>
                    <div className="result-course"><strong>{result.course}</strong><span>{result.code} · Mid-term</span></div>
                    <strong className="result-score">{result.score}</strong>
                    <span className={`grade grade-${result.tone}`}>{result.grade}</span>
                  </div>
                ))}
                <button className="all-results-button" onClick={() => setActive('Results')}>View all results <ArrowUpRight size={15} /></button>
              </article>
            </div>

            <div className="announcements-section" id="announcements">
              <SectionHeading
                eyebrow="CAMPUS UPDATES"
                title="Announcements"
                action={<button className="text-button" onClick={() => setActive('Announcements')}>See all <ChevronRight size={15} /></button>}
              />
              <article className="panel announcements-panel">
                {announcements.map(({ tag, title, date, icon: Icon, tone }) => (
                  <div className="announcement" key={title}>
                    <span className={`announcement-icon announcement-${tone}`}><Icon size={17} /></span>
                    <div className="announcement-copy">
                      <span className="announcement-tag">{tag}</span>
                      <strong>{title}</strong>
                      <span className="announcement-date">{date}</span>
                    </div>
                    <ChevronRight size={16} className="announcement-arrow" />
                  </div>
                ))}
                <div className="assignment-reminder" id="assignments">
                  <span className="reminder-icon"><Clock3 size={16} /></span>
                  <div><strong>Assignment due soon</strong><p>Submit your ML project by Nov 25, 2026</p></div>
                  <MapPin size={15} className="reminder-arrow" />
                </div>
              </article>
            </div>
          </section>

          <footer className="footer">
            <span>© 2026 StudentHub · Riverside Institute of Technology</span>
            <span>Made for your success <span aria-hidden="true">✦</span></span>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
