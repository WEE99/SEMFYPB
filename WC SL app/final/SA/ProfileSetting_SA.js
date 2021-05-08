import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
// import ImagePicker from '../imagePicker.js';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from "../components/firebase";

export default ({ navigation, route }) => {

  const [name, setname] = useState("");
  const [nickname, setnickname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [role, setrole] = useState("");
  const [profileimage, setprofileImage] = useState("");

  const [datafor2, setdatafor2] = useState("");

  const [editnickname, seteditnickname] = useState("");
  const [editrole, seteditrole] = useState("");
  const [editemail, seteditemail] = useState("");
  const [editcontact, seteditcontact] = useState("");


  const pressCancel = () => {
    // alert("Cancel")
    navigation.goBack()
  };

  const pressSave = () => {

    if (editnickname != "") {
      db.collection("users").doc(datafor2).update({
        nickname: editnickname
      });
    }
    // if (editrole!="")
    // {
    //   if(editrole==="Salesperson"||editrole==="Company Admin")
    //   {
    //   db.collection("users").doc(datafor2).update({
    //      role:editrole });
    //   }
    //   else
    //   {alert('Input for Role must be "Salesperson" or "Company Admin"' )}
    // }
    if (editemail != "") {
      db.collection("users").doc(datafor2).update({
        email: editemail
      });
    }
    if (editcontact != "") {
      db.collection("users").doc(datafor2).update({
        phoneNumber: contact
      });
    }
    if (editnickname == "" && editemail == "" && editcontact == "") {
      alert("Nothing to UPDATE!");
    }
    else { navigation.goBack() }

    //  alert(editnickname+","+editrole+","+editemail+","+editcontact)
  }


  let openImage = async () => {


    let picker = await ImagePicker.launchImageLibraryAsync()

    if (picker.cancelled === true) {
      return;
    }

    console.log(picker)

    if (picker.uri !== null) {
      const response = await fetch(picker.uri);
      const blob = await response.blob();

      var ref = storage.ref().child("image/" + datafor2).put(blob).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);


          setprofileImage(downloadURL);
          db.collection("users").doc(datafor2).update({
            // db.collection("users").where(data.doc(datafor2))({
            // data.doc(datafor2).update({
            photoURL: downloadURL
          }).then(function () {
            console.log("Document successfully updated!");
          })
            .catch(function (error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });

        });
      });
    }
  }


  useEffect(() => {

    var user = auth.currentUser
    console.log(user)

    db.collection("users").where("UID", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var data = doc.data();
          var data2 = doc.id;
          var name = setname(data.name);
          var nickname = setnickname(data.username)
          var email = setemail(data.email);
          var contactnumber = setphone(data.phoneNumber);
          var photoURL = setprofileImage(data.photoURL);
          var role = setrole(data.role);
          console.log("datafor2 : " + doc.id)
          setdatafor2(doc.id)
          console.log(datafor2)
        });
      })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });

  }, []);



  return (
    <ScrollView>
      <View style={styles.container}>
        <View>

          <TouchableOpacity
            onPress={openImage}
            style={styles.button}>

            <Image source={{ uri: profileimage }} style={styles.image} />



          </TouchableOpacity>
          {/* <ImagePicker style={styles.imagepicker} /> */}

        </View>
        <Text style={styles.instruction}>Username</Text>
        <TouchableOpacity >
          <Text>{name}</Text>
        </TouchableOpacity>

        <Text style={styles.instruction}>Role</Text>
        <TouchableOpacity >
          <Text>{role}</Text>
        </TouchableOpacity>

        <Text style={styles.instruction}>Nickname</Text>
        <TextInput
          style={styles.input}
          placeholder={nickname}
          placeholderTextColor="black"
          onChangeText={(val) => seteditnickname(val)}
        />

        {/* <Text style={styles.instruction}>Role</Text>
          <TextInput
            style={styles.input}
            placeholder={role}
            placeholderTextColor="black"
            onChangeText={(val) => seteditrole(val)}
          /> */}

        <Text style={styles.instruction}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder={email}
          placeholderTextColor="black"
          onChangeText={(val) => seteditemail(val)}
        />

        <Text style={styles.instruction}>Contact</Text>
        <TextInput
          style={styles.input}
          placeholder={phone}
          placeholderTextColor="black"
          onChangeText={(val) => seteditcontact(val)}
        />

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.Button}
            onPress={pressCancel}
          >
            <Text style={styles.ButtonContent}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Button}
            onPress={pressSave}
          >
            <Text style={styles.ButtonContent}>Save</Text>
          </TouchableOpacity>


        </View>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    padding: "10%",
  },

  instruction: {
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    fontSize: 16
  },

  input: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },

  input2: {
    // backgroundColor: "lightgrey",
    // borderWidth:1,
    padding: 10,
    // paddingStart:0,
    borderRadius: 5,
    marginBottom: 10,
  },


  row: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: 'space-around',
  },

  Button: {
    backgroundColor: "black",
    padding: 10,
    width: 130,
    borderRadius: 5,
  },

  ButtonContent: {
    textAlign: 'center',
    color: "white",
    fontWeight: 'bold',
  },

  image: {
    width: 180,
    height: 180,
    alignSelf: "center",
    // borderBottomRightRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    borderRadius: 50
  },

});
