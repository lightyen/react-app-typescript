import React from "react"
import { Link, RouteComponentProps } from "react-router-dom"

class NotFound extends React.Component<RouteComponentProps> {
    public render() {
        return (
            <Link className="btn btn-primary m-3" to="/">
                你幹嘛呢！
            </Link>
        )
    }
}

export default NotFound
