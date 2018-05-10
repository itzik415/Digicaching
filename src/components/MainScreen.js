import React from "react";
import {Route, Switch} from "react-router-dom";

import Footer from "./Footer";
import ProfileScreen from "./ProfileScreen";
import MyMapComponent from "./Map";
import Collections from "./CollectionScreen";
import FriendsLookup from "./friends-lookup";
import SearchPage from "./SearchPage";
import LoginRedirect from "./LoginRedirect";

let MainScreen = () => {
  return(
    <div className='route-container'>
      <div className="content-container">
        <LoginRedirect/>
        <Switch>
          <Route exact path='/profile' component={ProfileScreen}/>
          <Route exact path='/(map)?' component={MyMapComponent} />
          <Route exact path='/collections' component={Collections} />
          <Route exact path='/friends-lookup' component={FriendsLookup} />
          <Route exact path='/search' component={SearchPage} />


          {/* <Route exact path='/main/something/:somthing render={ (props) => {
                    let profileUserId = props.match.params.userid
                    return <ProfilePage profileUserId={profileUserId}/>
                }} /> */}

        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default MainScreen;
