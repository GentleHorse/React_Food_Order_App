export default function Meal({ img, title, price, description }) {
  return (
    <div className="meal-item">
      <article>
        <img src={img}/>
        <h3>{title}</h3>
        <div className="meal-item-price">€{price}</div>
        <div className="meal-item-description">{description}</div>
        <div className="meal-item-actions">
          <button>Add to Cart</button>
        </div>
      </article>
    </div>
  );
}
