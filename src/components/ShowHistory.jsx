import { Link } from "react-router-dom"

export function ShowHistory({buttonText, to}) {
    return <div>
      <Link to={to}>
        {buttonText}
      </Link>
    </div>
}
  