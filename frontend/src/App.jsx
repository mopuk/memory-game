import { Outlet, Link } from "react-router-dom";

export default function App() {
    return (
    <>
        <Outlet />
        <footer>By{" "}
            <Link to="https://github.com/mopuk">MopuK</Link>
        </footer>
    </>
    );
}
