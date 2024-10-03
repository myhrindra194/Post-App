import { useEffect, useState } from "react";
import { filterList } from "./utils/script";
import {URL} from "./utils/url";
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
  
  return (
    <>
      <SearchBar
        inputValue={searchWord}
        onChangeInput={(e) => setSearchWord(e.target.value)}
        selectValue={filterKey}
        onChangeSelect={(e) => setFilterKey(e.target.value)}
      />
      {
        (posts.length === 0) ? 
          <Loader /> :
          <ListPost name={res}/>
      }
    </>
  )
}

export default App