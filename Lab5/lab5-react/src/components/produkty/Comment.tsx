import { useState } from 'react';
import styles from './comment.module.css'
import type { commentProp } from './interfaces';

function Comment(props: commentProp) {

  const [likes, setLikes] = useState(props.likes);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p>(commendID: {props.id})</p>
        <div className={styles.userInfo}>
          <p>(userID: {props.user.id}, {props.user.username})</p>
          <p><b>{props.user.fullName}</b></p>
        </div>
        <p>(postID: {props.postId})</p>  
      </div> 
      <div className={styles.body}>
        <p>{props.body}</p>
      </div>
      <div className={styles.footer}>
        <p>Number of likes: {likes}</p>
        <div>
          <button 
            type='button'
            onClick={() => {
              setLikes(likes + 1);
            }}
          >LIKE</button>
          <button 
            type='button'
            onClick={() => {
              setLikes(likes - 1);
            }}
          >DISLIKE</button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
