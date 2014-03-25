;
/*JSContactManager.Firebase*/
(function () {
    JSContactManager.Firebase.Datastore = new Firebase(JSContactManager.Config.firebaseDatastore);

    //Method to add a new contact to the datastore
    var addContact = function (contact) {
        JSContactManager.Firebase.Datastore.push(
            {
                firstName: contact.firstName,
                lastName: contact.lastName,
                birthDate: contact.birthDate,
                phoneNumber: contact.phoneNumber,
                address: contact.address
            });
    }

    //Method to update an existng contact
    var updateContact = function (id, contact) {
        debugger;
        JSContactManager.Firebase.Datastore.child(id).set(
            {
                firstName: contact.firstName,
                lastName: contact.lastName,
                birthDate: contact.birthDate,
                phoneNumber: contact.phoneNumber,
                address: contact.address
            });
    }

    //Method to delete an existing contact
    var deleteContact = function (id) {
        var firebase = new Firebase(JSContactManager.Config.firebaseDatastore + id);
        firebase.remove();
    }

    //Returns the name of the parent of the snapshot passed
    var getParentName = function (snapshot) {
        return snapshot.ref().parent().name();
    };

    //Returns the parent of the snapshot passed
    var getParent = function (snapshot) {
        return snapshot.ref().parent();
    };

    //Add the to the firebase namespace
    JSContactManager.Firebase.AddContact = addContact;
    JSContactManager.Firebase.UpdateContact = updateContact;
    JSContactManager.Firebase.DeleteContact = deleteContact;
    JSContactManager.Firebase.GetParentName = getParentName;
    JSContactManager.Firebase.GetParent = getParent;
})();