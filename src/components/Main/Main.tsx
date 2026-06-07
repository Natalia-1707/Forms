import { useState } from "react";
import "./main.css";
import Modal from '../modal/Modal'
import UncontrolledForm from '../forms/UncontrolledForm'
import RHFForm from '../forms/RHFForm'
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";


export default function Main() {
    const [modalType, setModalType] = useState<"uncontrolled" | "rhf" | null>(null);

    const submissions = useSelector((state: RootState) => state.form.submissions);

    return (
        <div className="main-wrapper">
            <div className="buttons-div">
                <button onClick={() => setModalType("uncontrolled")}>Uncontrolled Form</button>
                <button onClick={() => setModalType("rhf")}>Open RHF Form</button>
            </div>
            <div className="submissions">
                <h2>Submissions</h2>
                <div className="submission-div">
                  {submissions.map((item) => (
                    <div key={item.id} className="submission-card">
                      { item.data.image && (
                        <img
                        src={item.data.image}
                        alt="uploaded"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                      )}
                      <div className="submission-card-div">
                        <p><b>Name:</b> {item.data.name}</p>
                        <p><b>Email:</b> {item.data.email}</p>
                        <p><b>Age:</b> {item.data.age}</p>
                        <p><b>Country:</b> {item.data.country}</p>
                      </div>
                    </div>
                  ))} 
                </div>
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
                  <UncontrolledForm onSuccess={() => setModalType(null)} />
                ) : (
                  <RHFForm onSuccess={() => setModalType(null)} />
                )}
            </Modal>
            )}
        </div>
    )
}