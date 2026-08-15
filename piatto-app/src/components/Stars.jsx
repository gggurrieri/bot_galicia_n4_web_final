import starFull from '../assets/icons/star-full.svg'
import starHalf from '../assets/icons/star-half.svg'
import './Stars.css'

function Stars({ rating }) {
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5
  const empty = 5 - full - (hasHalf ? 1 : 0)

  return (
    <div className="stars">
      {Array.from({ length: full }).map((_, i) => (
        <img key={`f${i}`} src={starFull} alt="" className="star" />
      ))}
      {hasHalf && <img src={starHalf} alt="" className="star" />}
      {Array.from({ length: empty }).map((_, i) => (
        <img key={`e${i}`} src={starFull} alt="" className="star star-empty" />
      ))}
    </div>
  )
}

export default Stars
