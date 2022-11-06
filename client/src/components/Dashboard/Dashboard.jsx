import React, { useEffect, useState } from "react";
import GuideChimp from "guidechimp";

// api actions
import { updateUserTabsOpened } from "../../actions/tabsInfo";

// icons
import { FcGoogle } from "react-icons/fc";
import { BiSearch } from "react-icons/bi";

// logo
import Logo from "../../assets/logo-dashboard.png";

// components
// import Invite from "./DashboardComponents/Invite";
import GlobalImpact from "./GlobalImpact/GlobalImpact";
import UserImpact from "./UserImpact/UserImpact";
import GoogleAds from "../GoogleAds";
import QuickLinks from "./QuickLinks/QuickLinks";
import TabbingBuddies from "./MyBuddies/TabbingBuddies";
import Settings from "./Settings/Settings";

// Constants
import {
  allBgImages,
  natureBgImages,
  architectureBgImages,
  petsBgImages,
} from "../../constants/bgImages.js";
import { guideTour } from "../../constants/guideList.js";

let images = [];
const tour = guideTour;

let options = {
  exitOverlay: false,
  interaction: false,
};

// If the user has first logged in, then guide the user throught the features.
function callGuide() {
  var guideStorage = localStorage.getItem("seenGuide");
  if (guideStorage === null) {
    setTimeout(() => {
      var guideChimp = GuideChimp(tour, options);
      guideChimp.start();
    }, 500);
    localStorage.setItem("seenGuide", true);
  }
}

// Reset images collection to latest.
function resetImagesCollection() {
  let background = localStorage.getItem("background");
  if (background === null || background === undefined) {
    localStorage.setItem("background", "All");
    background = "All";
  }
  if (background.toLowerCase() === "all") {
    images = allBgImages;
  } else if (background.toLowerCase() === "nature") {
    images = natureBgImages;
  } else if (background.toLowerCase() === "architecture") {
    images = architectureBgImages;
  } else if (background.toLowerCase() === "pets") {
    images = petsBgImages;
  } else {
    let image = {
      url: background,
    };
    images = [];
    images.push(image);
  }
}

// Set background image.
function setCurrentBGImage() {
  var currentImageObjString = localStorage.getItem("bg-image");
  resetImagesCollection();

  // Check if the background image is already set.
  if (currentImageObjString !== null && currentImageObjString !== undefined) {
    var bgImage = JSON.parse(currentImageObjString);

    // When single image is set.
    if (
      (bgImage?.date === null || bgImage?.date === undefined) &&
      bgImage?.url !== undefined &&
      bgImage?.url !== null
    ) {
      HeroBgImage = bgImage.url;
      return;
    }

    var currentDate = new Date(new Date().toDateString());

    // Check if the next day has come and we need to change the image now.
    if (new Date(bgImage?.date) < currentDate) {
      // Check which image needs to be set next.
      let image = images[Math.floor(Math.random() * images.length)];
      image.date = new Date().toDateString();
      // Set the new image.
      localStorage.setItem("bg-image", JSON.stringify(image));
      HeroBgImage = image.url;
    } else {
      // No need to change the image.
      HeroBgImage = bgImage?.url;
    }
  } else {
    // It is a fresh user.
    let image = images[Math.floor(Math.random() * images.length)];

    // If there are more than 1 image, set the date to expire.
    if (images.length > 1) {
      image.date = new Date().toDateString();
    }
    localStorage.setItem("bg-image", JSON.stringify(image));
    HeroBgImage = image.url;
  }

  // Default case: If Image is still not set, set the first image.
  if (HeroBgImage === null || HeroBgImage === undefined) {
    HeroBgImage = images[0].url;
  }
}

