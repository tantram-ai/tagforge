import { MenuItem, Select, TextField } from '@mui/material'

type TgTextInputProps = {
    value: string
    name: string,
    label: string,
    onChange: any,
    list?: any[],
    required?: boolean,
    multiline?: boolean,
    rows?: number,
    placeholder?: string,
    hidden?: boolean,
    select?: boolean,
    disabled?: boolean
}

export const TgTextInput = ({
    value,
    name,
    label,
    onChange,
    list = [],
    required = true,
    multiline = false,
    rows = 0,
    placeholder = "",
    hidden = false,
    select = false,
    disabled = false,
}: TgTextInputProps) => {

    if (hidden) {
        return null
    }

    return (
        <TextField
            select={select}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            required={required}
            variant="outlined"
            size='small'
            multiline={multiline}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
             sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2, 
                },
            }}
        >
            {list?.length > 0 && list?.map((opt) => (
                <MenuItem key={opt} value={opt}>
                    {opt}
                </MenuItem>
            ))}
        </TextField>
    )
}
