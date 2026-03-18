import s from './Header.module.css';
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className={s.header}>
            <NavLink className={s.headerItem} to="/">
                Blogs
            </NavLink>
            <NavLink className={s.headerItem} to="/crud">
                CRUD Menu
            </NavLink>
        </div>
    );
}

export default Header;