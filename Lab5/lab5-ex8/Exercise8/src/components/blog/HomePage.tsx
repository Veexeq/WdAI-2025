import { Link } from 'react-router-dom';
import styles from './homepage.module.css'

function HomePage() {
  return (
    <>
      <div className={styles.wrapper}>
        <h1>Witaj</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tellus nisi, viverra quis scelerisque non, interdum eget sem. Proin eu scelerisque magna. In in placerat arcu, in porttitor neque. Sed quam augue, ornare eu faucibus sit amet, pellentesque a orci. Nullam pharetra sodales neque, et laoreet lacus imperdiet et. Sed consequat lectus magna, vitae suscipit sapien pulvinar commodo. Cras euismod enim eget nulla finibus, vel mollis felis euismod. Integer vulputate lectus urna. Suspendisse euismod in magna vel dapibus. Vivamus consequat eu augue in lobortis. Phasellus hendrerit justo at interdum sollicitudin. Aliquam dignissim erat nec neque sollicitudin sollicitudin. Morbi non ex at dolor vulputate congue. Phasellus convallis, purus nec accumsan efficitur, libero quam semper nunc, vel faucibus velit purus eu est. Proin et scelerisque turpis, sit amet vestibulum enim.</p>
        <Link className={styles.link} to='/blog'>Blog</Link>
      </div>
    </>
  );
}

export default HomePage;
