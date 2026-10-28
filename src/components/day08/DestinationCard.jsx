function DestinationCard({ destination, saved, onToggleSave, onExplore }) {
  const { name, country, category, price, days, rating, image, tag, description } = destination;

  return (
    <article className="destination-card">
      <div className="destination-image-wrap">
        <img
          className="destination-image"
          src={image}
          alt={`${name}, ${country}`}
          loading="lazy"
        />
        <span className="destination-tag">{tag}</span>

        <button
          className={`save-button ${saved ? "is-saved" : ""}`}
          onClick={() => onToggleSave(destination.id)}
          aria-label={saved ? `Remove ${name} from saved places` : `Save ${name}`}
          aria-pressed={saved}
        >
          {saved ? "♥" : "♡"}
        </button>

        <span className="image-category">{category}</span>
      </div>

      <div className="destination-card-content">
        <div className="destination-location">
          <span>↗ {country}</span>
          <span className="destination-rating">★ {rating}</span>
        </div>

        <h3>{name}</h3>
        <p className="destination-description">{description}</p>

        <div className="destination-card-footer">
          <div>
            <strong>${price}</strong>
            <span className="price-note"> / day est.</span>
            <div className="trip-duration">{days} days suggested</div>
          </div>

          <button className="explore-button" onClick={() => onExplore(destination)}>
            Explore ↗
          </button>
        </div>
      </div>
    </article>
  );
}

export default DestinationCard;
