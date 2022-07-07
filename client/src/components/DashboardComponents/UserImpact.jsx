import React, { useState, useEffect, useRef } from "react";

// api actions
import { fetchUserTabsOpened } from "../../actions/tabsInfo";

// icons
import { FcDonate } from "react-icons/fc";
import { VscWindow } from "react-icons/vsc";
import { BiDonateHeart } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

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
        className="bg-white z-50 p-3 drop-shadow-lg rounded-md absolute right-0 mt-2 table w-[250px] md:w-[400px]"
      >
        <button onClick={toggleModal}>
          <MdOutlineClose fontSize={28} />
        </button>
        <h2 className="text-xl text-center">YOUR IMPACT</h2>
        <p className="text-center">Impact you've made!</p>
        <div className="mt-4 border border-slate-200 p-2 rounded-md">
          <div className="flex space-x-3">
            <BiDonateHeart
              fontSize={38}
              className="border border-black rounded-full p-1"
            />
            <p className="text-3xl">{Math.floor(tabsOpened / 15)}</p>
          </div>
          <p className="mt-1">Food plates you've donated!</p>
        </div>
        <div className="mt-4 border border-slate-200 p-2 rounded-md">
          <div className="flex space-x-3">
            <VscWindow
              fontSize={38}
              className="border border-black rounded-full p-1"
            />
            <p className="text-3xl">{tabsOpened}</p>
          </div>
          <p className="mt-1">Tabs you've opened</p>
          <p className="mt-1">
            We donate a plate of food for every 15 tabs you open
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 p-2 rounded-full bg-white"
        onClick={toggleModal}
      >
        <p className="text-lg">{Math.floor(tabsOpened / 15)}</p>
        <FcDonate fontSize={28} />
      </button>
      {isModalOpen && ModalElement()}
    </div>
  );
}

export default UserImpact;
