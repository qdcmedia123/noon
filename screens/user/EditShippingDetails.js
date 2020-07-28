import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import Ionicons from "react-native-vector-icons/FontAwesome5";
function App() {
  const [value, onChangeText] = React.useState("");
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={[styles.row]}>
          <Image
            source={require("../../assets/img/logo.png")}
            style={{ width: 150, height: 30, marginTop: 4 }}
          />

          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.cancelBtnTxt}>CANCEL</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.row]}>
          <View style={[styles.flag]}>
            <Text style={[styles.flagIcon]}>🇦🇪</Text>
          </View>

          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.setAsDefault}>Set as a default</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.locationInfoBack]}>
          <Text style={[styles.locationInformation]}>LOCATION INFORMATION</Text>
        </View>

        <View style={[styles.row]}>
          <View style={styles.col_md_6}>
            <Text>Unammed Road - JLT</Text>
            <Text>Dubai</Text>
          </View>

          <View style={[styles.col_md_6, styles.googleImageScreen]}>
            <Text>Goold Image</Text>
          </View>

          <View style={styles.viewStyleForLine}></View>

          <View style={styles.col_md_12}>
            <Text>Additional Address Details</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              placeholder="Where you want to drop item"
            />
          </View>

          <View style={[styles.col_md_12]}>
            <Text>Goold Image</Text>
          </View>
        </View>

        <View style={[styles.locationInfoBack]}>
          <Text style={[styles.locationInformation]}>PERSONAL INFORMATION</Text>
        </View>

        <View style={[styles.row]}>
          <View style={[styles.col_md_12]}>
            <Text>Mobile Number</Text>
          </View>

          <View style={[styles.col_md_3]}>
            <Text>+971</Text>
          </View>

          <View style={[styles.col_md_3]}>
            <Text>50 </Text>
          </View>

          <View style={[styles.col_md_6]}>
            <TextInput
              style={[styles.inputText, styles.mb10]}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              placeholder="Mobile Number"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  borderHair: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
  },
  mb10: {
    marginTop: -15,
  },
  inputText: { height: 40, borderBottomColor: "gray", borderBottomWidth: 1 },
  viewStyleForLine: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
    paddingTop: 5,
    paddingBottom: 10,
  },
  hrLine: {
    borderBottomWidth: 2,
    borderBottomColor: "#000000",
    height: 2,
  },
  col_md_12: {
    flexBasis: "100%",
  },
  col_md_6: {
    flexBasis: "50%",
  },
  col_md_4: {
    flexBasis: "25%",
  },
  col_md_3: {
    flexBasis: "20%",
  },

  hr: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  googleImageScreen: {
    flex: 1,
    alignItems: "flex-end",
  },
  locationInfoBack: {
    padding: 15,
  },
  locationInformation: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#7e849a",
  },
  flagIcon: {
    fontSize: 28,
  },
  setAsDefault: {
    fontFamily: "Poppins-Regular",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#414551",
    borderRadius: 15,
    color: "#414551",
  },
  cancelBtnTxt: {
    fontFamily: "Poppins-Regular",
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: "#000000",
  },
  cancelBtn: {
    flex: 1,
    alignItems: "flex-end",
  },
  container: {
    backgroundColor: "#fafafa",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    flexWrap: "wrap",
  },
});

export default App;
