import { Component } from "react";
import { toast } from "react-toastify";

class InviteBuddies extends Component {

    constructor(props) {
        super(props);

        this.state = {
            group: props.group,
            isGroupInvitation: props.isGroupInvitation === 'true' ? true : false,
            inviteUrl: props.inviteUrl
        }
    }
    
    render() {
        return (
            <div className="modal-container second-level-modal invite-to-group-modal z-50 p-3 drop-shadow-lg rounded-md absolute left-25 top-5 mt-2 table w-[150px] md:w-[150px]">
                <div className="modal-title">
                    <span hidden={!this.state.isGroupInvitation}>Add members to '{this.state.group?.name}'</span>
                    <span hidden={this.state.isGroupInvitation}>Invite your buddies</span>
                </div>
                <div className="modal-body">
                    <h3>Invite via link</h3>
                    <p>Send this link to invite your friends</p>
                    <input readOnly type="text" value={this.state.inviteUrl} />
                    <div className="copy-link">
                        <button onClick={this.copyReferralLink.bind(this)}>Copy Link</button>
                    </div>
                </div>
            </div>
        );
    }

    copyReferralLink() {
          navigator.clipboard.writeText(this.state.inviteUrl);
          toast.success("Link copied to clipboard");
    };
}

export default InviteBuddies;