import { useEffect, useState } from 'react';
import s from './Blogs.module.css';
import BlogPost from './BlogPost';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:4000/blogs');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className={s.blogsContainer}>
            {blogs.map(blog => (
                <BlogPost
                    key={blog._id}
                    title={blog.title}
                    body={blog.body}
                    author={blog.author}
                    createdAt={blog.createdAt}
                    updatedAt={blog.updatedAt}
                />
            ))}
        </div>
    );
}

export default Blogs;
