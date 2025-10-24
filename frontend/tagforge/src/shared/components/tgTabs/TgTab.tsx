import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

type tgTabProps = {
  tabItemList: any
  tabComponentList: any
}

export const TgTab = ({ tabItemList, tabComponentList }: tgTabProps) => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', position:"fixed", zIndex: '20' ,
        backgroundColor:"background.paper" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabItemList?.map((item: string, index: number) => {
              return <Tab label={item} value={(index + 1).toString()} />
            })}
          </TabList>
        </Box>
        <Box sx={{paddingTop:'4%'}}>
        {tabComponentList?.map((item: any, index: number) => {
          return <TabPanel value={(index + 1).toString()}>{item}</TabPanel>
        })}
        </Box>
      </TabContext>
    </Box>
  );
}
