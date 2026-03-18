import s from './BlogPost.module.css';

const BlogPost = ({ title, body, author, createdAt, updatedAt }) => {
    return (
        <div className={s.blogPost}>
            <div className={s.blogPostTitle}>{title}</div>
            <div className={s.blogPostBody}>{body}</div>
            <div className={s.blogPostMeta}>
                <div>Author: {author}</div>
                <div>Created: {new Date(createdAt).toLocaleString()}</div>
                <div>Updated: {new Date(updatedAt).toLocaleString()}</div>
            </div>
        </div>
    );
}

export default BlogPost;