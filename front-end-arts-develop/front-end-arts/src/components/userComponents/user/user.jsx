import React from "react";
import PersonalInformation from "./PersonalInformation";
import {
  Container,
  Box,
  Grid,Paper
} from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HistoryOrder from "./HistoryOrder";
import { useParams } from "react-router-dom";




const User = () => {
  const params = useParams();
console.log(params.id)
  const TabPanel = (p) => {
    const { children, value, index, ...other } = p;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Box>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const a11yProps = (index) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  };
  const [valueTab, setValueTab] = React.useState(parseInt(params.id)); //set cho tab
  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <Box>
    <Container>
      <Paper
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        
          padding: 3,
        }}
      >
       
        <Grid>
          <Grid item xs={3}>
            <Tabs
              orientation="horizontal"
              variant="scrollable"
              value={valueTab}
              onChange={handleChangeTab}
              aria-label="Vertical tabs example"
              className="tabs"
            >
              <Tab label="Personal Infomartion" {...a11yProps(0)} />
              <Tab label="Order history" {...a11yProps(1)} />
            </Tabs>
          </Grid>
          <Grid item xs={9}>
            <TabPanel value={valueTab} index={0}>
              <PersonalInformation />
            </TabPanel>
            <TabPanel value={valueTab} index={1}>
              <HistoryOrder/>
            </TabPanel>
          </Grid>
        </Grid>
       
      </Paper>
    </Container>
    </Box>
  );
};

export default User;
