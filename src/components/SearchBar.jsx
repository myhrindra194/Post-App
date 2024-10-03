/* eslint-disable react/prop-types */
import { Navbar, Input } from "reactstrap";


export default function SearchBar({inputValue, onChangeInput, selectValue, onChangeSelect}){
    
    return(
        <Navbar className="sticky-top bg-light border-bottom px-5 py-3">
          <div className="col-md-3 col-12-sm mb-3 mb-md-0">
            <Input placeholder="Type keyword" value={inputValue} onChange={onChangeInput} />
          </div>
          <label>
            Filter by:{' '}
            <select value={selectValue} onChange={onChangeSelect}>
              <option value="0">Id</option>
              <option value="1">Title</option>
              <option value="2">Recent Published</option>
              <option value="3">Recent Updated</option>
            </select>
          </label>
      </Navbar>
    )
}