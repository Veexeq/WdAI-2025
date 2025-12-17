import { Link } from "react-router-dom";
import type { post } from "../../types/post";
import styles from './blog.module.css'

function Blog() {
  
  const posts: post[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key: string | null = localStorage.key(i);
    if (key && key !== 'counter') {

      // ! at the end is 'non-null assertion', assuring the TS
      // compiler that this can't be null
      const value: string = localStorage.getItem(key)!;
      const post: post = JSON.parse(value);
      posts.push(post);
    }
  }
    
  return (
    <>
      <div className={styles.wrapper}>
        <h1>List of all posts</h1>
        {posts.map(post => (
          <Link key={post.id} className={styles.link} to={'/article/' + post.id}>{post.title}</Link>
        ))}
      </div>
    </>
  );
}

export default Blog;
