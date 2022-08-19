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
// import GoogleAds from "./GoogleAds";
import QuickLinks from "./DashboardComponents/QuickLinks";

var images = [
  {
    id: 1,
    url: require("../assets/hero-bg.jpg"),
    date: new Date().toDateString()
  },
  {
    id: 2,
    url: require("../assets/hero-bg-2.webp"),
    date: new Date().toDateString()
  },
  {
    id: 3,
    url: require("../assets/hero-bg-3.webp"),
    date: new Date().toDateString()
  },
  {
    id: 4,
    url: require("../assets/hero-bg-4.webp"),
    date: new Date().toDateString()
  },
  {
    id: 5,
    url: require("../assets/hero-bg-5.webp"),
    date: new Date().toDateString()
  },
  {
    id: 6,
    url: require("../assets/hero-bg-6.webp"),
    date: new Date().toDateString()
  },
  {
    id: 7,
    url: require("../assets/hero-bg-7.webp"),
    date: new Date().toDateString()
  },
  {
    id: 8,
    url: require("../assets/hero-bg-8.webp"),
    date: new Date().toDateString()
  },
  {
    id: 9,
    url: require("../assets/hero-bg-9.webp"),
    date: new Date().toDateString()
  },
  {
    id: 10,
    url: require("../assets/hero-bg-10.webp"),
    date: new Date().toDateString()
  },
  {
    id: 11,
    url: require("../assets/hero-bg-11.webp"),
    date: new Date().toDateString()
  },
  {
    id: 12,
    url: require("../assets/hero-bg-12.webp"),
    date: new Date().toDateString()
  },
  {
    id: 13,
    url: require("../assets/hero-bg-13.webp"),
    date: new Date().toDateString()
  },
  {
    id: 14,
    url: require("../assets/hero-bg-14.webp"),
    date: new Date().toDateString()
  },
  {
    id: 15,
    url: require("../assets/hero-bg-15.webp"),
    date: new Date().toDateString()
  },
  {
    id: 16,
    url: require("../assets/hero-bg-16.webp"),
    date: new Date().toDateString()
  },
  {
    id: 17,
    url: require("../assets/hero-bg-17.webp"),
    date: new Date().toDateString()
  },
  {
    id: 18,
    url: require("../assets/hero-bg-18.webp"),
    date: new Date().toDateString()
  },
  {
    id: 19,
    url: require("../assets/hero-bg-19.webp"),
    date: new Date().toDateString()
  },
  {
    id: 20,
    url: require("../assets/hero-bg-20.webp"),
    date: new Date().toDateString()
  },
  {
    id: 21,
    url: require("../assets/hero-bg-21.webp"),
    date: new Date().toDateString()
  },
  {
    id: 22,
    url: require("../assets/hero-bg-22.webp"),
    date: new Date().toDateString()
  },
  {
    id: 23,
    url: require("../assets/hero-bg-23.webp"),
    date: new Date().toDateString()
  },
  {
    id: 24,
    url: require("../assets/hero-bg-24.webp"),
    date: new Date().toDateString()
  },
  {
    id: 25,
    url: require("../assets/hero-bg-25.webp"),
    date: new Date().toDateString()
  },
  {
    id: 26,
    url: require("../assets/hero-bg-26.webp"),
    date: new Date().toDateString()
  },
  {
    id: 27,
    url: require("../assets/hero-bg-27.webp"),
    date: new Date().toDateString()
  },
  {
    id: 28,
    url: require("../assets/hero-bg-28.webp"),
    date: new Date().toDateString()
  },
  {
    id: 29,
    url: require("../assets/hero-bg-29.webp"),
    date: new Date().toDateString()
  },
  {
    id: 30,
    url: require("../assets/hero-bg-30.webp"),
    date: new Date().toDateString()
  },
  {
    id: 31,
    url: require("../assets/hero-bg-31.webp"),
    date: new Date().toDateString()
  },
  {
    id: 32,
    url: require("../assets/hero-bg-32.webp"),
    date: new Date().toDateString()
  },
  {
    id: 33,
    url: require("../assets/hero-bg-33.webp"),
    date: new Date().toDateString()
  },
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

const capitalizeFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var HeroBgImage;
var timerIsSet = false;
function Dashboard({ user }) {

  const getCurrentTime = () => {
    let date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  var defaultSwitchLogo = localStorage.getItem('switchLogo') === 'true';
  const [switchLogo, setSwitchLogo] = useState(defaultSwitchLogo);
  const [cTime, setTime] = useState(getCurrentTime());

  useEffect(() => {
    if (switchLogo && !timerIsSet) {
      setInterval(() => {
        setTime(getCurrentTime());
      }, 1000);
      timerIsSet = true;
    }
  });
  // const [hasHiddenAds, setHasHiddenAds] = useState(false);

  // function addMinutes(date, minutes) {
  //   return new Date(date.getTime() + minutes * 60000);
  // }

  // let verifyAdsVisibility = () => {
  //   let hiddenAdsTimeInMinute = 1;
  //   let currentTime = new Date();
  //   let adanalytics = JSON.parse(localStorage.getItem('adanalytics'));

  //   if (adanalytics !== null && adanalytics !== undefined) {
  //     if (addMinutes(new Date(adanalytics.eventTime), hiddenAdsTimeInMinute) < currentTime) {
  //       if (hasHiddenAds === true) {
  //         setHasHiddenAds(false);
  //       }
  //     } else if (hasHiddenAds === false) {
  //         setHasHiddenAds(true);
  //     }
  //   }
  // };

  // setInterval(() => {
  //   verifyAdsVisibility();
  // }, 1000);

  callGuide();
  setCurrentBGImage();
  // verifyAdsVisibility();

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

  // const hideAds = () => {
  //   let obj = {
  //     hidden: true,
  //     eventTime: new Date().toString()
  //   };
  //   localStorage.setItem('adanalytics', JSON.stringify(obj));
  //   // setHasHiddenAds(true);
  // };

  // const getAdsHtml = () => {
  //   return (
  // <div hidden={hasHiddenAds} className="advertisements-conatiner flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1fr_400px] grid-rows-5 w-full mt-2">
  //   <div onClick={hideAds} hidden={hasHiddenAds} className="rectangle-advertisement flex items-center justify-center col-start-1 lg:col-start-2 row-start-5 overflow-hidden">
  //     <GoogleAds
  //       clientId="ca-app-pub-3940256099942544"
  //       slotId="2934735716"
  //       smw="234px"
  //       smh="60px"
  //       mdw="468px"
  //       mdh="60px"
  //       lgw="720px"
  //       lgh="90px"
  //     />
  //   </div>
  //   <div onClick={hideAds} hidden={hasHiddenAds} className="square-advertisement flex items-center justify-center col-start-1 lg:col-start-3 row-start-2 row-span-2 overflow-auto">
  //     {user.impactLevel > 2 && (
  //       <GoogleAds
  //         clientId="ca-app-pub-3940256099942544"
  //         slotId="3419835294"
  //         smw="125px"
  //         smh="125px"
  //         mdw="200px"
  //         mdh="200px"
  //         lgw="200px"
  //         lgh="200px"
  //       />
  //     )}
  //   </div>
  //   <div onClick={hideAds} hidden={hasHiddenAds} className="square-advertisement flex items-center justify-center col-start-1 lg:col-start-3 row-start-4 row-span-2 overflow-auto">
  //     {user.impactLevel > 1 && (
  //       <GoogleAds
  //         clientId="ca-app-pub-3940256099942544"
  //         slotId="6300978111"
  //         smw="125px"
  //         smh="125px"
  //         mdw="200px"
  //         mdh="200px"
  //         lgw="200px"
  //         lgh="200px"
  //       />
  //     )}
  //   </div>
  // </div>
  //   );
  // };

  const onSwitchLogo = () => {
    localStorage.setItem('switchLogo', !switchLogo);
    setSwitchLogo(!switchLogo);
  }

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim() === "") return;
    let url = "https://www.google.com/search?q=" + query;
    window.open(url, "_self");
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
        <div className="left">
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
            <div 
              className="timer"
              hidden={!switchLogo}>
              {cTime}
            </div>
          </div>
          <div className="right">
            <img onClick={onSwitchLogo} src={require('../assets/loop.png')} alt="Switch between time and logo" />
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
        {/* {hasHiddenAds === false && getAdsHtml()} */}
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
