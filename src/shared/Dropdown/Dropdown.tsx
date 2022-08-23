import React from "react";
import ReactDOM from "react-dom";
import styles from './dropdown.css'

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const NOOP = () => {};

export function Dropdown({ button, children, isOpen, onOpen = NOOP, onClose = NOOP }: IDropdownProps) {
  const[isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  React.useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen]);

  const handleOpen = () => {
    if(isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }

  const node = document.querySelector('#dropdown_root');
  if (!node) return null;

  return(
    <div className={styles.container}>
      <div onClick={handleOpen}>
        { button }
      </div>
      {(isDropdownOpen && ReactDOM.createPortal((
        <div className={styles.listContainer}>
          <div  className={styles.list} onClick={() => setIsDropdownOpen(false)}>
            {children}
          </div>
        </div>
      ), node))}
    </div>
  )
}