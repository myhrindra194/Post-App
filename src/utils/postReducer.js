export const initialPost = {
    posts: [],
    searchWord: "",
    keyFilter: "0",
    beginIndex: 0,
    currentPage: 1,
}

export const postReducer = (state, action) => {
    switch(action.type){
      case "settingPost":
        return {
          ...state,
          posts: action.passingValue
        }
      case "searching":
        return {
          ...state,
          searchWord: action.passingValue,
          beginIndex : 0,
          currentPage: 1
        }
      case "filtering":
        return {
          ...state,
          filterKey: action.passingValue,
          beginIndex: 0,
          currentPage: 1
        }
      case "goFirstPage":
        return {
          ...state,
          beginIndex: 0,
          currentPage: 1
        }
      case "goLastPage":
        return {
          ...state,
          beginIndex: state.posts.length - action.passingValue,
          currentPage: action.lastIndex,
        }
      case "goNextPage":
        return {
          ...state,
          beginIndex: state.beginIndex + action.passingValue,
          currentPage: state.currentPage + 1
        }
        case "goPrevPage":
          return {
            ...state,
            beginIndex: state.beginIndex - action.passingValue,
            currentPage: state.currentPage - 1
          }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  