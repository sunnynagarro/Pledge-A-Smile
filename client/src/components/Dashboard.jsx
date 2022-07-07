import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// api actions
import { updateUserTabsOpened } from "../actions/tabsInfo";

// icons
import { FcGoogle, FcSettings } from "react-icons/fc";
import { MdOutlineSearch } from "react-icons/md";

// images
import HeroBgImage from "../assets/hero-bg.jpg";

// logo
import Logo from "../assets/logo-dashboard.png";

// components
import Invite from "./DashboardComponents/Invite";
import GlobalImpact from "./DashboardComponents/GlobalImpact";
import UserImpact from "./DashboardComponents/UserImpact";

function Dashboard({ user }) {
  useEffect(() => {
    // window.adsbygoogle = (window.adsbygoogle || []).push({});
    if (
      !window.performance
        .getEntriesByType("navigation")
        .map((nav) => nav.type)
        .includes("reload")
    ) {
      (async () => {
        await updateUserTabsOpened(user._id);
      })();
    }
  }, [user._id]);
  let [query, setQuery] = useState("");
  let greet = "";
  let now = new Date();
  let hour = now.getHours();
  if (hour < 12) {
    greet = "Good Morning";
  } else if (hour >= 12 && hour <= 17) {
    greet = "Good Afternoon";
  } else if (hour >= 17 && hour <= 24) {
    greet = "Good Evening";
  }

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim() === "") return;
    let url = "https://www.google.com/search?q=" + query;
    window.open(url, "_blank");
    setQuery("");
  };
  return (
    <div
      className="min-h-[100vh] flex flex-col"
      style={{
        background: `url(${HeroBgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar */}
      <nav className="p-2 flex justify-end items-center space-x-3">
        <Invite referralId={user.referralId} />
        <GlobalImpact />
        <UserImpact userId={user._id} />
        <Link to="/profile">
          <button className="p-2 rounded-full bg-white">
            <FcSettings fontSize={28} />
          </button>
        </Link>
      </nav>
      <div className="flex-1 flex flex-col mt-[80px] items-center text-white">
        <div>
          <img
            src={Logo}
            alt="finger tapping on a heart symbol"
            className="w-[350px]"
          />
        </div>

        <div className="mt-6 text-center max-w-[700px] w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold break-all">
            Hello, {user.name}
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">{greet}.</h2>
          <form
            className="flex bg-slate-50 space-x-2 max-w-[500px] w-full drop-shadow-lg p-3 rounded-full mt-8"
            onSubmit={handleSearch}
          >
            <FcGoogle fontSize={28} />
            <input
              type="text"
              name="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-black"
              placeholder="Search"
              autoFocus
            />
            <button type="submit">
              <MdOutlineSearch fontSize={28} color="black" />
            </button>
          </form>
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1fr_400px] grid-rows-5 w-full mt-2">
          <div className="flex items-center justify-center col-start-1 lg:col-start-2 row-start-5 overflow-hidden">
            <ins
              className="adsbygoogle w-full h-full max-w-[234px] max-h-[60px] md:max-w-[468px] md:max-h-[60px] lg:max-w[720px] lg:max-h[90px]"
              style={{ display: "block" }}
              data-ad-client="ca-pub-6577557805751368"
              data-ad-slot="3205106399"
            ></ins>
          </div>
          <div className="flex items-center justify-center col-start-1 lg:col-start-3 row-start-1 row-span-2 overflow-auto">
            {/* {user.impactLevel > 2 && (
              <ins
                className="adsbygoogle w-full h-full max-w-[125px] max-h-[125px] md:max-w-[200px] md:max-h-[200px]"
                style={{ display: "block" }}
                data-ad-client="ca-pub-6577557805751368"
                data-ad-slot="5162622688"
              ></ins>
            )} */}
          </div>
          <div className="flex items-center justify-center col-start-1 lg:col-start-3 row-start-3 row-span-2 overflow-auto">
            {user.impactLevel > 1 && (
              <ins
                className="adsbygoogle w-full h-full max-w-[125px] max-h-[125px] md:max-w-[200px] md:max-h-[200px]"
                style={{ display: "block" }}
                data-ad-client="ca-pub-6577557805751368"
                data-ad-slot="5162622688"
              ></ins>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
