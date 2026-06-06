import "./modal.css"
import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

const modalRoot = document.getElementById("modal-root")!;

export default function Modal({title, children, onClose}: ModalProps) {
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [onClose]);

    return createPortal(
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <span className="material-symbols-outlined" onClick={onClose}>close</span>
            <h3>{title}</h3>
            <div className="forms-field">{children}</div>
        </div>
      </div>,
      modalRoot
    )
}