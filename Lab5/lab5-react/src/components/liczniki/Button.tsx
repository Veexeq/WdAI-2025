// import styles from './counter.module.css'

interface ButtonProps {
  onClick: () => void,
  className?: string
};

function Button({ onClick, className }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      Click me.
    </button>
  )
}

export default Button;
