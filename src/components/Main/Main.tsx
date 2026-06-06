import { useState } from "react";
import "./main.css";
import Modal from '../Modal/Modal'

export default function Main() {
    const [modalType, setModalType] = useState<"uncontrolled" | "rhf" | null>(null);
    return (
        <div className="main-wrapper">
            <div className="buttons-div">
                <button onClick={() => setModalType("uncontrolled")}>Uncontrolled Form</button>
                <button onClick={() => setModalType("rhf")}>Open RHF Form</button>
            </div>
            <div className="Submissions">
                <h2>Submissions</h2>
            </div>
             {modalType && (
            <Modal
                title={
                modalType === "uncontrolled"
                    ? "Uncontrolled Form"
                    : "React Hook Form"
                }
                onClose={() => setModalType(null)}
            >
                {modalType === "uncontrolled" ? (
                <p>Uncontrolled form here</p>
                ) : (
                <p>RHF form here</p>
                )}
            </Modal>
            )}
        </div>
    )
}