import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type tgToggleProps = {
    disabled?: boolean
}

export const TgToggle = ({ disabled = false }: tgToggleProps) => {
    const [alignment, setAlignment] = React.useState('Keyword');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{ height: '5vh' }}
            disabled={disabled}
        >
            <ToggleButton value="Keyword" sx={{ fontSize: '10px' }}>Keyword</ToggleButton>
            <ToggleButton value="URL" sx={{ fontSize: '10px' }}>URL</ToggleButton>
        </ToggleButtonGroup>
    );
}
