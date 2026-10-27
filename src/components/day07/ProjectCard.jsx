function ProjectCard({ project, isSaved, onToggleSave, view }) {
  return (
    <article className={`project-card ${project.color} ${view === "list" ? "list-card" : ""}`}>
      <div className="project-art">
        <span className="art-index">{project.number} / 06</span>
        <span className="art-shape" aria-hidden="true">
          {project.number}
        </span>
        <button
          className={`save-button ${isSaved ? "is-saved" : ""}`}
          onClick={() => onToggleSave(project.id)}
          aria-label={isSaved ? `Remove ${project.title} from saved projects` : `Save ${project.title}`}
          title={isSaved ? "Remove saved project" : "Save project"}
        >
          {isSaved ? "★" : "☆"}
        </button>
        <span className="art-label">{project.type}</span>
      </div>

      <div className="project-info">
        <div className="project-heading">
          <div>
            <p className="eyebrow">{project.category} / {project.year}</p>
            <h3>{project.title}</h3>
          </div>
          <span className="project-arrow" aria-hidden="true">↗</span>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span className="project-tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
