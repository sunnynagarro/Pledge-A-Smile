import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GuideChimp from 'guidechimp';

// api actions
import { updateUserTabsOpened } from "../actions/tabsInfo";

// icons
import { FcGoogle } from "react-icons/fc";
import { BsGear } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

// logo
import Logo from "../assets/logo-dashboard.png";

// components
// import Invite from "./DashboardComponents/Invite";
import GlobalImpact from "./DashboardComponents/GlobalImpact";
import UserImpact from "./DashboardComponents/UserImpact";
import GoogleAds from "./GoogleAds";
import QuickLinks from "./DashboardComponents/QuickLinks";

var images = [
  {
    id: 1,
    url: require("../assets/hero-bg.jpg"),
    date: new Date().toDateString()
  },
  {
    id: 2,
    url: require("../assets/hero-bg-3.webp"),
    date: new Date().toDateString()
  }
];

let tour = [
  {
    element: '#search',
    title: 'Search Google',
    description: 'Search the world\'s information, including webpages, images, videos and more. Google has many special features to help you find exactly what you\'re looking for.',
    position: 'bottom'
  },
  {
    element: '#globalImpact',
    title: 'Global Impact',
    description: 'See global impact that all of us are making, because the right to food is a human right.',
    position: 'left'
  },
  {
    element: '#userImpact',
    title: 'User Impact',
    description: 'You can see how many tabs you have opened so far and what impact you have made.',
    position: 'bottom'
  },
  {
    element: '#quickLinks',
    title: 'Quick Links',
    description: 'Most of your favourite apps are here for easy access.',
    position: 'bottom'
  },
  {
    element: '#profileLink',
    title: 'Profile',
    description: 'You can see your basic information and can increase your overall impact within your profile.',
    position: 'top'
  },
];

let options = {
  exitOverlay: false,
  interaction: false
};

function callGuide() {
  var guideStorage = localStorage.getItem('seenGuide');
  if (guideStorage === null) {
    setTimeout(() => {
      var guideChimp = GuideChimp(tour, options);
      guideChimp.start();
    }, 500);
    localStorage.setItem('seenGuide', true);
  }
}

function setCurrentBGImage() {
  var storedImage = localStorage.getItem('bg-image');
  if (storedImage != null) {
    var bgImage = JSON.parse(storedImage);
    var currentDate = new Date(new Date().toDateString());
    if (new Date(bgImage.date) < currentDate) {
      var nextImageId = (bgImage.id % images.length) + 1;
      images.forEach((img) => {
        if (img.id === nextImageId) {
          localStorage.setItem('bg-image', JSON.stringify(img));
          HeroBgImage = img.url;
        }
      });
    } else {
      HeroBgImage = bgImage.url;
    }
  } else {
    localStorage.setItem('bg-image', JSON.stringify(images[0]));
    HeroBgImage = images[0].url;
  }
  if (HeroBgImage === null || HeroBgImage === undefined) {
    HeroBgImage = images[0].url;
  }
}

var HeroBgImage;
function Dashboard({ user }) {
  callGuide();
  setCurrentBGImage();
  useEffect(() => {
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
    if (user.name) {
      greet = "Good morning, " + user.name;
    } else {
      greet = "Good morning";
    }
  } else if (hour >= 12 && hour <= 17) {
    if (user.name) {
      greet = "Good afternoon, " + user.name;
    } else {
      greet = "Good afternoon";
    }
  } else if (hour >= 17 && hour <= 24) {
    if (user.name) {
      greet = "Good evening, " + user.name;
    } else {
      greet = "Good evening";
    }
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
      className="main-container h-[100vh] flex flex-col"
      style={{
        background: `url(${HeroBgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar */}
      <nav className="header-container p-2 flex items-center space-x-3">
        <div class="left">
          {/* <Invite referralId={user.referralId} text="Invite Buddies" /> */}
        </div>
        <div class="right">
          <GlobalImpact />
          <UserImpact userId={user._id} />
          <QuickLinks />
        </div>
      </nav>
      <div className="center-content flex-1 flex flex-col mt-[80px] items-center text-white">
        <div class="branding">
          <img
            src={Logo}
            alt="finger tapping on a heart symbol"
            className="w-[270px]"
          />
        </div>

        <div className="text-center max-w-[700px] w-full flex flex-col items-center">
          <h2 class="greeting">{greet}.</h2>
          <form
            id="search"
            className="flex bg-slate-50 space-x-2 max-w-[560px] w-full drop-shadow-lg p-2 rounded-full mt-4 search-container"
            onSubmit={handleSearch}
          >
            <FcGoogle fontSize={28} />
            <input
              type="text"
              name="query"
              value={query}
              autoComplete="off"
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-black search-input"
              placeholder="Search"
              autoFocus
            />
            <button type="submit" class="search-icon">
              <BiSearch fontSize={24} class="search-svg" />
            </button>
          </form>
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1fr_400px] grid-rows-5 w-full mt-2">
          <div className="flex items-center justify-center col-start-1 lg:col-start-2 row-start-5 overflow-hidden">
            <GoogleAds
              clientId="ca-pub-5067002529301261"
              slotId="2151146654"
              smw="234px"
              smh="60px"
              mdw="468px"
              mdh="60px"
              lgw="720px"
              lgh="90px"
            />
          </div>
          <div className="flex items-center justify-center col-start-1 lg:col-start-3 row-start-1 row-span-2 overflow-auto">
            {user.impactLevel > 2 && (
              <GoogleAds
                clientId="ca-pub-5067002529301261"
                slotId="8333411625"
                smw="125px"
                smh="125px"
                mdw="200px"
                mdh="200px"
                lgw="200px"
                lgh="200px"
              />
            )}
          </div>
          <div className="flex items-center justify-center col-start-1 lg:col-start-3 row-start-3 row-span-2 overflow-auto">
            {user.impactLevel > 1 && (
              <GoogleAds
                clientId="ca-pub-5067002529301261"
                slotId="3081084945"
                smw="125px"
                smh="125px"
                mdw="200px"
                mdh="200px"
                lgw="200px"
                lgh="200px"
              />
            )}
          </div>
        </div>
      </div>
      <nav className="footer-container p-2 flex items-center space-x-3">
        <Link id="profileLink" to="/profile">
          <button className="settings p-2 rounded-full bg-white">
            <BsGear fontSize={28} height="22" width="22" />
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default Dashboard;
