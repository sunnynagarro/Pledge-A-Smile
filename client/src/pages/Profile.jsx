import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

// api actions
import { updateImpactLevel } from "../actions/userInfo";

// images
import Logo from "../assets/logo.png";

// icons
import { RiLogoutBoxLine } from "react-icons/ri";
import { VscWindow } from "react-icons/vsc";
import { BiDonateHeart } from "react-icons/bi";
import {
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaGoogle,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

// context
import UserContext from "../context/UserContext";
import { fetchUserTabsOpened } from "../actions/tabsInfo";

function Profile() {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(UserContext);
  const [tabsOpened, setTabsOpened] = useState(0);
  useEffect(() => {
    if (!user._id) {
      navigate("/");
    } else {
      async function updateTabsOpened() {
        let data = await fetchUserTabsOpened(user._id);
        if (data.success === true) {
          setTabsOpened(data.tabsOpened);
        }
      }
      updateTabsOpened();
    }
  }, [user._id, navigate]);
  const initialImpact = (
    JSON.parse(localStorage.getItem("user")) || { impactLevel: 1 }
  ).impactLevel;
  const [currentImpact, setCurrentImpact] = useState(initialImpact);
  const logoutUser = () => {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT",
    });
  };
  const referralLink =
    "https://tab.pledgeasmile.com/login?referralId=" + user.referralId;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Link copied to clipboard");
  };

  const changeImpactLevel = async (event) => {
    let level = event.target.value;
    dispatch({
      type: "CHANGE_IMPACT_LEVEL",
      payload: {
        level,
      },
    });
    let data = await updateImpactLevel(user._id, level);
    if (data.success === true) {
      setCurrentImpact(level);
      data.user.referrals = JSON.parse(data.user.referrals);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Successfully updated impact level");
    } else {
      toast.error("Error while updating impact level");
    }
  };

  return (
    <div className="profile-page">
      <header className="border-b-2 border-gray">
        <nav className="flex items-center justify-between space-x-2 container mx-auto py-2 px-1">
          <div className="flex">
            <Link to="/">
              <img
                src={Logo}
                alt="Pledge a smile"
                className="max-w-[150px] md:max-w-[200px]"
              />
            </Link>
            <Link className="m-auto ml-10" to="/">Home</Link>
          </div>
          <button
            className="green-button px-4 bg-slate-800 text-white rounded-sm"
            onClick={logoutUser}
          >
            <RiLogoutBoxLine /> Logout
          </button>
        </nav>
      </header>
      <main className="container mx-auto">
        <h2 className="p-3 text-2xl font-bold mt-5">
          Account Information
        </h2>
        <div className="main-container-inner">
          <div className="profile-container">
            <div className="left-container">
              <div className="head-title">
                <p className="name font-bold">{user.name}</p>
                <p className="email">{user.email}</p>
              </div>
              <div className="profile-body">
                <div className="invite-friends">
                  <div>
                    Invite Your Friends
                  </div>
                  <div className="invite-container mt-2">
                    <input
                      readOnly
                      defaultValue={referralLink}
                      className="copy-link-textbox w-full bg-slate-100 p-3 rounded-sm"
                      onClick={copyReferralLink}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="center-container">
              <div>
                <h2 className="text-l font-bold">Your Impact</h2>
                <p className="modal-sub-title mt-1">
                  We donate a plate of food for every 15 tabs you open
                </p>
                <hr className="modal-horizontal-line" />
                <div>
                  <div className="mt-4">
                    <div className="modal-count flex space-x-3">
                      <BiDonateHeart
                        fontSize={32}
                        className="count-icon border rounded-full p-1"
                      />
                      <p className="count text-3xl">{Math.floor(tabsOpened / 15)}</p>
                    </div>
                    <p className="mt-1">Food plates you've donated</p>
                  </div>
                  <div className="mt-4">
                    <div className="modal-count flex space-x-3">
                      <VscWindow
                        fontSize={32}
                        className="count-icon border rounded-full p-1"
                      />
                      <p className="count text-3xl">{tabsOpened}</p>
                    </div>
                    <p className="mt-1">Tabs you've opened</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-container">
              <div>
                <h2 className="text-l font-bold mb-1">
                  Upgrade Your Impact
                </h2>
                <p className="modal-sub-title">
                  You can upgrade your impact by increasing the number of ads you
                  see
                </p>
                <hr className="modal-horizontal-line" />
                <div className="flex flex-col justify-center items-center mt-8 space-y-6 md:space-y-0 md:space-x-5 md:flex-row">
                  <div>
                    <div className="grid grid-cols-[60px_60px] grid-rows-[20px_20px_20px_20px_20px_20px] max-w-[120px] w-full">
                      <div className="impact-skelaton row-start-5 col-span-2"></div>
                    </div>
                    <div className="text-center space-x-2">
                      <input
                        type="radio"
                        name="numberOfAds"
                        value={1}
                        checked={currentImpact === "1"}
                        onChange={changeImpactLevel}
                        className="cursor-pointer"
                      />
                      <label htmlFor="numberOfAds">1 Ad</label>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-[60px_60px] grid-rows-[20px_20px_20px_20px_20px_20px] max-w-[120px] w-full">
                      <div className="impact-skelaton row-start-5 col-span-2"></div>
                      <div className="impact-skelaton row-start-3 row-end-5 col-start-2"></div>
                      <div></div>
                    </div>
                    <div className="text-center space-x-2">
                      <input
                        type="radio"
                        name="numberOfAds"
                        value={2}
                        checked={currentImpact === "2"}
                        onChange={changeImpactLevel}
                        className="cursor-pointer"
                      />
                      <label htmlFor="numberOfAds">2 Ads</label>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-[60px_60px] grid-rows-[20px_20px_20px_20px_20px_20px] max-w-[120px] w-full">
                      <div className="impact-skelaton row-start-5 col-span-2"></div>
                      <div className="impact-skelaton row-start-3 row-end-5 col-start-2"></div>
                      <div className="impact-skelaton row-start-1 row-end-3 col-start-2"></div>
                    </div>
                    <div className="text-center space-x-2">
                      <input
                        type="radio"
                        name="numberOfAds"
                        value={3}
                        checked={currentImpact === "3"}
                        onChange={changeImpactLevel}
                        className="cursor-pointer"
                      />
                      <label htmlFor="numberOfAds">3 Ads</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <div className="profile-footer-container mx-auto md:flex md:justify-between md:items-center">
              <nav className="flex flex-col space-y-3 text-center md:flex-row md:space-y-0 md:space-x-3 md:text-left">
                <Link to="/about">About</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/privacy">Privacy</Link>
                <Link to="/terms">Terms</Link>
              </nav>
              <div className="flex mt-3 justify-center items-center space-x-3 md:mt-0">
                <Link to="/linkedin">
                  <FaLinkedin fontSize={18} />
                </Link>
                <Link to="/youtube">
                  <FaYoutube fontSize={18} />
                </Link>
                <Link to="/twitter">
                  <FaTwitter fontSize={18} />
                </Link>
                <Link to="/google">
                  <FaGoogle fontSize={18} />
                </Link>
                <Link to="/facebook">
                  <FaFacebook fontSize={18} />
                </Link>
                <Link to="/instagram">
                  <FaInstagram fontSize={18} />
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Profile;
