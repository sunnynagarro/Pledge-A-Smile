import React, { Component } from "react";

// Icons
import { BsPlusLg } from "react-icons/bs";
// import { BsGear } from "react-icons/bs";

// import Backgrounds from "./Backgrounds";

class Shortcuts extends Component {

    constructor(props) {
        super(props);

        // References to specific tags.
        // this.wrapperRef = React.createRef();

        // This binding is necessary to make `this` work in the callback
        // this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
            currentUser: JSON.parse(localStorage.getItem("user")) || {},
            isOpen: false,
            activeClass: 'Backgrounds'
        }
    }

    render() {
        return (
            <div className="shortcuts-container">
                <ul className="shortcuts">
                    <li className="shortcut-item">
                        <div className="shortcut-icon">
                            <img src={require("../../../assets/download.png")} alt="Shortcut favicon" />
                        </div>
                        <div className="shortcut-title">
                            <small>Home</small>
                        </div>
                    </li>
                    <li className="shortcut-item">
                        <div className="shortcut-icon">
                            <img src={require("../../../assets/download.png")} alt="Shortcut favicon" />
                        </div>
                        <div className="shortcut-title">
                            <small>Home</small>
                        </div>
                    </li>
                    <li className="shortcut-item">
                        <div className="shortcut-icon">
                            <img src={require("../../../assets/download.png")} alt="Shortcut favicon" />
                        </div>
                        <div className="shortcut-title">
                            <small>Home</small>
                        </div>
                    </li>
                    <li className="shortcut-item add-shortcut-item">
                        <div className="shortcut-icon">
                            <BsPlusLg />
                        </div>
                        <div className="shortcut-title">
                            <small>Add Shortcut</small>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }

    // // Add Edit modal.
    // addeditModal() {
    //     return (
    //         <div
    //             ref={this.wrapperRef}
    //             className="settings-modal modal"
    //         >
    //             <ImArrowDown className="bottom-arrow-left" />
    //             <nav className="nav">
    //                 <div className="nav-list">
    //                     <div className={"nav-item " + (this.state.activeClass === "Backgrounds" ? "active" : null)} onClick={() => this.setState({activeClass: "Backgrounds"})}>Backgrounds</div>
    //                     <div className={"nav-item " + (this.state.activeClass === "MyProfile" ? "active" : null)} onClick={() => this.navigateToProfile()}>My Profile</div>
    //                 </div>
    //             </nav>
    //             <div className="view-container">
    //                 <div className="view">
    //                     {this.state.activeClass === "Backgrounds" && <Backgrounds changeBackground={() => this.onBackgroundImageChange()} />}
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    // Navigate to profile page.
    // navigateToProfile() {
    //     window.open("/profile");
    // }
}

export default Shortcuts;
