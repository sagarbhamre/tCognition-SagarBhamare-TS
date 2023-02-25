// Render Prop
import * as React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { Button, Grid, LinearProgress } from '@mui/material';
import { TextField } from 'formik-mui';
import './CustomerDetails.css';

interface Values {
  email: string;
  password: string;
}

const CustomerDetails = () => {
  return (
    <div>
      <h1 className="page-heading">Customer Details</h1>
      <Button
        className="edit-btn"
        variant="contained"
        sx={{ marginLeft: 'auto', marginBottom: '20' }}
      >
        Edit
      </Button>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={(values) => {
          const errors: Partial<Values> = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4}>
                <Field
                  component={TextField}
                  name="customername"
                  type="customername"
                  label="Customer Name"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Field
                  component={TextField}
                  type="telephone"
                  label="Telephone"
                  name="telephone"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <Field
                  component={TextField}
                  type="dob"
                  label="Date of Birth"
                  name="dob"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Field
                  component={TextField}
                  type="alttelephone"
                  label="Alt Telephone"
                  name="alttelephone"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Field
                  component={TextField}
                  type="alttelephone"
                  label="Alt Telephone"
                  name="alttelephone"
                  fullWidth
                />
              </Grid>

              <Grid item xs={4} sm={4}>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth
                />
              </Grid>

              <Grid item xs={4} sm={4}>
                <Field
                  component={TextField}
                  multiline
                  rows={2}
                  type="address"
                  label="Address"
                  name="address"
                  placeholder="Address"
                  fullWidth
                />
              </Grid>

              {isSubmitting && <LinearProgress />}

              {/* <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button> */}
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomerDetails;