const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var HeroBgImage;
var timerIsSet = false;
function Dashboard({ user }) {
  const getCurrentTime = () => {
    let date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  setCurrentBGImage();

  var defaultSwitchLogo = localStorage.getItem("switchLogo") === "true";
  const [switchLogo, setSwitchLogo] = useState(defaultSwitchLogo);
  const [cTime, setTime] = useState(getCurrentTime());
  const [backgroundImage, setBackgroundImage] = useState(HeroBgImage);

  useEffect(() => {
    if (switchLogo && !timerIsSet) {
      setInterval(() => {
        setTime(getCurrentTime());
      }, 1000);
      timerIsSet = true;
    }
  });
  const [hasHiddenAds, setHasHiddenAds] = useState(false);

  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  let verifyAdsVisibility = () => {
    let hiddenAdsTimeInMinute = 1;
    let currentTime = new Date();
    let adanalytics = JSON.parse(localStorage.getItem('adanalytics'));

    if (adanalytics !== null && adanalytics !== undefined) {
      if (addMinutes(new Date(adanalytics.eventTime), hiddenAdsTimeInMinute) < currentTime) {
        if (hasHiddenAds === true) {
          setHasHiddenAds(false);
        }
      } else if (hasHiddenAds === false) {
          setHasHiddenAds(true);
      }
    }
  };

  setInterval(() => {
    verifyAdsVisibility();
  }, 1000);

  callGuide();

  verifyAdsVisibility();

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

  // Set greetings.
  if (hour < 12) {
    if (user.name) {
      greet = "Good Morning, " + capitalizeFirst(user.name);
    } else {
      greet = "Good Morning";
    }
  } else if (hour >= 12 && hour <= 17) {
    if (user.name) {
      greet = "Good Afternoon, " + capitalizeFirst(user.name);
    } else {
      greet = "Good Afternoon";
    }
  } else if (hour >= 17 && hour <= 24) {
    if (user.name) {
      greet = "Good Evening, " + capitalizeFirst(user.name);
    } else {
      greet = "Good Evening";
    }
  }

  const hideAds = () => {
    let obj = {
      hidden: true,
      eventTime: new Date().toString()
    };
    localStorage.setItem('adanalytics', JSON.stringify(obj));
    setHasHiddenAds(true);
  };

  const getAdsHtml = () => {
    return (
  <div hidden={hasHiddenAds} className="advertisements-conatiner flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1fr_400px] grid-rows-5 w-full mt-2">
    <div onClick={hideAds} hidden={hasHiddenAds} className="rectangle-advertisement flex items-center justify-center lg:col-start-2 col-start-3 row-start-5 overflow-hidden">
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
    <div onClick={hideAds} hidden={hasHiddenAds} className="square-advertisement flex items-center justify-center col-start-4 lg:row-start-2 row-start-1 row-span-2 overflow-auto">
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
    <div onClick={hideAds} hidden={hasHiddenAds} className="square-advertisement flex items-center justify-center col-start-4 lg:row-start-4 row-start-3 row-span-2 overflow-auto">
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
    );
  };

  // Switch between logo and time.
  const onSwitchLogo = () => {
    localStorage.setItem("switchLogo", !switchLogo);
    setSwitchLogo(!switchLogo);
  };

  // Search google.
  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim() === "") return;
    let url = "https://www.google.com/search?q=" + query;
    window.open(url, "_self");
    setQuery("");
  };

  const onBackgroundChange = () => {
    resetImagesCollection();

    let image = images[Math.floor(Math.random() * images.length)];
    if (images.length > 1) {
      image.date = new Date().toDateString();
    }
    localStorage.setItem("bg-image", JSON.stringify(image));

    setBackgroundImage(image.url);
  };

  // Dashboard page HTML.
  return (
    <div
      className="dashboard-main-container main-container h-[100vh] flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar */}
      <nav className="header-container p-2 flex items-center space-x-3">
        <div className="left">
          <TabbingBuddies />
          {/* <Invite referralId={user.referralId} text="Invite Buddies" /> */}
        </div>
        <div className="right">
          <GlobalImpact />
          <UserImpact userId={user._id} />
          <QuickLinks />
        </div>
      </nav>
      <div className="center-content flex-1 flex flex-col mt-[80px] items-center text-white">
        <div className="flex logo-container">
          <div className="left"></div>
          <div className="branding">
            <img
              className="logo"
              hidden={switchLogo}
              src={Logo}
              alt="finger tapping on a heart symbol"
            />
            <div className="timer" hidden={!switchLogo}>
              {cTime}
            </div>
          </div>
          <div className="right">
            <img
              onClick={onSwitchLogo}
              src={require("../../assets/loop.png")}
              alt="Switch between time and logo"
            />
          </div>
        </div>

        <div className="text-center max-w-[700px] w-full flex flex-col items-center">
          <h2 className="greeting">{greet}.</h2>
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
            <button type="submit" className="search-icon">
              <BiSearch fontSize={24} className="search-svg" />
            </button>
          </form>
        </div>
        {hasHiddenAds === false && getAdsHtml()}
      </div>
      <nav className="footer-container p-2 flex items-center space-x-3">
        <Settings changeBackground={() => onBackgroundChange()} />
      </nav>
    </div>
  );
}

export default Dashboard;
