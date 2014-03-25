;
(function ($, w, undefined) {
    //Get Set Go...!!!
    function bootstrapApplication() {
        wireEvents();
        JSContactManager.Helper = JSContactManager.HelperBuilder(jQuery, window);
        //clear the builder function
        JSContactManager.HelperBuilder = null;
    }

    //wire events
    function wireEvents() {
        var $firstName = $('#txtFirstName'),
            $lastName = $('#txtLastName'),
            $birthDate = $('#txtBirthdate'),
            $phone = $('#txtPhone'),
            $address = $('#txtAddress'),
            $lnkAddContact = $('#lnkAddContact'),
            $lnkUpdateOk = $('#lnkUpdateOk'),
            $lnkUpdateClose = $('#lnkUpdateClose'),
            addContactFunc = function (e) {
                if (e.keyCode === 13
                    || (e.currentTarget.id === 'lnkAddContact' && e.type === 'click')) {
                    JSContactManager.Events.AddContact.call(
                        null,
                        $firstName.val(),
                        $lastName.val(),
                        $birthDate.val(),
                        $phone.val(),
                        $address.val()
                    );
                    $firstName.val('');
                    $lastName.val('');
                    $birthDate.val('');
                    $phone.val('');
                    $address.val('');
                }
            };

        //Wire up kypress event of Last Name.
        $firstName.keypress(addContactFunc);
        $lastName.keypress(addContactFunc);
        $phone.keypress(addContactFunc);
        $address.keypress(addContactFunc);
        $lnkAddContact.click(addContactFunc);

        //Wire up Ok link click event
        $lnkUpdateOk.click(function () {
            JSContactManager.Events.UpdateDialogOk();
            return false;
        });

        //Wire up Close link click event
        $lnkUpdateClose.click(function () {
            JSContactManager.Events.UpdateDialogClose();
            return false;
        });

        JSContactManager.Firebase.Datastore.on('child_added', JSContactManager.Events.DatastoreChildAdded);
        JSContactManager.Firebase.Datastore.on('child_removed', JSContactManager.Events.DatastoreChildRemoved);
        //JSContactManager.Firebase.Datastore.on('child_changed', JSContactManager.Events.DatastoreChildChanged);
    }

    w['BootStrapApplication'] = bootstrapApplication;
})(jQuery, window);