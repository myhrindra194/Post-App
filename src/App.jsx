import { useEffect, useReducer} from "react";
import { filterList } from "./utils/script";
import { URL } from "./utils/url";
import ListPost from "./components/ListPost";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";

const initialPost = {
  posts: [],
  searchWord: "",
  keyFilter: "0",
  beginIndex: 0,
  currentPage: 1,
}

const postReducer = (state, action) => {
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
        beginIndex: action.passingValue,
        currentPage: action.index,
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

function App(){

  const [myPosts, dispatch] = useReducer(postReducer, initialPost);
  const {posts, searchWord, filterKey, beginIndex, currentPage} = myPosts;
  const itemPerPage = 4;


  useEffect(() => {
    fetch(URL)
    .then(response => response.json())
    .then(posts =>  dispatch(
      {
        type: "settingPost",
        passingValue: posts
      }
    ))
    .catch(error => {console.error("Error while fetching data"), error})
  })

  const res = filterList(posts, searchWord, filterKey);
  const visiblePosts = res.slice(beginIndex, beginIndex + itemPerPage);

  const handleClickPrev = () => {
    if(beginIndex > 0)
      dispatch({type: "goPrevPage", passingValue :itemPerPage})
  }
  const handleClickNext = () => {
    if(beginIndex + itemPerPage < res.length){
      dispatch({type: "goNextPage", passingValue: itemPerPage})
    }
  }
  const handleClickFirst = () => dispatch({type:"goFirsPage"})

  const handleClickLast = () => {
    const lastIndex = Math.ceil(res.length / itemPerPage)
    dispatch({type:"goLastPage", passingValue: lastIndex, itemPerPage})
  }

  const handleChangeInput = (e) => dispatch({type:"searching", passingValue: e.target.value})
  
  const handleChangeFilterKey = (e) => dispatch({type: "filtering", passingValue: e.target.value})


  return (
    <>
      <SearchBar
        inputValue={searchWord}
        onChangeInput={(e) => handleChangeInput(e)}
        selectValue={filterKey}
        onChangeSelect={(e) => handleChangeFilterKey(e)}
      />
      {
        (posts.length === 0) ? 
          <Loader /> :
          <ListPost 
            name={visiblePosts}
            currentPage={currentPage}
            goFirst={handleClickFirst}
            goLast={handleClickLast}
            goBack={handleClickPrev}
            goNext={handleClickNext}
          />
      }
    </>
  )
}

export default App