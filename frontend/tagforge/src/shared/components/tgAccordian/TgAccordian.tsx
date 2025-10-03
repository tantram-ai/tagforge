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
    onChange?: any
}

export const TgAccordian = ({ data, children, index = 0, expanded = false, onChange }: TgAccordianProp) => {
    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
            >
                <Typography component="span" fontWeight="bold">{data?.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
}
