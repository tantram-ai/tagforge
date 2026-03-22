import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const TgAutocomplete = ({ multiple = false, defaultValue = null, options = [], limitTags = 2, label = "" }) => {


    return (
        <Autocomplete
            disablePortal
            multiple={multiple}
            id="multiple-limit-tags"
            limitTags={limitTags}
            options={options}
            // getOptionLabel={(option) => option?.title}
            defaultValue={defaultValue}
            fullWidth={true}
            size="small"
            renderInput={(params) => <TextField {...params} label={label} />}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                },
            }}
        />
    );
}