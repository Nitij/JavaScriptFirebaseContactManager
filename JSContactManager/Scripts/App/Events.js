;
/*JSContactManager.Events*/
(function () {
    //Keypress event to add contact
    function addContact(firstName, lastName, birthDate, phone, address) {
        var contact = new JSContactManager.Objects.Contact(
            {
                firstName: firstName,
                lastName: lastName,
                birthDate: birthDate,
                phoneNumber: phone,
                address: address
            });
        JSContactManager.Firebase.AddContact(contact);
        JSContactManager.Helper.ScrollDownContactList();
    }

    //Event raised when a new child is added to the datastore
    function datastoreChildAdded(snapshot) {
        var childData = new Firebase(JSContactManager.Config.firebaseDatastore + snapshot.name());
        childData.on('child_changed', JSContactManager.Events.DatastoreChildChanged);
        JSContactManager.Helper.DrawContactList(snapshot);
        JSContactManager.Helper.ShowContactAddMsg();
    }

    //Event raised when a new child is deleted from the datastore
    function datastoreChildRemoved(snapshot) {
        JSContactManager.Helper.RemoveContactFromList(snapshot);
        JSContactManager.Helper.ShowContactDeleteMsg();
    }

    //Event raised when a new child is changed in the datastore
    function datastoreChildChanged(snapshot) {
        debugger;
        var parentName = JSContactManager.Firebase.GetParentName(snapshot),
            parent = JSContactManager.Firebase.GetParent(snapshot)
        JSContactManager.Helper.UpdateContactInList(parentName, parent);
        JSContactManager.Helper.ShowContactUpdateMsg();
    }

    //Event raised when when we want to delete any contact data object
    function deleteContact(id) {
        JSContactManager.Firebase.DeleteContact(id);
        return false;
    }

    //Ok link click event of update contact dialog
    function updateDialogOk() {
        JSContactManager.Helper.CloseUpdateDialog(true);
    }

    //Close event of update contact dialog
    function updateDialogClose() {
        JSContactManager.Helper.CloseUpdateDialog();        
    }

    //Adding these events to the namespace
    JSContactManager.Events.AddContact = addContact;
    JSContactManager.Events.DatastoreChildAdded = datastoreChildAdded;
    JSContactManager.Events.DatastoreChildRemoved = datastoreChildRemoved;
    JSContactManager.Events.DatastoreChildChanged = datastoreChildChanged;
    JSContactManager.Events.DeleteContact = deleteContact;
    JSContactManager.Events.UpdateDialogOk = updateDialogOk;
    JSContactManager.Events.UpdateDialogClose = updateDialogClose;
})();
