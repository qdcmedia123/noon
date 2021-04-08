import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useMemo,
} from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  CheckBox,
  Switch,
  Image,
} from "react-native";

import Ionicons from "react-native-vector-icons/FontAwesome5";
import * as cartActions from "../../store/actions/cart";
import { styles } from "../../assets/css/styles";
import logo from "../../assets/img/logo1.png";
import expressPng from "../../assets/img/express.png";
import ButtonUI from "../../components/UI/Button";
import stripe from "tipsi-stripe";
import axios from 'axios';

stripe.setOptions({
  publishableKey: "pk_test_5eCrZUNWnbmLG8iLe6wILAsy008tnT6WEo",
  merchantId: "Test",
  androidPayMode: "test", // if you are testing
});

const App = () => {
  // Component states
  const [componentState, setComponentStates] = useState({
    paymentWithCard: false,
    paymentWithCash: false,
    leadAtMyDoor: false,
  });

  const [paymentStates, setPaymentStates] = useState({ loading: false });
  const [customer, customerState] = useState({
    loading: false,
    token: null,
    email: "jaimaika17@gmail.com",
    customer: {
      address: {
        line1: "Canary Place", // Required field
        line2: "3",
        city: "Macon",
        state: "Georgia",
        country: "US",
        postal_code: "31217",
        state: "",
      },
      shipping: {
        address: {
          line1: "34535",
          line2: "3",
          city: "sydney",
          country: "australia",
          postal_code: 46456456,
          state: "",
        },
      },
      name: "bharat kumar shah",
      phone: "345345345",
    },
  });

  const [gulfForFood, setGulfForFood] = useState(0);

  const setGulf = useCallback(() => {
    setGulfForFood((gulfForFood) => gulfForFood + 10 * 2);
  }, [gulfForFood]);

  const setGulfDecrement = useCallback(() => {
    if (gulfForFood < 1) return false;

    setGulfForFood((gulfForFood) => gulfForFood - 10 * 2);
  }, [gulfForFood]);

  const handleCardPayPress = useCallback(async () => {
    try {
      setPaymentStates({ ...paymentStates, loading: true, token: null });

      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: "full",
        prefilledInformation: {
          billingAddress: { ...paymentStates, email: customer.email },
        },
      });

      console.log('payment token');
      console.log(token)

      axios({
        method: "POST",
        url: "http://localhost:5000/api/stripe/create_customer",
        data: {
          email: customer.email,
          customer: { ...customer, name: customer.name },
        },
      })
        .then((response) => {
          console.log(JSON.stringify(response));
          setPaymentStates({ ...paymentStates, loading: false });
        })
        .catch((error) => {
          setPaymentStates({ ...paymentStates, loading: false });
          console.log(error);
        });


        setPaymentStates({ ...paymentStates, loading: false, token });
    } catch (error) {
      console.log(error);
      setPaymentStates({ ...paymentStates, loading: false });
    }
  }, [paymentStates, customer]);

  useEffect(() => {
    if (componentState.paymentWithCard === true) {
      handleCardPayPress();
    }
  }, [componentState]);

  const makePayment = useCallback(() => {
    setPaymentStates({ ...paymentStates, loading: true });
    axios({
      method: "POST",
      url: "http://localhost:5000/api/stripe/payment",
      data: {
        amount: 1000,
        currency: "usd",
        token: paymentStates.token.tokenId,
        customer: customer,
      },
    });
  }, [paymentStates, customer]);

  // If user press place order button
  const placeOrder = () =>
    useCallback(() => {
      // Check the payment method
      if (componentState.paymentWithCard) {
        // Process the payment with card
        // Run the function make payment
      } else {
        // Process payment with cod
      }
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={[styles.row, styles.box, styles.flex1, styles.whiteBG]}>
            <View style={[styles.firstRow]}>
              <Text
                style={[
                  styles.flex1,
                  styles.Poppins_Bold,
                  styles.defaultPadding,
                ]}
              >
                SHIP TO
              </Text>
              <Text
                style={[
                  styles.flex1,
                  styles.textRight,
                  styles.defaultPadding,
                  styles.Poppins_Regular,
                  styles.blueText,
                ]}
              >
                Change Address
              </Text>
            </View>
            <View>
              <Text style={[styles.defaultPadding, styles.Poppins_Medium]}>
                <Ionicons name="home"></Ionicons> Home
              </Text>
              <Text
                style={[
                  styles.Poppins_Regular,
                  styles.gray,
                  styles.defaultPadding,
                  styles.grayText,
                ]}
              >
                Bharat Shah {"\n"}or any number of other features it supports
                out of the box.
                Token: {typeof paymentStates.token !== 'undefined' && JSON.stringify(paymentStates.token)}
              </Text>

              <Text style={[styles.defaultPadding, styles.Poppins_Medium]}>
                +4345345345{" "}
                <Ionicons
                  name="check-circle"
                  size={16}
                  style={[styles.green, styles.verifiedIcon]}
                />
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.row,
              styles.box,
              styles.flex2,
              styles.defaultPadding,
            ]}
          >
            <View style={[styles.paymentMWarper]}>
              <View>
                <Text style={[styles.Poppins_Bold, styles.paymentMethodText]}>
                  {" "}
                  PAYMENT METHOD{" "}
                </Text>
              </View>
              <View style={[styles.container, styles.bgWhilte]}>
                <View style={[styles.paymentOptions]}>
                  <CheckBox
                    value={componentState.paymentWithCard}
                    style={styles.checkbox}
                    onValueChange={() =>
                      setComponentStates({
                        ...componentState,
                        paymentWithCard: !componentState.paymentWithCard,
                        paymentWithCash: false,
                      })
                    }
                  />

                  <Text
                    style={[
                      styles.Poppins_Bold,
                      styles.label,
                      styles.defaultTextColor,
                    ]}
                  >
                    Pay With Card?
                  </Text>

                  <View style={styles.dpr}>
                    <Ionicons
                      name="credit-card"
                      size={20}
                      style={[styles.ccIconColor, styles.label]}
                    />
                  </View>
                </View>
                <View>
                  {/*
                   <Text style = {[styles.Poppins_Regular]}>A none-refuntable fee of AED 10.00 applies on cah payment. To save on his aoumt please proceed with debit/cardit card</Text>
                 
                  */}
                </View>
              </View>

              <View style={[styles.container, styles.bgWhilte]}>
                <View style={[styles.paymentOptions]}>
                  <CheckBox
                    value={componentState.paymentWithCash}
                    style={[styles.checkbox]}
                    onValueChange={() =>
                      setComponentStates({
                        ...componentState,
                        paymentWithCash: !componentState.paymentWithCash,
                        paymentWithCard: false,
                      })
                    }
                  />

                  <Text
                    style={[
                      styles.Poppins_Bold,
                      styles.label,
                      styles.defaultTextColor,
                    ]}
                  >
                    Pay With Cash
                  </Text>

                  <View style={styles.dpr}>
                    <Ionicons
                      name="money-bill-alt"
                      size={20}
                      style={[styles.label, styles.green]}
                    />
                  </View>
                </View>
                <View
                  style={[
                    componentState.paymentWithCash === true
                      ? styles.show
                      : styles.hide,
                  ]}
                >
                  <Text
                    style={[
                      styles.defaultBackFade,
                      styles.Poppins_Regular,
                      styles.paddingVertical,
                      styles.paddingHorizontal,
                    ]}
                  >
                    A none-refuntable fee of AED 10.00 applies on cah payment.
                    To save on his aoumt please proceed with debit/cardit card
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.row, styles.box, styles.flex1]}>
            <View>
              <Text
                style={[
                  styles.Poppins_Bold,
                  styles.paymentMethodText,
                  styles.defaultPadding,
                  styles.bgWhilte,
                ]}
              >
                Delivery Options
              </Text>
            </View>
            <View style={[styles.bgWhilte, styles.leaveAtMyDoor]}>
              <View style={styles.switchContainer}>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={true ? "#3866de" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  value={componentState.leadAtMyDoor}
                  onValueChange={() =>
                    setComponentStates({
                      ...componentState,
                      leadAtMyDoor: !componentState.leadAtMyDoor,
                    })
                  }
                />
              </View>
              <View style={[styles.lamdt, styles.defaultPadding]}>
                <Text
                  style={[
                    styles.Poppins_Bold,
                    componentState.leadAtMyDoor !== true
                      ? styles.opacityHealf
                      : "",
                  ]}
                >
                  Lead At My Door
                </Text>
                <Text
                  style={[
                    styles.Poppins_Regular,
                    componentState.leadAtMyDoor !== true
                      ? styles.opacityHealf
                      : "",
                  ]}
                >
                  Component that wraps platform ScrollView while providing
                  integration with touch locking "responder" system.
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.row,
              styles.box,
              styles.flex1,
              styles.bgWhilte,
              styles.defaultPadding,
            ]}
          >
            <View style={styles.gulfForfood}>
              <Text
                style={[
                  styles.paddingVertical,
                  styles.Poppins_Bold,
                  styles.grayText,
                ]}
              >
                Gulf for Food
              </Text>

              <View style={[styles.paddingVertical, styles.gulfForFoo2]}>
                <View style={[styles.flexCenterItem, styles.flex1]}>
                  <Ionicons name="home" size={30} />
                </View>
                <View style={[styles.flex1, styles.addSomething]}>
                  <TouchableOpacity onPress={() => setGulf()}>
                    <Ionicons
                      name="plus-square"
                      size={30}
                      style={styles.blueIcon}
                    ></Ionicons>
                  </TouchableOpacity>
                  <Text style={[styles.Poppins_Bold, styles.grayText]}>
                    AED {gulfForFood}
                  </Text>
                  <TouchableOpacity onPress={() => setGulfDecrement()}>
                    <Ionicons
                      name="minus-square"
                      size={30}
                      style={styles.blueIcon}
                    ></Ionicons>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View>
              <Text
                style={[
                  styles.grayText,
                  styles.Poppins_Medium,
                  styles.paddingVertical,
                ]}
              >
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
              </Text>
              <Text
                style={[styles.grayText, styles.Poppins_Regular, styles.font1]}
              >
                None Refuntable something wil be added to your cart
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.row,
              styles.box,
              styles.flex1,
              styles.bgYellow,
              styles.paddingHorizontal,
            ]}
          >
            <View style={[styles.orderSummary]}>
              <Text
                style={[
                  styles.Poppins_Bold,
                  styles.defaultBlack,
                  styles.paddingVertical,
                ]}
              >
                ORDER SUMMARY
              </Text>
            </View>

            <View style={[styles.afterOrderSummary]}>
              <View
                style={[styles.row, styles.tableRow, styles.paddingVertical]}
              >
                <Text style={[styles.flex1, styles.Poppins_Medium]}>
                  Subtotal
                </Text>
                <Text
                  style={[
                    styles.textRight,
                    styles.flex1,
                    styles.defaultBackFade,
                    styles.Poppins_Regular,
                  ]}
                >
                  AED 345345
                </Text>
              </View>

              <View
                style={[styles.row, styles.tableRow, styles.paddingVertical]}
              >
                <Text style={[styles.flex1]}>Subtotal</Text>

                <Text
                  style={[
                    styles.textRight,
                    styles.flex1,
                    styles.defaultBackFade,
                    styles.Poppins_Regular,
                  ]}
                >
                  AED 345345
                </Text>
              </View>

              <View
                style={[
                  styles.warning,
                  styles.paddingHorizontal,
                  styles.paddingVertical,
                ]}
              >
                <Text style={[styles.Poppins_Regular, styles.defaultRed]}>
                  <Ionicons name="exclamation-triangle" /> Coupon is only valid
                  in KASA
                </Text>
              </View>

              <View style={styles.hr}></View>

              <View
                style={[styles.row, styles.tableRow, styles.paddingVertical]}
              >
                <Text style={[styles.Poppins_Medium]}>TOTAL</Text>
                <Text style={[styles.Poppins_Regular, styles.grayText]}>
                  {" "}
                  (Invlusive of VAT)
                </Text>
                <Text style={[styles.textRight, styles.flex1]}>AED 345345</Text>
              </View>

              <View
                style={[styles.row, styles.tableRow, styles.paddingVertical]}
              >
                <Text style={[styles.flex1, styles.Poppins_Bold]}>
                  Eistimate VAT
                </Text>
                <Text style={[styles.textRight, styles.flex1]}>AED 45.00</Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.row,
              styles.box,
              styles.flex1,
              styles.orderReview,
              styles.paddingHorizontal,
              styles.whiteBG,
              styles.mt15,
              styles.mb50,
            ]}
          >
            <Text style={[styles.Poppins_Bold, styles.paddingVertical2X]}>
              REVIEW YOUR ORDER
            </Text>
            <View style={styles.cartItem}>
              <Text
                style={[
                  styles.Poppins_Medium,
                  styles.grayText,
                  styles.paddingVertical,
                ]}
              >
                Love JOJO
              </Text>
              <View style={[styles.rc]}>
                <View style={[styles.discription]}>
                  <Text style={[styles.Poppins_Bold]}>
                    99% Aloe Vera Soothing Mostjweous Gel green 300ml
                  </Text>
                  <Text
                    style={[
                      styles.Poppins_Bold,
                      styles.fs20,
                      styles.defaultBackFade,
                    ]}
                  >
                    AED 5.00
                  </Text>
                </View>

                <View style={[styles.pImage]}>
                  <Image source={logo} />
                </View>
              </View>

              <Text style={[styles.grayText, styles.Poppins_Medium]}>
                QTY 1
              </Text>
              <View style={[styles.txtOrder]}>
                <Text style={[styles.Poppins_Medium, styles.defaultBackFade]}>
                  Order in the next
                </Text>
                <Text style={styles.Poppins_Bold}> 18 hrs 23 mins</Text>
                <Text style={[styles.Poppins_Medium, styles.defaultBackFade]}>
                  {" "}
                  and received it by
                </Text>
                <Text style={[styles.Poppins_Bold, styles.greenText]}>
                  Sun, Sep 20
                </Text>
              </View>

              <Text style={[styles.Poppins_Medium, styles.defaultBlack]}>
                <Ionicons name="exchange-alt" size={18} /> This Item cannnot be
                excahgned or returned
              </Text>
              <View style={[styles.paddingVertical, styles.txtOrder]}>
                <Text style={[styles.Poppins_Regular, styles.flex8]}>
                  Sold By <Text style={styles.Poppins_Bold}>MRM</Text>
                </Text>
                <Image source={expressPng} style={styles.rightAlign} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.continueBtn]}>
        <Text style={styles.continueBtnTxt}> PLACE ORDER</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
