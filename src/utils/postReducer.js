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
          posts: action.payload
        }
      case "searching":
        return {
          ...state,
          searchWord: action.payload,
          beginIndex : 0,
          currentPage: 1
        }
      case "filtering":
        return {
          ...state,
          filterKey: action.payload,
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
          beginIndex: state.posts.length - action.payload,
          currentPage: action.lastIndex,
        }
      case "goNextPage":
        return {
          ...state,
          beginIndex: state.beginIndex + action.payload,
          currentPage: state.currentPage + 1
        }
        case "goPrevPage":
          return {
            ...state,
            beginIndex: state.beginIndex - action.payload,
            currentPage: state.currentPage - 1
          }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  