;
(function ($, undefined) {
    //this will contain a reference to the contact list div.
    var $divContactList = null,
        $divUpdateDialog = null,
        $divUIBlocker = null,
        $txtUpdateFirstName = null,
        $txtUpdateLastName = null,
        $divMessage = null;

    //This function will add a new div row for the newly added child to our datastore
    var drawContactList = function (snapshot) {
        var contact = snapshot.val(),
            contactItemdiv = JSContactManager.Templates.ContactList.ContactItemDiv,
            updateActionLink = JSContactManager.Templates.ContactList.UpdateActionLink,
            deleteActionLink = JSContactManager.Templates.ContactList.DeleteActionLink,
            contactId = snapshot.name(),
            $contactItem = null;

        if (!$divContactList)
            $divContactList = $('#divContactList');

        contactItemdiv = contactItemdiv
            .replace('{{contactId}}', contactId)
            .replace('{{id}}', contactId)
            .replace('{{firstName}}', contact.firstName)
            .replace('{{lastName}}', contact.lastName)
            .replace('{{actions}}'
                    , updateActionLink.replace('{{updateEvent}}', "JSContactManager.Helper.ShowUpdateDialog('" + contactId + "')")
                    + deleteActionLink.replace('{{deleteEvent}}', "JSContactManager.Events.DeleteContact('" + contactId + "')"));
        $contactItem = $(contactItemdiv);
        $contactItem.css('display', 'none');
        $divContactList.append($contactItem);
        $contactItem.fadeIn('slow');
    };

    //remove contact item from contact list
    var removeContactFromList = function (snapshot) {
        var id = snapshot.name();
        if (!$divContactList)
            $divContactList = $('#divContactList');
        $divContactList.find('div[contactId="' + id + '"]').fadeOut('slow');
        setTimeout(function () { $divContactList.find('div[contactId="' + id + '"]').remove(); }, 3000)
    };

    //Update existing contact from contact list
    var updateContactInList = function (snapshot) {
        var id = snapshot.name(),
            contact = snapshot.val();
        if (!$divContactList) 
            $divContactList = $('#divContactList');

        $divContactList.find('div[contactId="' + id + '"]').find('div[contactFirstName]').text(contact.firstName);
        $divContactList.find('div[contactId="' + id + '"]').find('div[contactLastName]').text(contact.lastName);
    };

    //Show update dialog
    var showUpdateDialog = function (contactId) {
        if (!$divContactList)   $divContactList = $('#divContactList');
        if (!$divUpdateDialog)  $divUpdateDialog = $('#divUpdateDialog');
        if (!$divUIBlocker) $divUIBlocker = $('#divUIBlocker');
        if (!$txtUpdateFirstName) $txtUpdateFirstName = $('#txtUpdateFirstName');
        if (!$txtUpdateLastName) $txtUpdateLastName = $('#txtUpdateLastName');
        
        var firstName = $divContactList.find('div[contactId="' + contactId + '"]').find('div[contactFirstName]').text(),
            lastName = $divContactList.find('div[contactId="' + contactId + '"]').find('div[contactLastName]').text();
        
        JSContactManager.DialogParameters = new Object(
            {
                id: contactId                
            });

        //show the dialog
        $divUpdateDialog.fadeIn();
        $divUIBlocker.fadeIn();

        //set the values
        $txtUpdateFirstName.val(firstName);
        $txtUpdateLastName.val(lastName);
    }

    //Close the update dialog
    var closeUpdateDialog = function (updateContact) {
        if (!$divUpdateDialog)  $divUpdateDialog = $('#divUpdateDialog');
        if (!$divUIBlocker) $divUIBlocker = $('#divUIBlocker');
        if (updateContact) {
            if (!$txtUpdateFirstName) $txtUpdateFirstName = $('#txtUpdateFirstName');
            if (!$txtUpdateLastName) $txtUpdateLastName = $('#txtUpdateLastName');

            //if we have valid Dialog Param object then go on updating the contact
            if (JSContactManager.DialogParameters) {
                var dialogParams = JSContactManager.DialogParameters;
                var id = dialogParams.id;
                var contact = new JSContactManager.Objects.Contact({ firstName: $txtUpdateFirstName.val(), lastName: $txtUpdateLastName.val() })
                JSContactManager.Firebase.Datastore.child(id).set(contact);
            }
        }

        //Clear dialog parameters
        JSContactManager.DialogParameters = null;

        //hide the dialog
        $divUpdateDialog.fadeOut();
        $divUIBlocker.fadeOut();        
    };

    //Show contact add message div
    var showContactAddMsg = function () {
        if (!$divMessage) $divMessage = $('#divMessage');

        $divMessage.css('background-color', JSContactManager.Config.contactAddMsgColor);
        $divMessage.find('#spanMessage').text(JSContactManager.Config.contactAddMessage);
        $divMessage.fadeIn();
        setTimeout(function () { $divMessage.fadeOut(); }, JSContactManager.Config.messageTimeout);
    };

    //Show contact add message div
    var showContactUpdateMsg = function () {
        if (!$divMessage) $divMessage = $('#divMessage');

        $divMessage.css('background-color', JSContactManager.Config.contactUpdateMsgColor);
        $divMessage.find('#spanMessage').text(JSContactManager.Config.contactUpdateMessage);
        $divMessage.fadeIn();
        setTimeout(function () { $divMessage.fadeOut('slow'); }, JSContactManager.Config.messageTimeout);
    };

    //Show contact add message div
    var showContactDeleteMsg = function () {
        if (!$divMessage) $divMessage = $('#divMessage');

        $divMessage.css('background-color', JSContactManager.Config.contactDeleteMsgColor);
        $divMessage.find('#spanMessage').text(JSContactManager.Config.contactDeleteMessage);
        $divMessage.fadeIn();
        setTimeout(function () { $divMessage.fadeOut(); }, JSContactManager.Config.messageTimeout);

    };

    //Assigning to the namespace
    JSContactManager.Helper.DrawContactList = drawContactList;
    JSContactManager.Helper.RemoveContactFromList = removeContactFromList;
    JSContactManager.Helper.UpdateContactInList = updateContactInList;
    JSContactManager.Helper.CloseUpdateDialog = closeUpdateDialog;
    JSContactManager.Helper.ShowUpdateDialog = showUpdateDialog;
    JSContactManager.Helper.CloseUpdateDialog = closeUpdateDialog;
    JSContactManager.Helper.ShowContactAddMsg = showContactAddMsg;
    JSContactManager.Helper.ShowContactUpdateMsg = showContactUpdateMsg;
    JSContactManager.Helper.ShowContactDeleteMsg = showContactDeleteMsg;
})(jQuery);