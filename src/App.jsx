import { useEffect, useReducer} from "react";
import { filterList } from "./utils/script";
import { URL } from "./utils/url";
import { postReducer, initialPost } from "./utils/postReducer";
import ListPost from "./components/ListPost";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";


function App(){

  const [myPosts, dispatch] = useReducer(postReducer, initialPost);
  const {posts, searchWord, filterKey, beginIndex, currentPage} = myPosts;
  const itemPerPage = 4;

  useEffect(() => {
    fetch(URL)
    .then(response => response.json())
    .then(posts =>  dispatch({type: "settingPost", passingValue: posts}))
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
  const handleClickFirst = () => dispatch({type:"goFirstPage"})

  const handleClickLast = () => {
    const lastIndex = (Math.ceil(res.length / itemPerPage));
    dispatch({type:"goLastPage", lastIndex: lastIndex, passingValue: itemPerPage })
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