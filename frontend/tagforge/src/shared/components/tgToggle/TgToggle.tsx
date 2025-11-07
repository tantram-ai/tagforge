import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type tgToggleProps = {
    disabled?: boolean
    toogleAlignment: string
    handleToggleChange: any
}


export const TgToggle = ({ disabled = false, toogleAlignment, handleToggleChange }: tgToggleProps) => {

    return (
        <ToggleButtonGroup
            color="primary"
            value={toogleAlignment}
            exclusive
            onChange={handleToggleChange}
            aria-label="Platform"
            sx={{ height: '5vh' }}
            disabled={disabled}
        >
            <ToggleButton value="Keyword" sx={{ fontSize: '10px' }}>Keyword</ToggleButton>
            <ToggleButton value="URL" sx={{ fontSize: '10px' }}>URL</ToggleButton>
        </ToggleButtonGroup>
    );
}
