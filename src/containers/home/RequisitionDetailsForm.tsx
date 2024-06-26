// RequisitionDetailsForm.tsx
import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useData } from "./DataProvider";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";

const RequisitionDetailsForm: React.FC<{ onNext: () => void }> = ({
  onNext,
}) => {
  const { state, setState } = useData() as { state: any; setState: React.Dispatch<any> };  // Use the useData hook to access the global state

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues: state.requisitionDetails, // Set form values from global state
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: () => {}, // No need for onSubmit
  });

  const handleNext = () => {
    onNext();
    setState({ ...state, requisitionDetails: values }); // Update global state with form values
  };

  // Update the preview card when form values change
  React.useEffect(() => {
    setState({ ...state, requisitionDetails: values }); // Update global state with form values
  }, [values, setState]);

  return (
<Box width="100%" as="form" onSubmit={handleSubmit}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.requisitionTitle}
          error={errors.requisitionTitle}
          touched={touched.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.noOfOpenings}
          error={errors.noOfOpenings}
          touched={touched.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="button" onClick={handleNext}>
            Next
          </Button>
        </Flex>
      </Box>
    </Box>

  );
};

export default RequisitionDetailsForm;
