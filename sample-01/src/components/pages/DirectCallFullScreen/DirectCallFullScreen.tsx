import PrivateRoute from 'components/atoms/PrivateRoute';
import {
    Switch,
    useRouteMatch,
} from 'react-router-dom';
import DirectCallMain from "../DirectCallMain";


const DirectCallFullScreen = () => {
  const { path } = useRouteMatch();

  return (
      <Switch>
          <PrivateRoute exact path={path} component={DirectCallMain} />
      </Switch>
  );

};

export default DirectCallFullScreen;
