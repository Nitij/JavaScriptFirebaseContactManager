;
(function ($, w, undefined) {
    //Get Set Go...!!!
    function bootstrapApplication() {
        wireEvents();
    }

    //wire events
    function wireEvents() {
        var $firstName = $('#txtFirstName'),
            $lastName = $('#txtLastName'),
            $lnkUpdateOk = $('#lnkUpdateOk'),
            $lnkUpdateClose = $('#lnkUpdateClose');

        //Wire up kypress event of Last Name.
        $lastName.keypress(function (e) {
            if (e.keyCode == 13) {
                JSContactManager.Events.AddContact.call(null, $firstName.val(), $lastName.val());
                $firstName.val('');
                $lastName.val('');
            }
        });

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
        JSContactManager.Firebase.Datastore.on('child_changed', JSContactManager.Events.DatastoreChildChanged);
    }
    
    w['BootStrapApplication'] = bootstrapApplication;
})(jQuery, window);