import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type TgAccordianProp = {
    data: any,
    children?: React.ReactNode,
    index: number,
    expanded: boolean,
    onChange?: any,
    active?:boolean
}

export const TgAccordian = ({ data, children, index = 0, active=false, expanded = false, onChange }: TgAccordianProp) => {
    return (
        <Accordion expanded={expanded} onChange={onChange} sx={{backgroundColor:active?"#263238":"",borderRadius:2}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
                
            >
                <Typography component="span" fontWeight="bold" sx={{color:"#ffff"}}>{data?.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
}
