import styles from "./Modal.module.scss";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { X } from "react-bootstrap-icons";

function Modal({ show, children, footer, title, onClose }) {
  const modalContent = show ? (
    <div className={styles.ModalOverlay}>
      <div className={clsx(styles.Modal)}>
        <header className={styles.modalHeader}>
          <div>
            <h3 className="is-size-4">{title}</h3>
          </div>
          <div>
            <button className="button" onClick={onClose}>
              <span className="icon is-small">
                <X />
              </span>
            </button>
          </div>
        </header>

        <div className={styles.modalContent}>{children}</div>
        {footer && <footer className={styles.modalFooter}>{footer}</footer>}
      </div>
    </div>
  ) : null;

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
}

export default Modal;
