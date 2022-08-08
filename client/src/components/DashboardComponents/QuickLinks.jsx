import React, { useState, useEffect, useRef } from "react";

import { TbGridDots } from 'react-icons/tb';
import { ImArrowUp } from 'react-icons/im';

function QuickLinks() {
    const modalRef = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [active, setActive] = useState("Google");
    const [activeClass, setActiveClass] = useState("Google");

    const googleApps = [
        {
            text: 'Gmail',
            link: 'https://mail.google.com',
            imgUrl: require('../../assets/quick-links-icons/Gmail.png'),
        },
        {
            text: 'Drive',
            link: 'https://drive.google.com',
            imgUrl: require('../../assets/quick-links-icons/Drive.png'),
        },
        {
            text: 'Calendar',
            link: 'https://calendar.google.com',
            imgUrl: require('../../assets/quick-links-icons/Calendar.png'),
        },
        {
            text: 'Docs',
            link: 'https://docs.google.com/document',
            imgUrl: require('../../assets/quick-links-icons/Docs.png'),
        },
        {
            text: 'Sheets',
            link: 'https://sheets.google.com',
            imgUrl: require('../../assets/quick-links-icons/Sheets.png'),
        },
        {
            text: 'Slides',
            link: 'https://slides.google.com',
            imgUrl: require('../../assets/quick-links-icons/Slides.png'),
        },
        {
            text: 'Youtube',
            link: 'https://www.youtube.com',
            imgUrl: require('../../assets/quick-links-icons/Youtube.png'),
        },
        {
            text: 'Photos',
            link: 'https://photos.google.com',
            imgUrl: require('../../assets/quick-links-icons/Photos.png'),
        },
        {
            text: 'Maps',
            link: 'https://maps.google.com/maps',
            imgUrl: require('../../assets/quick-links-icons/Maps.png'),
        },
        {
            text: 'Meet',
            link: 'https://meet.google.com',
            imgUrl: require('../../assets/quick-links-icons/Meet.png'),
        },
        {
            text: 'Scholar',
            link: 'https://scholar.google.com',
            imgUrl: require('../../assets/quick-links-icons/Scholar.png'),
        },
        {
            text: 'Classroom',
            link: 'https://classroom.google.com',
            imgUrl: require('../../assets/quick-links-icons/Classroom.png'),
        },
    ];
    const cloudStorage = [
        {
            text: 'Notes',
            link: 'https://www.icloud.com/notes',
            imgUrl: require('../../assets/quick-links-icons/Notes.png'),
        },
        {
            text: 'iCloud Drive',
            link: 'https://www.icloud.com/iclouddrive',
            imgUrl: require('../../assets/quick-links-icons/iCloud.png'),
        },
        {
            text: 'Calendar',
            link: 'https://www.icloud.com/calendar',
            imgUrl: require('../../assets/quick-links-icons/AppleCalendar.png'),
        },
        {
            text: 'Pages',
            link: 'https://www.icloud.com/pages',
            imgUrl: require('../../assets/quick-links-icons/Pages.png'),
        },
        {
            text: 'Numbers',
            link: 'https://www.icloud.com/numbers',
            imgUrl: require('../../assets/quick-links-icons/Numbers.png'),
        },
        {
            text: 'Keynote',
            link: 'https://www.icloud.com/keynote',
            imgUrl: require('../../assets/quick-links-icons/Keynote.png'),
        },
        {
            text: 'Outlook',
            link: 'https://outlook.live.com',
            imgUrl: require('../../assets/quick-links-icons/Outlook.png'),
        },
        {
            text: 'OneDrive',
            link: 'https://onedrive.live.com',
            imgUrl: require('../../assets/quick-links-icons/OneDrive.png'),
        },
        {
            text: 'OneNote',
            link: 'https://www.onenote.com/notebooks',
            imgUrl: require('../../assets/quick-links-icons/Onenote.png'),
        },
        {
            text: 'Word',
            link: 'https://www.office.com/launch/word',
            imgUrl: require('../../assets/quick-links-icons/Word.png'),
        },
        {
            text: 'Excel',
            link: 'https://www.office.com/launch/excel',
            imgUrl: require('../../assets/quick-links-icons/Excel.png'),
        },
        {
            text: 'PowerPoint',
            link: 'https://www.office.com/launch/powerpoint',
            imgUrl: require('../../assets/quick-links-icons/Powerpoint.png'),
        },
    ];
    const streaming = [
        {
            text: 'Netfix',
            link: 'https://www.netflix.com',
            imgUrl: require('../../assets/quick-links-icons/Netflix.png'),
        },
        {
            text: 'IMDb',
            link: 'https://www.imdb.com',
            imgUrl: require('../../assets/quick-links-icons/IMDb.png'),
        },
        {
            text: 'SonyLIV',
            link: 'https://www.sonyliv.com',
            imgUrl: require('../../assets/quick-links-icons/Sonyliv.png'),
        },
        {
            text: 'Twitch',
            link: 'https://www.twitch.tv',
            imgUrl: require('../../assets/quick-links-icons/Twitch.png'),
        },
        {
            text: 'HBO Max',
            link: 'https://www.hbomax.com',
            imgUrl: require('../../assets/quick-links-icons/HBO.png'),
        },
        {
            text: 'Crunchyroll',
            link: 'https://www.crunchyroll.com',
            imgUrl: require('../../assets/quick-links-icons/Crunchyroll.png'),
        },
        {
            text: 'Prime Video',
            link: 'https://www.primevideo.com',
            imgUrl: require('../../assets/quick-links-icons/PrimeVideo.png'),
        },
        {
            text: 'Hulu',
            link: 'https://www.hulu.com',
            imgUrl: require('../../assets/quick-links-icons/Hulu.png'),
        },
        {
            text: 'Disney+',
            link: 'https://www.disneyplus.com',
            imgUrl: require('../../assets/quick-links-icons/Disney.png'),
        },
        {
            text: 'Voot',
            link: 'https://www.voot.com',
            imgUrl: require('../../assets/quick-links-icons/Voot.png'),
        },
        {
            text: 'Spotify',
            link: 'https://open.spotify.com',
            imgUrl: require('../../assets/quick-links-icons/Spotify.png'),
        },
        {
            text: 'Hotstar',
            link: 'https://www.hotstar.com',
            imgUrl: require('../../assets/quick-links-icons/Hotstar.png'),
        },
    ];
    const socialNetworks = [
        {
            text: 'Facebook',
            link: 'https://www.facebook.com',
            imgUrl: require('../../assets/quick-links-icons/Facebook.png'),
        },
        {
            text: 'WhatsApp',
            link: 'https://web.whatsapp.com',
            imgUrl: require('../../assets/quick-links-icons/Whatsapp.png'),
        },
        {
            text: 'Instagram',
            link: 'https://instagram.com',
            imgUrl: require('../../assets/quick-links-icons/Instagram.png'),
        },
        {
            text: 'Pinterest',
            link: 'https://www.pinterest.com',
            imgUrl: require('../../assets/quick-links-icons/Pinterest.png'),
        },
        {
            text: 'Discord',
            link: 'https://discord.com',
            imgUrl: require('../../assets/quick-links-icons/Discord.png'),
        },
        {
            text: 'Twitter',
            link: 'https://twitter.com',
            imgUrl: require('../../assets/quick-links-icons/Twitter.png'),
        },
        {
            text: 'Reddit',
            link: 'https://www.reddit.com',
            imgUrl: require('../../assets/quick-links-icons/Reddit.png'),
        },
        {
            text: 'Telegram',
            link: 'https://webk.telegram.org',
            imgUrl: require('../../assets/quick-links-icons/Telegram.png'),
        },
        {
            text: 'LinkedIn',
            link: 'https://www.linkedin.com',
            imgUrl: require('../../assets/quick-links-icons/Linkedin.png'),
        },
        {
            text: 'TikTok',
            link: 'https://www.tiktok.com',
            imgUrl: require('../../assets/quick-links-icons/Tiktok.png'),
        },
        {
            text: 'WeChat',
            link: 'https://www.wechat.com',
            imgUrl: require('../../assets/quick-links-icons/Wechat.png'),
        },
        {
            text: 'Line',
            link: 'https://timeline.line.me',
            imgUrl: require('../../assets/quick-links-icons/Line.png'),
        },
    ];

    useEffect(() => {
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
      }, [isModalOpen]);

    const toggleModal = () => {
        if (isModalOpen) {
            setIsModalOpen(false);
        } else {
            setIsModalOpen(true);
        }
    };

    const appsList = (apps) => {
        return (
            apps.map(app => {
                return (
                    <li className="apps-list-item">
                        <a href={app.link} target="_top" className="apps-list-anchor">
                            <img src={app.imgUrl} alt={app.text} loading="lazy" className="apps-anchor-image" />
                            <span className="apps-anchor-title">{app.text}</span>
                        </a>
                    </li>
                );
            })
        )
    }

    const appsListHtml = (appsType) => {
        if (appsType.toString().toLowerCase() === 'google') {
            return appsList(googleApps);
        } else if (appsType.toString().toLowerCase() === 'cloudstorage') {
            return appsList(cloudStorage);
        } else if (appsType.toString().toLowerCase() === 'streaming') {
            return appsList(streaming);
        } else if (appsType.toString().toLowerCase() === 'socialnetworks') {
            return appsList(socialNetworks);
        }
    };

    const googleAppsList = () => {
        return (
            <ul className="apps-grid-list">
                {appsListHtml("Google")}
            </ul>
        )
    };

    const cloudAppsList = () => {
        return (
            <ul className="apps-grid-list">
                {appsListHtml("CloudStorage")}
            </ul>
        )
    };
    
    const streamingAppsList = () => {
        return (
            <ul className="apps-grid-list">
                {appsListHtml("Streaming")}
            </ul>
        )
    };

    const socialAppsList = () => {
        return (
            <ul className="apps-grid-list">
                {appsListHtml("SocialNetworks")}
            </ul>
        )
    };

    const onGoogleNavClick = () => {
        setActiveClass("Google");
        setActive("Google");
    };

    const onCloudStorageClick = () => {
        setActiveClass("CloudStorage");
        setActive("CloudStorage");
    };

    const onStreamingClick = () => {
        setActiveClass("Streaming");
        setActive("Streaming");
    };

    const onSocialNetworksClick = () => {
        setActiveClass("SocialNetworks");
        setActive("SocialNetworks");
    };
    
    const ModalElement = () => {
        return (
            <div ref={modalRef} className="static-quick-links modal">
                <ImArrowUp className="top-arrow-right" />
                <nav className="nav">
                    <div className="nav-list">
                        <div className={"nav-item " + (activeClass === "Google" ? "active" : null)} onClick={onGoogleNavClick}>Google</div>
                        <div className={"nav-item " + (activeClass === "CloudStorage" ? "active" : null)} onClick={onCloudStorageClick}>Cloud Storage</div>
                        <div className={"nav-item " + (activeClass === "Streaming" ? "active" : null)} onClick={onStreamingClick}>Streaming</div>
                        <div className={"nav-item " + (activeClass === "SocialNetworks" ? "active" : null)} onClick={onSocialNetworksClick}>Social Networks</div>
                    </div>
                </nav>
                <div className="view-container">
                    <div className="view">
                        {active === "Google" && googleAppsList()}
                        {active === "CloudStorage" && cloudAppsList()}
                        {active === "Streaming" && streamingAppsList()}
                        {active === "SocialNetworks" && socialAppsList()}
                    </div>
                </div>
            </div>
        );
    };

    return <div id="quickLinks" className="relative">
        <button
            className="header-button header-quick-links-icon flex items-center space-x-1 rounded-full bg-white"
            onClick={toggleModal}
        >
            <TbGridDots fontSize={32} />
        </button>
        {isModalOpen && ModalElement()}
    </div>
}

export default QuickLinks;