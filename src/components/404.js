import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Error404 = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mt-9">Error 404</h1>
            <h2 className="text-2xl font-bold mt-9">Page not found</h2>
            <h2 className="text-2xl font-bold mt-9"><Link to="/">Back to  here.</Link></h2>
        </div>
    );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Error404);
