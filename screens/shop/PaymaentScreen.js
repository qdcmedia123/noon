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
} from "react-native";

import Ionicons from "react-native-vector-icons/FontAwesome5";

import { styles } from "../../assets/css/styles";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={[styles.row, styles.box, styles.flex1, styles.whiteBG]}>
            <View style={[styles.firstRow]}>
              <Text style={[styles.flex1]}>SHIP TO</Text>
              <Text style={[styles.flex1, styles.textRight]}>
                Change Address
              </Text>
            </View>
            <View>
              <Text>
                <Ionicons name="home"></Ionicons> Home
              </Text>
              <Text>Bharat Shah</Text>
              <Text>
                or any number of other features it supports out of the box.
              </Text>
              <Text>
                +4345345345 <Ionicons name="home" />
              </Text>
            </View>
          </View>

          <View style={[styles.row, styles.box, styles.flex2]}>
            <View style={[styles.paymentMWarper]}>
              <View>
                <Text> PAYMENT METHOD </Text>
              </View>
              <View style={[styles.container, styles.bgWhilte]}>
                <View style={[styles.paymentOptions]}>
                  <CheckBox value={true} style={styles.checkbox} />

                  <Text style={styles.label}>Do you like React Native?</Text>

                  <View style={styles.dpr}>
                    <Ionicons name="home" size={20} style={[styles.label]} />
                  </View>
                </View>
                <View>
                  <Text> Here Will be card form</Text>
                </View>
              </View>

              <View style={[styles.container, styles.bgWhilte]}>
                <View style={[styles.paymentOptions]}>
                  <CheckBox value={true} style={styles.checkbox} />

                  <Text style={styles.label}>Do you like React Native?</Text>

                  <View style={styles.dpr}>
                    <Ionicons name="home" size={20} style={[styles.label]} />
                  </View>
                </View>
                <View>
                  <Text> Here Will be card form</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.row, styles.box, styles.flex1]}>
            <View>
              <Text>Delivery Options</Text>
            </View>
            <View style={styles.leaveAtMyDoor}>
              <View style = {styles.switchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={true}
              />
              </View>
              <View style = {styles.lamdt}>
                <Text>Lead At My Door</Text>
                <Text>Component that wraps platform ScrollView while providing integration with touch locking "responder" system.</Text>
              </View>
              
            </View>
          </View>
          <View style={[styles.row, styles.box, styles.flex1]}>

             
          </View>
          <View style={[styles.row, styles.box, styles.flex1]}></View>
          <View style={[styles.row, styles.box, styles.flex1]}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
