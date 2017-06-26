var express = require('express')
 
var app = express();
 
app.get('/notes', function(req, res) {
  res.json({notes: "This is your notebook. Edit this to start saving your notes!"})
})

var OktaAPI = require('okta-node');
var okta = new OktaAPI("00o3PjjSYWmfc5hX1so6bzHIFa7UUToPR8RnfWj9HJ", "dev-948407",true);
// Create a profile object that Okta can recognize 
var newProfile = okta.users.helpers.constructProfile("RamaTestMail", "gmail", "ramashankar_m@outlook.com");
// Create a credentials object 
var newCreds = okta.users.helpers.constructCredentials("superPass1", "What is my favorite book?" , "Deep Six");
// Send the request off to Okta 
var newUser;
okta.users.add(newProfile, newCreds, false, function(data) {
    if(!data.success) {
        console.log("Something went wrong: " + data.error);
        okta.users.list("ramashankar",false,function(data){
            console.log("fetching the usr details",data.resp[1]);
        });
        return;
    } else {
        console.log("Successfully provisioned new user!");
        newUser = data.resp;
        doThings();
    }
});
 
 function doThings() {
    //doCoolThingsWith(newUser);
    //doMoreCoolThingsWith(newUser);
    okta.users.activate(newUser.id, true, null);
}
app.listen(3000)