import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type tgSearchProps = {
    onSearch: any
}

export const TgSearch = ({ onSearch }: tgSearchProps) => {
    const [query, setQuery] = useState<string>('');

    const handleInputChange = (event: any) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: 500,
                mx: 'auto',
                borderRadius: 2,
                boxShadow: 1,
                p:1
            }}
        >
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                size="small"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px 0 0 8px',
                    },
                }}
            />
            <IconButton
                color="primary"
                onClick={handleSearch}
                sx={{
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    borderRadius: '0 8px 8px 0',
                    '&:hover': {
                        backgroundColor: '#1565c0',
                    },
                }}
                aria-label="search"
            >
                <SearchIcon />
            </IconButton>
        </Box>
    );
};
