import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close'
import { ListGroup} from 'react-bootstrap';

import '../index.css';

import { getAlbumById } from '../api';

const SearchBar = ({ allAlbums, setAllAlbums }) => {
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = (event) =>{
      
    const albumSearched = event.target.value;
    setSearchTerm(albumSearched);
    const albumFilter = allAlbums.filter((albums)=>{

        const album     = albums.artist.toLowerCase().includes(albumSearched.toLowerCase());
        const artist    = albums.album_name.toLowerCase().includes(albumSearched.toLowerCase());

        return artist ? artist : album
    });
    
    albumSearched === "" ? setFilteredAlbums([]) : setFilteredAlbums(albumFilter);
  }

  const clearInput = () => {
    setFilteredAlbums([]);
    setSearchTerm('')

  }

  const handleSearch = async(event) => {

    const albumSearched = await getAlbumById(event.target.id)
    setAllAlbums(albumSearched)
    setFilteredAlbums([]);
    setSearchTerm('')
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder="Search Album" value={searchTerm} onChange={handleFilter} />
        <div className="searchIcon">
        {filteredAlbums.length === 0 ? <SearchIcon /> : <CloseIcon id='clearBtn' onClick={clearInput}/>}
          
        </div> 
      </div>
      { filteredAlbums.length !== 0 &&
        <div className="dataResult">
          {filteredAlbums.slice(0,10).map((value) => {
            return  <ListGroup.Item className="dataItem" onClick={handleSearch} id={value.id}>{`${value.album_name}, ${value.artist}` }</ListGroup.Item>;
          })}
        </div>
      }
    </div>
  );
};
export default SearchBar;
 