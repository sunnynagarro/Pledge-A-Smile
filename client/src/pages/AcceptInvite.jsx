import { Component } from "react";
import { useParams } from "react-router-dom";

// logo
import Logo from "../assets/logo-dashboard.png";

// Api actions
import { getInvitationAdmin, acceptGroupInvitation } from "../actions/groupService";

// Toast
import { toast } from "react-toastify";

function withParams(Component) {
    return props => <AcceptInvite {...props} params={useParams()} />;
  }

const HeroBgImage = require('../assets/background-images/nature/hero-bg-27.webp');

class AcceptInvite extends Component {

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.accept = this.accept.bind(this);
        this.cancel = this.cancel.bind(this);

        let dummyGroup = {
            userName: 'A friend',
            groupName: '',
            userImpact: '...'
        }

        this.state = {
            currentUser: JSON.parse(localStorage.getItem("user")) || null,
            addToChrome: 'Add to Chrome',
            groupUser: dummyGroup
        }
    }

    componentDidMount() {
        this.getGroup();
    }

    render() {
        return (
            <div
                className="main-container h-[100vh] flex flex-col"
                style={{
                    background: `url(${HeroBgImage})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="modal-container accept-invite-modal z-50 p-3 drop-shadow-lg rounded-md absolute left-25 top-5 mt-2 table w-[150px] md:w-[150px]">
                    <div className="modal-header">
                        <img className="logo" src={Logo} alt="Good Tab Logo" />
                        <h3 className="green">Hello buddy! 👋</h3>
                        <h3><span className="green">{this.state.groupUser.userName}</span> invited you to join their <span className="green">{this.state.groupUser.groupName}</span> group.</h3>
                    </div>
                    <div className="modal-body">
                        { this.state.currentUser !== null && this.loggedInUserBody()}
                        { this.state.currentUser === null && this.nonMemberBody()}
                    </div>
                    <div className="modal-footer flex">
                        { this.state.currentUser !== null &&  this.loggedInUserFooter()}
                        { this.state.currentUser === null &&  this.nonMemberFooter()}
                    </div>
                </div>
            </div>
        );
    }

    async getGroup() {
        let res = await getInvitationAdmin(this.props.params.invitationId);
        this.setState({
            groupUser: res.group
        });
    }

    loggedInUserBody() {
        return (
            <div>
                <p>Groups are a fun way to keep up with your friends' progress and see the impact of your community.</p>
                <div className="bold-text">Do you want to accept the group invite?</div>
            </div>
        );
    }

    loggedInUserFooter() {
        return (
            <div className="half-wide flex">
                <button onClick={this.cancel} className="failure-button">No</button>
                <button onClick={this.accept} className="success-button">Yes</button>
            </div>
        );
    }

    // Non member body.
    nonMemberBody() {
        return (
            <div className="full-wide">
                <p>Good Tab is a non-profit chrome extension that gives 1 plate of food for every 15 tabs you open. We've already saved thousands of plates around the world!</p>
                <p className="bold-text">{this.state.groupUser.userName} has already saved {this.state.groupUser.userImpact} plates</p>
                <p className="bold-text">Amazing, right?</p>
                <b>Start saving plates with {this.state.groupUser.userName}.</b>
            </div>
        );
    }

    // Non member footer.
    nonMemberFooter() {
        let isChrome = false;
        if (navigator.userAgent.indexOf("Chrome") !== -1) isChrome = true;
        return (
            <div className="full-wide">
                { isChrome && <button onClick={this.installExtension.bind(this)} className="failure-button">{this.state.addToChrome}</button> }
                { !isChrome && <p className="text-yellow">This plugin is only for Google Chrome, please open Chrome and enter this link again.</p> }
            </div>
        );
    }

    installExtension() {
        if (this.state.addToChrome.toLowerCase() === 'add to chrome') {
            this.setState({
                addToChrome: 'Refresh'
            });
            window.open('https://chrome.google.com/webstore/detail/good-tab/fejhcjlnmfnjppjpoemahikkffpmpfji');
        } else {
            window.location.reload();
        }
    }

    // Accept the invitation.
    async accept() {
        let res = await acceptGroupInvitation(this.props?.params?.invitationId, this.state.currentUser?._id);
        if (res.success) {
            toast.success("You have accepted the invite.");
        }
        setTimeout(() => {
            window.open('https://tab.pledgeasmile.com', '_self');
        }, 2000);
    }

    // Cancel invitation.
    cancel() {
        toast.success("You have cancelled the invite.");
        setTimeout(() => {
            window.open('https://tab.pledgeasmile.com', '_self');
        }, 2000);
    }
}

export default withParams(AcceptInvite);