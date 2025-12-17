import './App.css'
import Comment from './components/produkty/Comment';
// import Countdown from './components/efekty/Countdown';
// import Title from './components/efekty/Title';
// import Counter from './components/efekty/Counter';
// import StudentManager from './components/studenci/StudentManager'
// import Students from './components/studenci/Students';
// import Update from './components/inne/Update';
// import Ternary from './components/inne/Ternary'
// import Login from './components/formularze/Login'
// import Password from './components/formularze/Password';
// import Form from './components/formularze/Form';
// import Counter from './components/liczniki/Counter';
// import NewCounter from './components/liczniki/NewCounter';

import type { commentProp } from './components/produkty/interfaces';

const commentData: commentProp[] = [
  {
    id: 1,
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur mi vitae dolor accumsan, at consectetur lectus posuere. Morbi volutpat elit at risus aliquet auctor. Curabitur porttitor dapibus nulla in scelerisque. Vestibulum porttitor sem sit amet orci ullamcorper, eget suscipit neque iaculis. Fusce a ipsum et sem imperdiet sollicitudin. Sed vehicula ultrices maximus. Suspendisse in cursus sapien. Nunc varius mauris libero, quis porta ex dignissim eu. Fusce volutpat nisi lectus.',
    postId: 1,
    likes: 10,
    user: { id: 1, username: 'jank', fullName: 'Jan Kowalski'}
  }
];

function App() {

  return (
    <>
      {
        commentData.map(comment => (
          <Comment 
              id={comment.id}
              body={comment.body}
              postId={comment.postId}
              likes={comment.likes}
              user={comment.user}
          />
        ))
      }
    </>
  );
}

export default App
