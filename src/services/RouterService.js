import { NavigationActions } from 'react-navigation';

let _router;

function setTopLevelRouter(routerRef) {
  _router = routerRef;
}

function navigate(routeName, params) {
  _router.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export default {
  navigate,
  setTopLevelRouter,
};