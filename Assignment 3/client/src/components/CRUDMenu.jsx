import { useEffect, useState } from "react";
import s from "./CRUDMenu.module.css";

const CRUDMenu = () => {
    const [blogs, setBlogs] = useState([]);
    const [formData, setFormData] = useState({ title: "", body: "", author: "" });
    const [editingId, setEditingId] = useState(null);

    const fetchBlogs = async () => {
        try {
            const res = await fetch("http://localhost:4000/blogs");
            const data = await res.json();
            setBlogs(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await fetch(`http://localhost:4000/blogs/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                setEditingId(null);
            } else {
                await fetch("http://localhost:4000/blogs", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            }

            setFormData({ title: "", body: "", author: "" });
            fetchBlogs();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:4000/blogs/${id}`, { method: "DELETE" });
            fetchBlogs();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (blog) => {
        setFormData({ title: blog.title, body: blog.body, author: blog.author });
        setEditingId(blog._id);
    };

    return (
        <div className={s.crudMenu}>
            <h2 className={s.crudMenuHeader}>{editingId ? "Edit Blog" : "Create New Blog"}</h2>
            <form onSubmit={handleSubmit}>
                <div className={s.crudMenuGroup}>
                    <input
                        className={s.crudMenuInput}
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={s.crudMenuGroup}>
                    <textarea
                        className={s.crudMenuText}
                        name="body"
                        placeholder="Body"
                        value={formData.body}
                        onChange={handleChange}
                        rows={4}
                        required
                    />
                </div>
                <div className={s.crudMenuGroup}>
                    <input
                        className={s.crudMenuInput}
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className={s.crudMenuButton} type="submit">{editingId ? "Update Blog" : "Create Blog"}</button>
                {editingId && <button className={s.crudMenuButton} type="button" onClick={() => { setEditingId(null); setFormData({ title: "", body: "", author: "" }); }}>Cancel</button>}
            </form>

            <h2 className={s.crudMenuHeader}>Existing Blogs</h2>
            {blogs.map(blog => (
                <div key={blog._id} className={s.crudMenuItem}>
                    <div className={s.crudMenuItemInfo}>
                        <strong>{blog.title}</strong> by {blog.author}
                        <p>{blog.body}</p>
                    </div>
                    <div>
                        <button className={s.crudMenuButton} onClick={() => handleEdit(blog)}>Edit</button>
                        <button className={s.crudMenuButton} onClick={() => handleDelete(blog._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CRUDMenu;
