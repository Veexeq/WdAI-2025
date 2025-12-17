import { useState } from 'react';
import styles from './addpage.module.css'
import { type post } from '../../types/post';

const ID_KEY = 'id';

function AddPage() {

  const [id, setId] = useState(() => {
    if (localStorage.getItem(ID_KEY)) {
      return Number(localStorage.getItem(ID_KEY));
    } else {
      localStorage.setItem(ID_KEY, '0');
      return 0;
    }
  });
  const [title, setTitle] = useState('');
  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const [body, setBody] = useState('');
  const bodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // The form hasn't been filled in in its entirety
    if (title === '' || body === '') {
      alert('Both \'Title\' and \'Body\' must be filled in.');
      return;
    }

    const post: post = { id: id, title: title, body: body };
    localStorage.setItem(String(id), JSON.stringify(post));

    // Handle ID incrementation
    const newId = id + 1;
    setId(newId);
    localStorage.setItem(ID_KEY, String(newId));

    // Reset form
    setTitle('');
    setBody('');
  };

  return (
    <>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'><h1>Title:</h1></label>
          <input 
            type='text' 
            id='title' 
            value={title}
            onChange={titleChange}
          />
          <label htmlFor='body'><h2>Post's body:</h2></label>
          <textarea 
            id='body'
            rows={20}
            cols={60}
            value={body}
            onChange={bodyChange}
          />
          <button type='submit'><h3>Add this post</h3></button>
        </form>
      </div>
    </>
  );
}

export default AddPage;
