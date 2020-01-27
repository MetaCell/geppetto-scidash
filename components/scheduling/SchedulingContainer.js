import { connect } from "react-redux";
import Scheduling from "./Scheduling";

import { changePage } from "../../actions/creators/header";
import PagesService from "../../services/PagesService";
import { clearScheduler } from "../../actions/creators/scheduler";

const mapStateToProps = state => ({
  data: [
    ...state.models.data.filter(instance => instance.owner === state.user.userObject.username),
    ...state.testInstances.data.filter(instance => instance.owner === state.user.userObject.username)
  ],
  choosedTests: state.scheduler.choosedTests,
  choosedModels: state.scheduler.choosedModels,
  user: state.user,
});

const mapDispatchToProps = dispatch => {
  let pagesService = new PagesService();

  return {
    notLoggedRedirect: () => dispatch(changePage(pagesService.SCORES_PAGE, dispatch)),
    gotoScorePage: () => dispatch(changePage(pagesService.SCORES_PAGE, dispatch)),
    clearScheduler: () => dispatch(clearScheduler())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scheduling);