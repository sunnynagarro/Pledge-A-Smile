import React, { useState, useEffect, useRef } from "react";

// api actions
import { fetchUserTabsOpened } from "../../actions/tabsInfo";

// icons
import { FaHamburger } from "react-icons/fa";
import { VscWindow } from "react-icons/vsc";
import { BiDonateHeart } from "react-icons/bi";
import { ImArrowUp } from "react-icons/im";

function UserImpact({ userId }) {
  const modalRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabsOpened, setTabsOpened] = useState(0);
  useEffect(() => {
    async function updateTabsOpened() {
      let data = await fetchUserTabsOpened(userId);
      if (data.success === true) {
        setTabsOpened(data.tabsOpened);
      }
    }
    setTimeout(updateTabsOpened, 500);
    const checkIfClickOutside = (event) => {
      if (
        isModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickOutside);
    };
  }, [isModalOpen, userId]);

  const toggleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };
  const ModalElement = () => {
    return (
      <div
        ref={modalRef}
        className="modal-container z-50 p-3 drop-shadow-lg rounded-md absolute right-0 mt-2 table w-[250px] md:w-[250px]"
      >
        <ImArrowUp className="top-arrow-right" />
        <h2 className="modal-header text-l">YOUR IMPACT</h2>
        <p className="modal-sub-title mt-1">
            We donate a plate of food for every 15 tabs you open
          </p>
        <hr className="modal-horizontal-line"/>
        <div className="mt-4">
          <div className="modal-count flex space-x-3">
            <BiDonateHeart
              fontSize={32}
              className="count-icon border rounded-full p-1"
            />
            <p className="count text-3xl">{Math.floor(tabsOpened / 15)}</p>
          </div>
          <p className="mt-1">Food Plates you have donated.</p>
        </div>
        <hr className="modal-horizontal-line"/>
        <div className="mt-4">
          <div className="modal-count flex space-x-3">
            <VscWindow
              fontSize={32}
              className="count-icon border rounded-full p-1"
            />
            <p className="count text-3xl">{tabsOpened}</p>
          </div>
          <p className="mt-1">Tabs you have opened so far.</p>
        </div>
      </div>
    );
  };

  return (
    <div id="userImpact" className="relative">
      <button
        className="header-button user-impact flex items-center space-x-1 p-2 rounded-full bg-white"
        onClick={toggleModal}
      >
        <p className="text-lg">{Math.floor(tabsOpened / 15)}</p>
        <FaHamburger fontSize={28} />
      </button>
      {isModalOpen && ModalElement()}
    </div>
  );
}

export default UserImpact;
