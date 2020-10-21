import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Button from '../../components/UI/Button';
import axios from 'axios';

import stripe from 'tipsi-stripe';

stripe.setOptions({
  publishableKey: 'pk_test_5eCrZUNWnbmLG8iLe6wILAsy008tnT6WEo',
  merchantId: 'Test',
  androidPayMode: 'test', // if you are testing
});

const CardFormScreen = () => {  

 const [state, setState] =  state = {
    loading: false,
    token: null,
    email: 'jaimaika16@gmail.com',
    customer: {
      address: {
        line1: 'Canary Place', // Required field 
        line2: '3',
        city: 'Macon',
        state: 'Georgia',
        country: 'US',
        postal_code: '31217',
        state: '',
      },
      shipping: {
        address: {
          line1: '34535',
          line2: '3',
          city: 'sydney',
          country: 'australia',
          postal_code: 46456456,
          state: '',
        },
      },
      name: 'bharat kumar shah',
      phone: '345345345',
    },
  };

  const handleCardPayPress = async () => {
    try {
      this.setState({...this.state, loading: true, token: null});
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress:{...this.state.customer.address, email:this.state.customer.email}
        },
      });

      axios({
        method: 'POST',
        url: 'http://localhost:5000/api/stripe/create_customer',
        data: {
          email: this.state.email,
          customer:{...this.state.customer, name: this.state.name}
        },
      })
        .then((response) => {
          console.log(JSON.stringify(response));
          setState({...state, loading: false});
        })
        .catch((error) => {
          this.setState({loading: false});
          console.log(error);
        });

        setState({...state, loading: false, token});
    } catch (error) {
        setState({...state, loading: false});
    }
  };

  const makePayment = async () => {
    this.setState({loading: true});
    //'https://us-central1-react-native-stripe-51bc5.cloudfunctions.net/completePaymentWithStripe',
    // http://localhost:5000/api/stripe/payment
    axios({
      method: 'POST',
      url: 'http://localhost:5000/api/stripe/payment',
      data: {
        amount: 1000,
        currency: 'usd',
        token: this.state.token.tokenId,
        customer: this.state.customer,
      },
    })
      .then((response) => {
        console.log(JSON.stringify(response));
        setState({...state, loading: false});
      })
      .catch((error) => {
        setState({...state, loading: false});
        console.log(error);
      });
  };

 
    const {loading, token} = state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Card Form Example</Text>
        <Text style={styles.instruction}>
          Click button to show Card Form dialog.
        </Text>
        <Button
          text="Enter you card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
        />
        <View style={styles.token}>
          {token && (
            <Fragment>
              <Text style={styles.instruction}>Token: {token.tokenId}</Text>
              <Button
                text="Make Payment"
                loading={loading}
                onPress={this.makePayment}
              />
            </Fragment>
          )}
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
});

export default CardFormScreen;