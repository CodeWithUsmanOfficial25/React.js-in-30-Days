import { useMemo, useState } from "react";
import ProjectCard from "../components/day07/ProjectCard";
import { categories, projects } from "../data/day07Data";
import "./Day07.css";

function Day07() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Projects");
  const [view, setView] = useState("grid");
  const [saved, setSaved] = useState([]);
  const [savedOnly, setSavedOnly] = useState(false);

  const visibleProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch = [
        project.title,
        project.category,
        project.description,
        ...project.tags
      ].join(" ").toLowerCase().includes(query);

      const matchesCategory =
        category === "All Projects" || project.category === category;

      const matchesSaved = !savedOnly || saved.includes(project.id);

      return matchesSearch && matchesCategory && matchesSaved;
    });
  }, [search, category, saved, savedOnly]);

  function toggleSaved(id) {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((projectId) => projectId !== id)
        : [...current, id]
    );
  }

  function resetFilters() {
    setSearch("");
    setCategory("All Projects");
    setSavedOnly(false);
  }

  return (
    <main className="pf-page">
      <nav className="pf-nav">
        <a className="pf-logo" href="#top" aria-label="PixelForge home">
          PF<span>®</span>
        </a>
        <span className="nav-caption">INDEPENDENT CREATIVE ARCHIVE</span>
        <a className="nav-contact" href="mailto:hello@example.com">
          LET'S TALK <span>↗</span>
        </a>
      </nav>

      <header className="pf-hero" id="top">
        <div className="hero-topline">
          <span>SELECTED WORK / 2025—26</span>
          <span className="live-note"><i /> AVAILABLE FOR PROJECTS</span>
        </div>

        <h1>
          Ideas into
          <span className="hero-second-line"> <em>impact.</em><span className="hero-star">✳</span></span>
        </h1>

        <div className="hero-bottom">
          <p>
            A curated collection of visual experiments, digital products,
            and identities made to stand out.
          </p>
          <a href="#work" className="hero-link">EXPLORE THE WORK <span>↓</span></a>
        </div>
        <div className="hero-stamp" aria-hidden="true">MAKE<br />IT<br />MATTER.</div>
      </header>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COLLECTION / 001</p>
            <h2>Selected work<span className="heading-dot">.</span></h2>
          </div>
          <span className="count-label">{String(visibleProjects.length).padStart(2, "0")} PROJECTS FOUND</span>
        </div>

        <div className="filter-panel">
          <div className="category-list" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-button ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="toolbar">
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Find a project..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search projects"
              />
            </label>

            <button
              className={`saved-filter ${savedOnly ? "active" : ""}`}
              onClick={() => setSavedOnly((current) => !current)}
              aria-pressed={savedOnly}
            >
              ★ SAVED ({saved.length})
            </button>

            <div className="view-switch" aria-label="Choose layout">
              <button
                className={view === "grid" ? "active" : ""}
                onClick={() => setView("grid")}
                aria-label="Grid view"
                aria-pressed={view === "grid"}
              >▦</button>
              <button
                className={view === "list" ? "active" : ""}
                onClick={() => setView("list")}
                aria-label="List view"
                aria-pressed={view === "list"}
              >☰</button>
            </div>
          </div>
        </div>

        <div className="results-line">
          <span>SHOWING {String(visibleProjects.length).padStart(2, "0")} OF {String(projects.length).padStart(2, "0")}</span>
          <button onClick={resetFilters}>RESET FILTERS ↺</button>
        </div>

        {visibleProjects.length > 0 ? (
          <div className={`project-grid ${view === "list" ? "list-view" : ""}`}>
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSaved={saved.includes(project.id)}
                onToggleSave={toggleSaved}
                view={view}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>✳</span>
            <h3>Nothing in this frame.</h3>
            <p>Try another search or category to discover more work.</p>
            <button onClick={resetFilters}>CLEAR ALL FILTERS ↗</button>
          </div>
        )}
      </section>

      <footer className="pf-footer">
        <div>
          <span className="footer-mark">PF®</span>
          <p>GOOD IDEAS DESERVE<br />GOOD EXECUTION.</p>
        </div>
        <span className="footer-credit">PIXELFORGE CREATIVE ARCHIVE · 2026</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}

export default Day07;
