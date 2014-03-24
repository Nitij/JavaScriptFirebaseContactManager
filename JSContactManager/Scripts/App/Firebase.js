;
/*JSContactManager.Firebase*/
(function () {
    JSContactManager.Firebase.Datastore = new Firebase(JSContactManager.Config.firebaseDatastore);

    //Method to add a new contact to the datastore
    var addContact = function (contact) {
        JSContactManager.Firebase.Datastore.push(contact);
    }

    //Method to update an existng contact
    var updateContact = function (id, contact) {
        JSContactManager.Firebase.Datastore.child(id).set(contact);
    }

    //Method to delete an existing contact
    var deleteContact = function (id) {
        var firebase = new Firebase(JSContactManager.Config.firebaseDatastore + id);
        firebase.remove();
    }

    //Add the to the firebase namespace
    JSContactManager.Firebase.AddContact = addContact;
    JSContactManager.Firebase.UpdateContact = updateContact;
    JSContactManager.Firebase.DeleteContact = deleteContact;
})();