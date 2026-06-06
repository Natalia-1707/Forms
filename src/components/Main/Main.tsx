import { useState } from "react";
import "./main.css";
import Modal from '../modal/Modal'
import UncontrolledForm from '../forms/UncontrolledForm'
import RHFForm from '../forms/RHFForm'

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
                  <UncontrolledForm />
                ) : (
                  <RHFForm />
                )}
            </Modal>
            )}
        </div>
    )
}