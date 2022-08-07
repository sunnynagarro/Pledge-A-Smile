import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

// icons
import { AiOutlineUserAdd } from "react-icons/ai";
import { ImArrowUp } from "react-icons/im";
import { FiCopy } from "react-icons/fi";

function Invite({ referralId, text }) {
  const modalRef = useRef();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const referralLink = "https://tab.pledgeasmile.com/login?referralId=" + referralId;
  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Copied to clipboard");
  };

  useEffect(() => {
    const checkIfClickOutside = (event) => {
      if (
        isInviteModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.className.includes("invite-button")
      ) {
        setIsInviteModalOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickOutside);
    };
  }, [isInviteModalOpen]);

  const toggleInviteModal = () => {
    if (isInviteModalOpen) {
      setIsInviteModalOpen(false);
    } else {
      setIsInviteModalOpen(true);
    }
  };

  const ModalElement = () => {
    return (
      <div
        ref={modalRef}
        className="modal-container bg-white z-50 drop-shadow-lg rounded-md absolute left-10 mt-2 table w-[250px] md:w-[400px]"
      >
        <ImArrowUp className="top-arrow-left" />
        <h2 className="modal-header text-l">Share Your Link</h2>
        <hr className="modal-horizontal-line"/>
        <div className="invite-info">
          <p>Rack up referrals by sharing your personal referral link with others:</p>
        </div>
        <div className="copy-link-container mt-2">
          <input
            type="text"
            name="referral link"
            contentEditable={false}
            defaultValue={referralLink}
            readOnly={true}
            className="copy-link-textbox w-full bg-slate-100 p-3 rounded-sm"
          />
          <button
            className="green-button px-4 bg-slate-800 text-white rounded-sm"
            onClick={copyLink}
          >
            <FiCopy /> Copy Link
          </button>
        </div>
      </div>
    )
  }

  return (
    <div class="header-button-container">
      <button className="header-button invite-button rounded-full bg-white" onClick={toggleInviteModal}>
        <AiOutlineUserAdd fontSize={28} /> {text}
      </button>
      {isInviteModalOpen && ModalElement()}
    </div>
  );
}

export default Invite;
