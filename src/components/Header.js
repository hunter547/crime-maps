import { AppBar, Container, IconButton, TextField, Toolbar, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import React, { useContext, useState } from 'react';
import Badge from '../assets/Badge';
import { getCoordinatesFromAddress } from '../utils/geoencoding-api-helper';
import { CoordinatesContext } from '../context/CoordinatesContext';

export default function Header() {

  const [showSearchbar, setShowSearchBar] = useState(false)
  const [searchbarText, setSearchBarText] = useState("")

  const [,setCoordinatesContext] = useContext(CoordinatesContext)

  const handleSearch = async () => {
    const { lat, lon, display_name } = await getCoordinatesFromAddress(searchbarText)
    setCoordinatesContext({ mapProps: { center: [ parseFloat(lat),  parseFloat(lon) ], zoom: 13 }, address: display_name })
  }
  return <AppBar position='static' sx={{ height: '80px' }}>
            <Toolbar sx={{ my: 1, justifyContent: 'space-between' }}>
              <Container maxWidth={false} sx={{ p: 0, display: 'flex', alignItems: 'center' }}>
                <IconButton
                    size='small'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }}
                    onClick={() => setShowSearchBar(!showSearchbar)}
                >
                    {!showSearchbar ? <SearchIcon /> : <CloseIcon />}
                </IconButton>
                {!showSearchbar ? (
                    <Typography variant='h6' onClick={() => setShowSearchBar(!showSearchbar)}>
                        Crime Maps
                    </Typography>
                ) : (
                    <TextField 
                      color="info" 
                      label="Address lookup" 
                      variant='outlined' 
                      sx={{ flexGrow: 1 }} 
                      onChange={(e) => setSearchBarText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleSearch()}}
                      autoFocus
                    />
                )}
              </Container>
              {!showSearchbar ? 
                <Badge width={40} /> 
               : 
                <Button sx={{ ml: 2 }} variant="contained" onClick={() => handleSearch()}>
                    Search
                </Button>}
            </Toolbar>
        </AppBar>;
}
