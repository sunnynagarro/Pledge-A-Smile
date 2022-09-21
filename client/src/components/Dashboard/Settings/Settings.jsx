import React, { Component } from "react";

// Icons
import { ImArrowDown } from "react-icons/im";
import { BsGear } from "react-icons/bs";

import Backgrounds from "./Backgrounds";

class Settings extends Component {

    constructor(props) {
        super(props);

        // References to specific tags.
        this.wrapperRef = React.createRef();

        // This binding is necessary to make `this` work in the callback
        this.handleClickOutside = this.handleClickOutside.bind(this);
        
        this.state = {
            currentUser: JSON.parse(localStorage.getItem("user")) || {},
            isOpen: false,
            activeClass: 'Backgrounds'
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState(old => ({isOpen: !old.isOpen}))} className="settings-button p-3 rounded-full bg-white">
                    <BsGear fontSize={28} height="22" width="22" />
                </button>
                { this.state.isOpen && this.settingsModal() }
            </div>
        );
    }

    // Settings modal.
    settingsModal() {
        return (
            <div
                ref={this.wrapperRef}
                className="settings-modal modal"
            >
                <ImArrowDown className="bottom-arrow-left" />
                <nav className="nav">
                    <div className="nav-list">
                        <div className={"nav-item " + (this.state.activeClass === "Backgrounds" ? "active" : null)} onClick={() => this.setState({activeClass: "Backgrounds"})}>Backgrounds</div>
                        <div className={"nav-item " + (this.state.activeClass === "MyProfile" ? "active" : null)} onClick={() => this.navigateToProfile()}>My Profile</div>
                    </div>
                </nav>
                <div className="view-container">
                    <div className="view">
                        {this.state.activeClass === "Backgrounds" && <Backgrounds changeBackground={() => this.onBackgroundImageChange()} />}
                    </div>
                </div>
            </div>
        );
    };

    // Navigate to profile page.
    navigateToProfile() {
        window.open("/profile");
    }

    // On outside click, close the modal.
    handleClickOutside(event) {
        if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target) && !event.target.className.toString().includes("settings-button")) {
            this.setState({ isOpen: false });
        }
    }

    onBackgroundImageChange() {
        this.props.changeBackground();
    }
}

export default Settings;
