import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const TgMultiToggle = ({ list, alignment, setAlignment }) => {
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
            size='small'
            sx={{
                '& .MuiToggleButton-root': {
                    textTransform: 'none',
                },
            }}
        >
            {list?.length > 0 ? list.map((item: any, index: any) => (
                <ToggleButton key={index} value={item}>{item}</ToggleButton>
            )) : <ToggleButton key="default" value="default">N/A</ToggleButton>}
        </ToggleButtonGroup>
    );
}