import { Link } from "react-router-dom"

const Proudct = () => {
  return (
    <div>
      <div className="flex justify-center gap-10 py-4">
        <Link to="/product/mens" className="text-xl font-semibold">Mens</Link>
        <Link to="/product/womens" className="text-xl font-semibold">Womens</Link>
      </div>
        <h1>Product Page</h1>
    </div>
  )
}

export default Proudct
