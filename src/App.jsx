import { useEffect, useState } from "react";
import { filterList } from "./utils/script";
import { URL } from "./utils/url";
import ListPost from "./components/ListPost";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";


function App(){
   
  const [posts, setPosts] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [filterKey, setFilterKey] = useState("0");
  
  useEffect(() => {
    fetch(URL)
    .then(response => response.json())
    .then(posts =>  setPosts(posts))
    .catch(error => {console.error("Error while fetching data"), error})
  })

  const res = filterList(posts, searchWord, filterKey);
  const [currentPage, setCurrentPage] = useState(1);
  const [beginIndex, setBeginIndex] = useState(0);
  const itemPerPage = 4;

  const visiblePosts = res.slice(beginIndex, beginIndex + itemPerPage);

  const handleClickPrev = () => {
    if(beginIndex > 0){
      setBeginIndex(beginIndex - itemPerPage);
      setCurrentPage(currentPage - 1);
    }
  }
  const handleClickNext = () => {
    if(beginIndex + itemPerPage < res.length){
      setBeginIndex(beginIndex + itemPerPage);
      setCurrentPage(currentPage + 1);
    }
  }

  const handleChangeInput = (e) => {
    setSearchWord(e.target.value);
    setBeginIndex(0);
    setCurrentPage(1)
  }
  
  const handleChangeFilterKey = (e) => {
    setFilterKey(e.target.value);
    setBeginIndex(0);
    setCurrentPage(1);
  }

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
            goBack={handleClickPrev}
            goNext={handleClickNext}
          />
      }
    </>
  )
}

export default App