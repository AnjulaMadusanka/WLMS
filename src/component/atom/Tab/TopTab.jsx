import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const a11yProps=(index) =>{
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default ({ tabList = [], onButtonPress = () => { }, value = 0, type = 'item' }) => {
    const ref = React.useRef();
    React.useEffect(() => {

    }, [])

    return (
        <Box sx={{ width: '100%' }}>

            <Tabs
                className='tab-margin-profile'
                value={value}
                onChange={onButtonPress}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                {
                    tabList.map((item, index) => {
                        return (
                            <Tab {...a11yProps(item.value)} key={`${type}-${item?.value}${item?.label}`} value={item.value} label={item?.label} />
                        )
                    })
                }
            </Tabs>

        </Box>
    );
}


