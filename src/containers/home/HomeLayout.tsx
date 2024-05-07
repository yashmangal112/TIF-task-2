// HomeLayout.js

import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionDetailsForm from "./RequisitionDetailsForm";
import PreviewCard from "./PreviewCard";
import DataProvider from "./DataProvider";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  const [formData, setFormData] = useState({});

  const handleFormChange = (data: {}) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const [activeTab, setActiveTab] = useState(0);

  const handleNextTab = () => {
    setActiveTab((prevTab) => prevTab + 1);
    console.log(activeTab);
  };

  const handlePrevTab = () => {
    setActiveTab((prevTab) => prevTab - 1);
    console.log(activeTab);
  };
  // {console.log(formData)}

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <DataProvider>
        <Tabs isLazy index={activeTab}>
          <TabList>
            <CustomTab>Requisition Details</CustomTab>
            <CustomTab>Job Details</CustomTab>
            <CustomTab>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionDetailsForm
                  onNext={handleNextTab}
                />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm
                  onNext={handleNextTab}
                  onPrev={handlePrevTab}
                />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm
                  onPrev={handlePrevTab}
                />
              </TabPanel>
            </TabPanels>
            <PreviewCard />
            
          </Grid>
        </Tabs>
        </DataProvider>
      </Container>
    </Box>
  );
};

export default HomeLayout;
