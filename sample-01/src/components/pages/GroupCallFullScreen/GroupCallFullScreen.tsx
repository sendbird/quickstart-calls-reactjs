import PrivateRoute from 'components/atoms/PrivateRoute';
import {
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import GroupCallMain from '../GroupCallMain';


const GroupCallFullScreen = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <PrivateRoute exact path={path} component={GroupCallMain} />
    </Switch>
  );

};

export default GroupCallFullScreen;
