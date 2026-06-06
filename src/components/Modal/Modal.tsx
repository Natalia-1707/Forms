import "./modal.css"

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};


export default function Modal({title, children, onClose}: ModalProps) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <span className="material-symbols-outlined" onClick={onClose}>close</span>
            <h3>{title}</h3>
            <div className="forms-field">{children}</div>
            <button>Submit</button>
        </div>
      </div>
    )
}