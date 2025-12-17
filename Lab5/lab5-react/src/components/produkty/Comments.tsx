import axios from 'axios';
import { useEffect, useState } from 'react';

import styles from './comment.module.css'
import type { commentProp } from './interfaces';
import Comment from './Comment';

function Comments() {
  const [commentData, setCommentData] = useState<commentProp[]>([]);

  // Run once the page is loaded
  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get('https://dummyjson.com/comments');
      setCommentData(response.data.comments);
      // console.log(commentsData);
    };

    fetchComments();
  }, []);

  return (
    <>
      <div className={styles.background}>
        {commentData.map((entry) => (
          <Comment 
            id={entry.id}
            body={entry.body}
            postId={entry.postId}
            likes={entry.likes}
            user={entry.user}
          />
        ))}
      </div>
    </>
  );
}

export default Comments;
