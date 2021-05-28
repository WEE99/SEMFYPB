
	var firebaseConfig = {
	apiKey: "AIzaSyDTp7kOq7aNbIPnBDLFzLzlTd_YWGLTifQ",
	authDomain: "salescustom-55472.firebaseapp.com",
	projectId: "salescustom-55472",
	storageBucket: "salescustom-55472.appspot.com",
	messagingSenderId: "332970386270",
	appId: "1:332970386270:web:93e5d6e9a1ee8992f1a5cf",
	measurementId: "G-V18D9WLVP2"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();
	
	

var db = firebase.firestore();
var GenerateDate = firebase.firestore.Timestamp;

document.getElementById("form").addEventListener('submit',submitForm);

function submitForm(e){
	e.preventDefault();
	
	var name = getInputVal('fullname');
	var company = getInputVal('companyname');
	var email = getInputVal('Email');
	var phoneNo = getInputVal('phoneNo');
	var message = getInputVal('msg');
	var assigned = false;
	var contacted = false;
	var date = "";
	var interest = getInputVal('interest');
	var quote = "";
	var quoteSent = "";
	var result = "";
	var userId = "1234";
	
	db.collection("leads").add({
		name: name,
		company: company,
		email: email,
		contactNumber: phoneNo,
		comment: message,
		assigned: assigned,
		contacted: contacted,
		date: date,
		interest: interest, 
		quote: quote,
		quoteSent: quoteSent,
		result: result,
		userId: userId
	})
	.then((docRef) => {
		console.log("Document written with ID: ", docRef.id);
	})
	.catch((error) => {
		console.error("Error adding document: ", error);
	});
	
	//show alert
	document.querySelector('.alert').style.display = "block";
	
	//hide alert after 3 seconds
	setTimeout(function(){
		document.querySelector('.alert').style.display = "none";
	},3000);
}



function getInputVal(id){
	return document.getElementById(id).value;
}
