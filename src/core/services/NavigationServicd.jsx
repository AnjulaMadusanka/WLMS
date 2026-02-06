let _navigator;

const setTopLevelNavigator = (navigatorRef) => {
    _navigator = navigatorRef;
  };
  // { state: { forumId: _.get(item, 'id', ''), forum: item } }
const navigateTo = (path,obj={})=>{
   _navigator.current(path,obj);
}

const goBack = ()=>{

}

export { navigateTo, setTopLevelNavigator, goBack };