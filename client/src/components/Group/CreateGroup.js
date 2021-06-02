import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Grid, Typography } from "@material-ui/core";

import TextField from "../Form/TextfieldWrapper.js";
import Button from "../Form/SubmitButton.js";

// REDUX
import { useDispatch } from "react-redux";
import { createGroup } from "../../redux/actions/groupActions.js";

const initialValues = {
  groupName: "",
  groupPhoto: "",
};

const validationSchema = Yup.object({
  groupName: Yup.string()
    .required("Required")
    .max(30, "Must be 30 characters or less")
    .min(5, "Must be 5 characters or more")
    .trim(),
});

const CreateGroup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const castValues = validationSchema.cast(values);
    dispatch(createGroup(castValues, history));
  };

  return (
    <Grid container xs={4}>
      <Grid item xs={12}>
        <Formik
          initialValues={{
            ...initialValues,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <TextField name="groupName" label="Group Name" />
              </Grid>
              <Grid item>
                <Button color="secondary">Submit</Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};

export default CreateGroup;

{
  /* <form onSubmit={formik.handleSubmit}>
<label htmlFor="groupName">Group Name</label>
<input
  id="groupName"
  name="groupName"
  type="text"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.groupName}
/>
{formik.touched.groupName && formik.errors.groupName && (
  <div>{formik.errors.groupName}</div>
)}
<button type="submit">Submit</button>
</form> */
}
