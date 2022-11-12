import React, { useEffect } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import * as actions from "../actions/actions";
import HackNews from "./HackNews";
import Story from "./Story.jsx";
import { getNewStories } from "../services/hacker-news-api";
import Header from "./Header";
import Footer from "./Footer";

const mapStateToProps = (state) => {
  return { stories: state.stories };
};

const actionCreators = {
  addLatestStories: actions.addLatestStories,
  addStory: actions.addStory,
  setBranchStatus: actions.setBranchStatus,
};

const App = ({ addLatestStories, addStory, setBranchStatus }) => {
  useEffect(() => {
    const getStories = async () => {
      const latestStoriesIDs = await getNewStories();
      addLatestStories({ latestStoriesIDs: latestStoriesIDs.slice(0, 100) });
      const data = JSON.parse(sessionStorage.getItem("branchesStatus"));
      const commentBranch = data ?? {};
      setBranchStatus({ commentBranch });
    };
    getStories().then(() => {});
  }, [addLatestStories, addStory, setBranchStatus]);

  const main = (
    <Switch>
      <Route path="/" exact component={HackNews} />
      <Route path="/:id" component={Story} />
    </Switch>
  );

  return (
    <Router basename="/">
      <Header />
      {main}
      <Footer />
    </Router>
  );
};

export default connect(mapStateToProps, actionCreators)(App);
