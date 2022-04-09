import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  Image,
  Dimensions,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as SecureStore from "expo-secure-store";

import Constants from "expo-constants";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Requests({ navigation }) {
  const [status, setStatus] = useState("Pending...");
  const { width, height } = Dimensions.get("window");
  const [requests, setRequests] = useState([]);
  let row = [];
  let prevOpenedRow;
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  useEffect(() => {
    GetRequests();
  }, [isFocused]);

  const GetRequests_URL = "http://ec2-18-222-103-41.us-east-2.compute.amazonaws.com:3000/api/users/get-request";
  const DeleteRequests_URL =
    "http://ec2-18-222-103-41.us-east-2.compute.amazonaws.com:3000/api/users/delete-request/";

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

  const GetRequests = async () => {
    let result;
    await getValueFor("userToken").then((value) => {
      result = value;
    });
    try {
      const response = await fetch(GetRequests_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": result,
        },
      });
      if (!response.ok || response.status !== 201) {
        response = await response.json();
        alert(response);
      }
      const data = await response.json();
      setRequests(data);
      console.log("GET REQUEST SUCCESSFULL");
    } catch (error) {
      console.error(error);
    }
  };
  const DeleteRequests = async (i) => {
    let result;
    let r = i[0].id;
    await getValueFor("userToken").then((value) => {
      result = value;
    });
      let req = await fetch(DeleteRequests_URL+r, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": result,
        }
      });
      if (!req.ok || req.status !== 201) {
        req = await req.json();
        alert(req);
      }
      const res = await req.json();
      alert(res.message);
  };

  /**
   *
   */
  const renderItem = ({ item, index }, onClick) => {
    //
    const closeRow = (index) => {
      console.log("closerow");
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderRightActions = (progress, dragX, onClick) => {
      return (
        <View
          style={{
            margin: 0,
            alignContent: "center",
            justifyContent: "center",
            width: 85,
          }}
        >
          <Button color="orange" onPress={onClick} title="DELETE"></Button>
        </View>
      );
    };

    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, onClick)
        }
        onSwipeableOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
        rightOpenValue={-100}
      >
        <View style={{ justifyContent: "center", marginHorizontal: 10 }}>
          <View style={styles.container}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                shadowOpacity: 0.3,
                marginHorizontal: 10,
              }}
              source={{
                uri: "https://images.theconversation.com/files/223381/original/file-20180615-85822-1o2y44i.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&h=514&fit=crop&dpr=1",
              }}
            />
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.text}>{item[2].to}</Text>
              <Text style={styles.subtext}>{item[3].Reqstatus}...</Text>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: "10%",
        }}
      >
        <Text>No requests found</Text>
      </View>
    );
  };

  const deleteItem = ({ item, index }) => {
    console.log(item, index);
    let a = requests;
    a.splice(index, 1);
    console.log(a);
    setRequests([...a]);
    DeleteRequests(item);
  };

  return (
    <SafeAreaView style={[styles.root, { height: height, width: width }]}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
      <Text style={styles.title}>Your Requests</Text>
      <FlatList
        data={requests}
        renderItem={(v) =>
          renderItem(v, () => {
            console.log("Pressed", v);
            deleteItem(v);
          })
        }
        keyExtractor={(item) => item[0].id}
        ListEmptyComponent={ListEmptyComponent}
      ></FlatList>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "100%",
    marginVertical: 10,
    borderRadius: 30,
    backgroundColor: "white",
    shadowOpacity: 0.3,
  },
  text: {
    fontSize: 22,
    fontWeight: "500",
    letterSpacing: 1,
  },
  subtext: {
    color: "grey",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  title: {
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 36,
    lineHeight: 51,
    letterSpacing: 0.4,
    marginVertical: "2%",
    marginHorizontal: "5%",
  },
  date: {
    fontSize: 14,
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
