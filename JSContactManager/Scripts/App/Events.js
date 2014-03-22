;
(function () {
    //Keypress event to add contact
    function addContact (f, l) {
        JSContactManager.Firebase.Datastore.push(new JSContactManager.Objects.Contact({ firstName: f, lastName: l }));
    }

    //Event raised when a new child is added to the datastore
    function datastoreChildAdded(snapshot) {
        JSContactManager.Events.CurrentEvent = 'ChildAdded';
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
        if (JSContactManager.Events.CurrentEvent === 'ChildAdded') {
            JSContactManager.Events.CurrentEvent = null;
            return;
        }
        JSContactManager.Helper.UpdateContactInList(snapshot);
        JSContactManager.Helper.ShowContactUpdateMsg();
    }

    //Event raised when when we want to delete any contact data object
    function deleteContact(id) {
        var firebase = new Firebase(JSContactManager.Config.firebaseDatastore + id);
        firebase.remove();
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
    JSContactManager.Events.CurrentEvent = null;
})();
