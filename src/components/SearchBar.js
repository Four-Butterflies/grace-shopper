import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { ListGroup, InputGroup, DropdownButton, Dropdown, FormControl, Button } from 'react-bootstrap';
import '../index.css';
import { getAlbumById, searchByAlbumName, searchByArtist } from '../api';
import { Route } from 'react-router-dom'

const SearchBar = ({ allAlbums, setAllAlbums }) => {
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('Album Name')

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

  const handleSearch = async(event) => {

    const albumSearched = await getAlbumById(event.target.id)
    setAllAlbums(albumSearched)
    setFilteredAlbums([]);
    setSearchTerm('')
  }

  const handleOnSubmit = async () => {
    if (title === 'Album Name') {
      const albums = await searchByAlbumName(searchTerm)
      setAllAlbums(albums)
      setFilteredAlbums([]);
      setSearchTerm('')
    } else if (title === 'Artist') {
      const albums = await searchByArtist(searchTerm)
      setAllAlbums(albums)
      setFilteredAlbums([]);
      setSearchTerm('')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('Pressed the enter key!')
      handleOnSubmit()
    }
  }

  return (
    <div className="search">
      <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title={title}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item href="#" onClick={(event) => {
            event.preventDefault()
            setTitle('Artist')}}
            >Artist</Dropdown.Item>
          <Dropdown.Item href="#" onClick={(event) => {
            event.preventDefault()
            setTitle('Album Name')}}>Album Name</Dropdown.Item>
        </DropdownButton>
        <FormControl aria-label="Text input with dropdown button" placeholder="Search" value={searchTerm} onChange={handleFilter} onSubmit={handleOnSubmit} onKeyDown={handleKeyDown}/>
        <Route render={({ history }) => (
          <Button variant="outline-secondary" id="button-addon2" onClick={(event) => {
            event.preventDefault()
            history.push('/albums')
            handleOnSubmit()
          }}>
            <div className="searchIcon">
              <SearchIcon />
            </div>
          </Button>
        )} />
        { filteredAlbums.length !== 0 &&
          <div className="dataResult">
            {filteredAlbums.slice(0,10).map((value) => {
              return  <ListGroup.Item className="dataItem" onClick={handleSearch} id={value.id}>{`${value.album_name}, ${value.artist}` }</ListGroup.Item>;
            })}
          </div>
        }
      </InputGroup>
    </div>
  );
};
export default SearchBar;