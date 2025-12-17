import { useParams } from "react-router-dom";
import type { post } from "../../types/post";
import styles from './post.module.css';

function Post() {

  const { id } = useParams();
  let post: post | null = null;

  for (let i = 0; i < localStorage.length; i++) {
    const key: string | null = localStorage.key(i);
    if (key && key === id) {
      post = JSON.parse(localStorage.getItem(key)!);
      break;
    }
  }

  if (!post) {
    return (<h1>404 NOT FOUND</h1>);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      </div>
    </>
  );
}

export default Post;
