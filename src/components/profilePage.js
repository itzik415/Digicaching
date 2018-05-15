import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentUserProfile } from "../actions/profileActions";
import UpperProfilePage from "./UpperProfilePage";
import LeftProfilePage from "./LeftProfilePage";
import RightProfilePage from "./RightProfilePage";
import Footer from "./Footer";
import "../index.css";
import { withRouter } from "react-router-dom";

class ProfilePage extends Component {
  async componentDidMount() {
    let userPropsId = this.props.users[0].id;
    let userRouterId = this.props.match.params.id;
    let authToken = this.props.auth;

    fetch(`${process.env.REACT_APP_BACKEND}/api/users/${userRouterId}`, {
      headers: {
        authorization: "Bearer " + authToken
      }
    }).then(res => {
      res.json().then(data => {
        this.props.getCurrentProfile(data);
      });
    });
  }

  render() {
    let profileContent;
    if (!this.props.users) {
      profileContent = (
        <div>
          <h3>...Loading...</h3>
          <img
            className="loading-photo"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            alt="...loading..."
          />
        </div>
      );
    } else {
      let currentUser = this.props.users[0];
      profileContent = (
        <div className="profile-page">
          <UpperProfilePage user={currentUser} />
          <div className="left-and-right">
            <LeftProfilePage user={currentUser} />
            <RightProfilePage userId={currentUser.id} />
          </div>
          <Footer />
        </div>
      );
    }
    return profileContent;
  }
}

let mapStateToProps = ({ users, activeUserToken }) => {
  return { users, auth: activeUserToken };
};

let mapDispatchToProps = dispatch => {
  let getCurrentProfile = user => {
    dispatch(getCurrentUserProfile(user));
  };
  return { getCurrentProfile };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
);
