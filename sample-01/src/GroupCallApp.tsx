import {
  Switch,
  Route,
  useRouteMatch, Redirect,
} from 'react-router-dom';

import GroupCallLanding from './components/pages/GroupCallLanding';
import GroupCallFullScreen from './components/pages/GroupCallFullScreen';

const GroupCallApp = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/full-screen`} component={GroupCallFullScreen} />
      <Redirect to={`${path}/full-screen`} />
      {/*<Route exact path={path} component={GroupCallLanding} />*/}
    </Switch>
  );

};

export default GroupCallApp;
