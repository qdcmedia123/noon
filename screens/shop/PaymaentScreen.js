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
  Image
} from "react-native";

import Ionicons from "react-native-vector-icons/FontAwesome5";
import * as cartActions from "../../store/actions/cart";
import { styles } from "../../assets/css/styles";
import logo from '../../assets/img/logo1.png';
import expressPng from '../../assets/img/express.png';
import { Toast } from "native-base";

const App = () => {
  // Component states
  const [componentState, setComponentStates] = useState({
    paymentWithCard: false,
    paymentWithCash: false,
    leadAtMyDoor: false,
  });

  const [gulfForFood, setGulfForFood] = useState(0);

  const setGulf = useCallback(() => {
    setGulfForFood((gulfForFood) => gulfForFood + 10 * 2);
  }, [gulfForFood]);

  const setGulfDecrement = useCallback(() => {
    if (gulfForFood < 1) return false;

    setGulfForFood((gulfForFood) => gulfForFood - 10 * 2);
  }, [gulfForFood]);

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
                  {/*<Text style = {styles.Poppins_Regular}> Here Will be card form</Text>
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
                <View>
                  {/*<Text> Here Will be card form</Text>
                   */}
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
              styles.mb50
            ]}
          >
            <Text style = {[styles.Poppins_Bold, styles.paddingVertical2X]}>REVIEW YOUR ORDER</Text>
            <View style={styles.cartItem}>
              <Text style = {[styles.Poppins_Medium, styles.grayText, styles.paddingVertical]}>Love JOJO</Text>
              <View style = {[styles.rc]}>
                <View style= {[styles.discription]}  >
                  <Text style= {[styles.Poppins_Bold]} >99% Aloe Vera Soothing Mostjweous Gel green 300ml</Text>
                  <Text style= {[styles.Poppins_Bold, styles.fs20, styles.defaultBackFade]}>AED 5.00</Text>
                </View>

                <View style= {[styles.pImage]}>
                  <Image source = {logo}/>
                </View>
              </View>

              <Text style ={[styles.grayText, styles.Poppins_Medium]}>QTY 1</Text>
              <View style={[styles.txtOrder]}>
                <Text style= {[styles.Poppins_Medium, styles.defaultBackFade]} >Order in the next</Text><Text style={styles.Poppins_Bold}> 18 hrs 23 mins</Text><Text style={[styles.Poppins_Medium, styles.defaultBackFade]}> and received it by</Text><Text style= {[styles.Poppins_Bold, styles.greenText]}>Sun, Sep 20</Text>
              </View>
              
              <Text style = {[styles.Poppins_Medium, styles.defaultBlack]}><Ionicons name = "exchange-alt" size = {18}/>  This Item cannnot be excahgned or returned</Text>
              <View style= {[styles.paddingVertical,styles.txtOrder]}>
                <Text style = {[styles.Poppins_Regular, styles.flex8]}>Sold By <Text style= {styles.Poppins_Bold}>MRM</Text></Text>
                <Image source = {expressPng} style= {styles.rightAlign}/>
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
