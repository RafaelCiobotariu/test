import { Link } from "react-router-dom";

const HandleRoutes = () => {
    return (
        <div className="not-found">
            <h2>Sorry</h2>
            <p className="not-found-text">This page cannot be found</p>
            <Link to="/" className="back-button not-found-back">Back to the main portofolio page</Link>
        </div>
    );
}

export default HandleRoutes;