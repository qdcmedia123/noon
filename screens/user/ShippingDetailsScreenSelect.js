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
} from "react-native";
import Ionicons from "react-native-vector-icons/FontAwesome5";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import * as cartActions from "../../store/actions/cart";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// check something here you want to referesh
// https://stackoverflow.com/questions/44223727/react-navigation-goback-and-update-parent-state
function App(props) {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const { token, userId } = useSelector((state) => state.auth);
  const [shippingAddresses, setShippingAddresses] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);

  // Let fetch data data
  const fetchUserShippingDetails = useCallback(async () => {
    setIsFetching(true);
    if (token !== null && userId !== null) {
      try {
        const response = await fetch(
          `https://mobileshop-458de.firebaseio.com/shipping/${userId}.json`
        );
        if (!response.ok) {
          throw new Error("Could not fetch shipping details");
        }

        const resData = await response.json();
        // If there is no shipping then
        if (resData !== null && Object.entries(resData).length > 0) {
          //  shipping is provided

          const loadedOrders = {};
          const apped = {};
          for (const key in resData) {
            loadedOrders[key] = resData[key];
          }
          console.log(resData);
          Object.entries(resData).forEach((entry) => console.log(entry[0]));
          setShippingAddresses(resData);
        }
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        console.log(error);
      }
    }
  }, []);

  // default address

  useEffect(() => {
    fetchUserShippingDetails();
  }, [fetchUserShippingDetails]);

  // Lets verify the permission is set const
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grate location permission to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const changeShippingBlock = (id) => {
    console.log(id);
    setDefaultAddress(id);
  };

  const editShippingAddress = (shippingID, details) => {
    props.navigation.navigate("EditShippingDetails", {
      shippingAddressId: shippingID,
      editMode: true,
      shippingDeatils: details,
    });
  };

  const getShippingInCompoennt = useMemo(() => {
    if (!isFetching) {
      if (
        shippingAddresses !== null &&
        Object.entries(shippingAddresses).length > 0
      ) {
        return Object.entries(shippingAddresses).map((entry, index) => (
          <TouchableOpacity
            onPress={() => changeShippingBlock(entry[0])}
            key={index}
            style={[
              styles.blockTouch,
              entry[0] == defaultAddress ? styles.selectedAddress : styles.none,
            ]}
          >
            <View style={[styles.fistRow]}>
              <View style={[styles.specificationView, styles.custom0]}>
                <Ionicons name="map-marker" size={20} />
                <Text> {entry[1]["addressLabel"]}</Text>
              </View>
              <View style={[styles.specificationView, styles.custom0]}>
                <TouchableOpacity
                  style={[styles.specificationView]}
                  onPress={() => editShippingAddress(entry[0], entry[1])}
                >
                  <Ionicons name="edit" size={20} />
                  <Text> Edit </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.specificationView]}
                  onPress={() => deleteShippingById(entry[0])}
                >
                  <Ionicons name="trash" size={20} />
                  <Text> Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.infoContainer, styles.custom1]}>
              <View style={[styles.fistRow, styles.padding15TopBotton]}>
                <View style={[styles.specificationView, styles.stylesTd]}>
                  <Text style={styles.tdText}>Name</Text>
                </View>
                <View style={[styles.specificationView, styles.stylesTd]}>
                  <Text style={[styles.tableBody]}>
                    {entry[1]["firstName"]}
                  </Text>
                </View>
              </View>

              <View style={[styles.fistRow, styles.padding15TopBotton]}>
                <View style={[styles.specificationView, styles.stylesTd]}>
                  <Text style={styles.tdText}>Address</Text>
                </View>
                <View style={[styles.specificationView, styles.stylesTd]}>
                  <Text style={[styles.tableBody]}>
                    {entry[1]["additionalAddress"]}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.fistRow,
                  styles.padding15TopBotton,
                  styles.marginTopX,
                ]}
              >
                <View style={[styles.specificationView, styles.stylesTd]}>
                  <Text style={styles.tdText}>Mobile Number</Text>
                </View>
                <View style={[styles.specificationView, styles.stylesTd]}>
                  <Text style={[styles.tableBody]}>
                    {entry[1]["phoneCode"] + entry[1]["mobileNumber"]}

                    <Ionicons
                      name="check-circle"
                      size={20}
                      style={styles.circleIconCheck}
                    ></Ionicons>
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ));
      }
      return (
        <View>
          <Text>Nothing found</Text>
        </View>
      );
    }
    return (
      <View>
        <Text>Fetching</Text>
      </View>
    );
  }, [shippingAddresses, isFetching, defaultAddress]);

  // Delete the shipping
  const deletePressed = async (id) => {
    try {
      let deleteShippingById = authActions.deleteShipping(id);
      dispatch(await deleteShippingById);
      props.navigation.push("ShippingDetails");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteShippingById = (id) => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deletePressed(id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Dispatch select shipping addresss
  const continueAction = useCallback(
    (id) => {
      if (
        shippingAddresses !== null &&
        Object.entries(shippingAddresses).length > 0
      ) {
        let selectedShipping = Object.fromEntries(
          Object.entries(shippingAddresses).filter((sid) => sid[0] === id)
        );
        dispatch(cartActions.selectedShipping(selectedShipping));
        props.navigation.navigate("PaymentScreen", {
          shippingID: defaultAddress,
        });
      }
    },
    [shippingAddresses]
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          {getShippingInCompoennt}

          <TouchableOpacity
            style={styles.addNewButtonWarper}
            onPress={() => props.navigation.navigate("Map")}
          >
            <Text style={styles.poppinsRegular}>
              {" "}
              <Ionicons name="plus" size={14} /> Add a new address
            </Text>
          </TouchableOpacity>
          {/* {() => props.navigation.navigate('Map')} */}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => continueAction(defaultAddress)}
      >
        <Text style={styles.continueBtnTxt}> Contineu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  continueBtn: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#3866de",
    width: "100%",
  },
  continueBtnTxt: {
    fontFamily: "Poppins-SemiBold",
    color: "#f0f0f0",
    textAlign: "center",
    paddingVertical: 10,
    textTransform: "uppercase",
    fontSize: 14,
  },
  selectedAddress: {
    borderWidth: 2,
    borderColor: "green",
  },
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  blockTouch: {},
  continue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    height: 96,
    left: 0,
    top: windowHeight - 100,
    width: windowWidth,
    backgroundColor: "#008080",
    flex: 1,
    alignItems: "center",
    padding: 15,
  },

  addNewAddTxt: {
    fontFamily: "",
  },
  addNewButtonWarper: {
    padding: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    textAlign: "center",
    marginTop: 15,
  },
  addNewAdd: {
    backgroundColor: "#fff",
    color: "#000000",
  },
  custom0: {
    backgroundColor: "#fff",
    padding: 15,

    borderBottomWidth: 1,
  },
  custom1: {
    backgroundColor: "#fff",
    marginTop: 5,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    paddingBottom: 50,
  },
  circleIconCheck: {
    color: "green",
  },
  padding15TopBotton: {},
  poppinsRegular: {
    fontFamily: "Poppins-Regular",
  },
  tdText: {
    fontFamily: "Poppins-Regular",
    color: "gray",
  },
  tableBody: {
    lineHeight: 30,
    fontFamily: "Poppins-SemiBold",
    color: "#414551",
  },
  marginTopX: {},

  contentMiddle: { flex: 1, alignItems: "center", justifyContent: "center" },

  storeName: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  soldBy: {
    color: "#404553",
    fontSize: 14,
  },
  express: {
    flex: 1,
    width: "50%",
    paddingRight: 10,
  },
  deliveryBy: {
    color: "#404553",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  bigPrice: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    lineHeight: 30,
    color: "#404553",
  },
  productName: {
    fontFamily: "Poppins-SemiBold",
    color: "#404553",
  },
  width20: {
    width: "30%",
    height: "100%",
    overflow: "visible",
  },
  width80: {
    width: "70%",
  },
  afterCatName: {},
  catName: {
    color: "gray",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    lineHeight: 25,
  },
  isFlex: {
    flex: 1,
  },
  thPrice: {
    width: "78%",
    padding: 10,
    lineHeight: 25,
    fontFamily: "Poppins-Regular",
    borderRightColor: "#000000",
    borderRightWidth: 1,
    fontSize: 14,
  },
  dismiss: {
    width: "22%",
    padding: 10,
    textAlignVertical: "center",
    fontFamily: "Poppins-Bold",
    color: "#721c24",
    fontSize: 16,
  },
  mt__10: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "#fcfbf4",
  },
  cartInner: {
    backgroundColor: "#F7F7FA",
    marginTop: 10,
  },
  cartConatiner: {
    backgroundColor: "#fff",
    flex: 1,
  },
  infoContainer: {
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  dearCustomer: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  contentText: {
    fontSize: 10,
    fontFamily: "Poppins-Medium",
  },
  orderwith: {
    flexGrow: 1,
    display: "flex",
    height: "100%",
  },
  iconText: {
    width: "auto",
  },
  iconContent: {
    width: "70%",
  },
  container: {
    flex: 1,
  },
  fistRow: {
    flex: 1,
    flexDirection: "row",
    marginRight: 1,
    marginTop: 5,
    flexWrap: "wrap",
    height: "auto",
  },

  specificationView: {
    flex: 1,
    flexDirection: "row",
  },
  specificContainer: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default App;
