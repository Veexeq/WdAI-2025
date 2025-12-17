import { useParams } from "react-router-dom";

function Post() {

  const { id } = useParams();

  return (
    <>
      <h1>{id}</h1>  
    </>
  );
}

export default Post;
