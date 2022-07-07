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
    "http://localhost:3000/login?referralId=" + user.referralId;

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
    <div>
      <header className="border-b-2 border-black">
        <nav className="flex items-center justify-between space-x-2 container mx-auto py-2 px-1">
          <Link to="/">
            <img
              src={Logo}
              alt="Pledge a smile"
              className="max-w-[150px] md:max-w-[250px]"
            />
          </Link>
          <button
            className="flex space-x-1 px-4 py-2 bg-slate-700 text-white rounded-sm"
            onClick={logoutUser}
          >
            <RiLogoutBoxLine fontSize={22} />
            <p className="text-lg">Logout</p>
          </button>
        </nav>
      </header>
      <main className="container mx-auto">
        <section>
          <h2 className="p-3 text-2xl font-bold border-b border-slate-200">
            Account Information
          </h2>
          <div className="border-2 border-slate-200 rounded-sm space-y-6 md:space-y-0">
            <div className="flex flex-col items-center md:flex-row">
              <p className="md:max-w-[300px] w-full md:px-3">Username</p>
              <p className="border-2 border-slate-200 p-3 break-all flex-1 w-full rounded-sm">
                {user.name}
              </p>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <p className="md:max-w-[300px] w-full  md:px-3">Email</p>
              <p className="border-2 border-slate-200 p-3 break-all flex-1 w-full rounded-sm">
                {user.email}
              </p>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <p className="md:max-w-[300px] w-full md:px-3">
                Invite Your Friends
              </p>
              <input
                readOnly
                defaultValue={referralLink}
                className="border-2 border-slate-200 p-3 flex-1 w-full rounded-sm cursor-pointer"
                onClick={copyReferralLink}
              />
            </div>
          </div>
        </section>
        <section className="flex flex-col md:flex-row">
          <div className="p-3 border-2 border-slate-200 md:max-w-[300px] w-full">
            <h2 className="text-2xl font-bold text-center mb-8">Your Impact</h2>
            <div className="max-w-[150px] mx-auto space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <BiDonateHeart
                    fontSize={38}
                    className="p-1 border border-black rounded-full"
                  />
                </div>
                <p className="text-2xl flex-1 text-center">
                  {Math.floor(tabsOpened / 15)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <VscWindow
                    fontSize={38}
                    className="p-1 border border-black rounded-full"
                  />
                </div>
                <p className="text-2xl text-center flex-1">{tabsOpened}</p>
              </div>
            </div>
          </div>
          <div className="p-3 border-2 border-slate-200 w-full">
            <h2 className="text-2xl font-bold text-center mb-1">
              Upgrade Your Impact
            </h2>
            <p className="text-center">
              You can upgrade your impact by increasing the number of ads you
              see.
            </p>
            <div className="flex flex-col justify-center items-center mt-8 space-y-6 md:space-y-0 md:space-x-5 md:flex-row">
              <div>
                <div className="grid grid-cols-[60px_60px] grid-rows-[20px_20px_20px_20px_20px_20px] max-w-[120px] w-full">
                  <div className="border border-black row-start-5 col-span-2"></div>
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
                  <div className="border border-black row-start-5 col-span-2"></div>
                  <div className="border border-black row-start-3 row-end-5 col-start-2"></div>
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
                  <div className="border border-black row-start-5 col-span-2"></div>
                  <div className="border border-black row-start-3 row-end-5 col-start-2"></div>
                  <div className="border border-black row-start-1 row-end-3 col-start-2"></div>
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
        </section>
      </main>
      <footer>
        <div className="container mx-auto border border-slate-300 p-3 md:flex md:justify-between md:items-center">
          <nav className="flex flex-col space-y-3 text-center md:flex-row md:space-y-0 md:space-x-3 md:text-left">
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </nav>
          <div className="flex mt-3 justify-center items-center space-x-3 md:mt-0">
            <Link to="/linkedin">
              <FaLinkedin fontSize={28} />
            </Link>
            <Link to="/youtube">
              <FaYoutube fontSize={28} />
            </Link>
            <Link to="/twitter">
              <FaTwitter fontSize={28} />
            </Link>
            <Link to="/google">
              <FaGoogle fontSize={28} />
            </Link>
            <Link to="/facebook">
              <FaFacebook fontSize={28} />
            </Link>
            <Link to="/instagram">
              <FaInstagram fontSize={28} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Profile;
