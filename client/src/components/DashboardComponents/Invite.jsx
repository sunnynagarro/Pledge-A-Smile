import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

// icons
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

Modal.setAppElement("#root");
const ModalStyles = {
  content: {
    maxWidth: "600px",
    width: "100%",
    top: "10%",
    bottom: "auto",
    left: "50%",
    transform: "translate(-50%, -10%)",
  },
};

function Invite({ referralId }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => setModalIsOpen(false);
  const openModal = () => setModalIsOpen(true);
  const referralLink = "http://localhost:3000/login?referralId=" + referralId;
  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Copied to clipboard");
  };
  return (
    <div>
      <button className="p-2 rounded-full bg-white" onClick={openModal}>
        <AiOutlineUserAdd fontSize={28} />
      </button>
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ModalStyles}
        contentLabel="Invite your friends"
      >
        <button onClick={closeModal}>
          <MdOutlineClose fontSize={28} />
        </button>
        <h2 className="text-center text-xl">Invite Your Friends</h2>
        <div className="mt-6">
          <input
            type="text"
            name="referral link"
            contentEditable={false}
            defaultValue={referralLink}
            readOnly={true}
            className="w-full bg-slate-100 p-3 rounded-sm"
          />
          <button
            className="mt-3 px-4 py-2 bg-slate-800 text-white rounded-sm"
            onClick={copyLink}
          >
            Copy Link
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Invite;
