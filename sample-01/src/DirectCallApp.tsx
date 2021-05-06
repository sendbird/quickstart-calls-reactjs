import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import DirectCallLanding from "./components/pages/DirectCallLanding";
import DirectCallFullScreen from "./components/pages/DirectCallFullScreen";

const DirectCallApp = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/full-screen`} component={DirectCallFullScreen} />
            <Redirect to={`${path}/full-screen`} />
            {/*<Route exact path={path} component={DirectCallLanding} />*/}
        </Switch>
    );
}

export default DirectCallApp;
