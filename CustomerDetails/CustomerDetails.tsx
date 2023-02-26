// Render Prop
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { Button, Grid, LinearProgress } from '@mui/material';
import { TextField } from 'formik-mui';
import { createServer } from 'miragejs';
import './CustomerDetails.css';

interface Values {
  id: string;
  customername: string;
  address: string;
  telephone: string;
  dob: string;
  alttelephone: string;
  email: string;
}

interface Customer {
  id: string;
  customername: string;
  address: string;
  telephone: string;
  dob: string;
  AltTelephone: string;
  email: string;
}

/* create a mock server response using miragejs*/
createServer({
  routes() {
    this.get('/api/customers/id=1', () => [
      {
        id: '1',
        customername: 'Luke',
        address: '123 Fake Street, Preston Lancashire PR2 5YB',
        telephone: '01772111145',
        dob: '14/05/1985',
        AltTelephone: '01772111145',
        email: 'fraser.iomas@esgglobal.com',
      },
    ]);
  },
});

const CustomerDetails = () => {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    // api fetch data from REST API backend
    fetch('/api/customers/id=1')
      .then((response) => response.json())
      // set mock api data to customers state
      .then((json) => setCustomer(json));
  }, []);

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
          customername: 'Luke',
          address: '123 Fake Street, Preston Lancashire PR2 5YB',
          telephone: '01772111145',
          dob: '14/05/1985',
          alttelephone: '01772111145',
          email: 'fraser.iomas@esgglobal.com',
        }}
        validate={(values) => {
          const errors: Partial<Values> = {};
          if (!values.customername) {
            errors.customername = 'Customer Name is Required';
          }
          if (!values.telephone) {
            errors.telephone = 'Customer Name is Required';
          }
          if (!values.customername) {
            errors.customername = 'Customer Name is Required';
          }
          if (!values.customername) {
            errors.customername = 'Customer Name is Required';
          }
          if (!values.email) {
            errors.email = 'Email is Required';
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
            {customer.map((customer) => (
              <Grid container spacing={2}>
                <Grid item xs={4} sm={4}>
                  <Field
                    component={TextField}
                    name="customername"
                    type="customername"
                    label="Customer Name"
                    value={customer.customername}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Field
                    component={TextField}
                    type="telephone"
                    label="Telephone"
                    name="telephone"
                    value={customer.telephone}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Field
                    component={TextField}
                    type="dob"
                    label="Date of Birth"
                    name="dob"
                    value={customer.dob}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Field
                    component={TextField}
                    type="alttelephone"
                    label="Alternate Telephone"
                    name="alttelephone"
                    value={customer.alttelephone}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4} sm={4}>
                  <Field
                    component={TextField}
                    name="email"
                    type="email"
                    label="Email"
                    value={customer.email}
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
                    value={customer.address}
                    fullWidth
                  />
                </Grid>

                {isSubmitting && <LinearProgress />}

                <Grid item xs={4} sm={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomerDetails;
