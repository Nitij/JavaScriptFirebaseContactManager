;
/*JSContactManager.Helper*/
JSContactManager.HelperBuilder = function ($, w, undefined) {
    //these will contain a reference to the page controls.
    var $divContactList = $('#divContactList'),
        $divUpdateDialog = $('#divUpdateDialog'),
        $divUIBlocker = $('#divUIBlocker'),
        $txtUpdateFirstName = $divUpdateDialog.find('#txtUpdateFirstName'),
        $txtUpdateLastName = $divUpdateDialog.find('#txtUpdateLastName'),
        $txtUpdateBirthDate = $divUpdateDialog.find('#txtUpdateBirthDate'),
        $txtUpdatePhone = $divUpdateDialog.find('#txtUpdatePhone'),
        $txtUpdateAddress = $divUpdateDialog.find('#txtUpdateAddress'),
        $divMessage = $('#divMessage'),
        helper = {},
        $w = $(w);

    //This function will add a new div row for the newly added child to our datastore
    var drawContactList = function (snapshot) {
        var contact = snapshot.val(),
            contactItemdiv = JSContactManager.Templates.ContactList.ContactItemDiv,
            updateActionLink = JSContactManager.Templates.ContactList.UpdateActionLink,
            deleteActionLink = JSContactManager.Templates.ContactList.DeleteActionLink,
            contactId = snapshot.name(),
            $contactItem = null;

        contactItemdiv = contactItemdiv
            .replace('{{contactId}}', contactId)
            .replace('{{address}}', contact.address)
            .replace('{{id}}', contactId)
            .replace('{{firstName}}', contact.firstName)
            .replace('{{lastName}}', contact.lastName)
            .replace('{{birthDate}}', contact.birthDate)
            .replace('{{phoneNumber}}', contact.phoneNumber)
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
        $divContactList.find('div[contactId="' + id + '"]').fadeOut('slow');
        setTimeout(function () { $divContactList.find('div[contactId="' + id + '"]').remove(); }, 3000)
    };

    //Update existing contact from contact list
    var updateContactInList = function (id, snapshot) {
        var contact = snapshot.val(),
            $divContact = null;

        $divContact = $divContactList.find('div[contactId="' + id + '"]');
        $divContact.find('div[contactFirstName]').text(contact.firstName);
        $divContact.find('div[contactLastName]').text(contact.lastName);
        $divContact.find('div[contactBirthDate]').text(contact.birthDate);
        $divContact.find('div[contactPhone]').text(contact.phoneNumber);
        $divContact.attr('address', contact.address)
    };

    //Show update dialog
    var showUpdateDialog = function (contactId) {
        var $contactDiv = $divContactList.find('div[contactId="' + contactId + '"]'),
            firstName = $contactDiv.find('div[contactFirstName]').text(),
            lastName = $contactDiv.find('div[contactLastName]').text(),
            birthDate = $contactDiv.find('div[contactBirthDate]').text(),
            phoneNumber = $contactDiv.find('div[contactPhone]').text(),
            address = $contactDiv.attr('address');
        
        JSContactManager.DialogParameters = new Object(
            {
                id: contactId                
            });

        resetDialogOnWindowScroll($divUpdateDialog, $divUIBlocker, $w);

        //Turn off window scrolling
        $w.on({'mousewheel': function (e) {
            if (e.target.id == 'el') return;
            e.preventDefault();
            e.stopPropagation();
        }});

        //show the dialog
        $divUpdateDialog.fadeIn();
        $divUIBlocker.fadeIn();

        //set the values
        $txtUpdateFirstName.val(firstName);
        $txtUpdateLastName.val(lastName);
        $txtUpdateBirthDate.val(birthDate);
        $txtUpdatePhone.val(phoneNumber);
        $txtUpdateAddress.val(address);
    }

    //Reset theUI Blocker and Dialog position
    function resetDialogOnWindowScroll($dialog, $blocker, $w) {
        $dialog.css('top', $w.scrollTop() + $w.height() / 2);
        $blocker.css('top', $w.scrollTop());
    }

    //Close the update dialog
    var closeUpdateDialog = function (updateContact) {
        if (updateContact) {
            //if we have valid Dialog Param object then go on updating the contact
            if (JSContactManager.DialogParameters) {
                var dialogParams = JSContactManager.DialogParameters;
                var id = dialogParams.id;
                var contact = new JSContactManager.Objects.Contact(
                    {
                        firstName: $txtUpdateFirstName.val(),
                        lastName: $txtUpdateLastName.val(),
                        birthDate: $txtUpdateBirthDate.val(),
                        phoneNumber: $txtUpdatePhone.val(),
                        address: $txtUpdateAddress.val()
                    });
                JSContactManager.Firebase.UpdateContact(id, contact);
            }
        }

        //Clear dialog parameters
        JSContactManager.DialogParameters = null;

        //Turn on window scrolling here
        $w.off('mousewheel');

        //Hide the dialog
        $divUpdateDialog.fadeOut();
        $divUIBlocker.fadeOut();        
    };

    //Show contact add message div
    var showContactAddMsg = function () {
        showMessage(
            JSContactManager.Config.contactAddMsgColor,
            JSContactManager.Config.contactAddMessage,
            JSContactManager.Config.messageTimeout
        );
    };

    //Show contact add message div
    var showContactUpdateMsg = function () {
        showMessage(
            JSContactManager.Config.contactUpdateMsgColor,
            JSContactManager.Config.contactUpdateMessage,
            JSContactManager.Config.messageTimeout,
            'slow'
        );
    };

    //Show contact add message div
    var showContactDeleteMsg = function () {
        showMessage(
            JSContactManager.Config.contactDeleteMsgColor,
            JSContactManager.Config.contactDeleteMessage,
            JSContactManager.Config.messageTimeout
        );
    };

    //Method to show round message box at the top of the screen
    var showMessage = function (backgroundColor, message, timeout, fadeOutSpeed) {        
        $divMessage.css('background-color', backgroundColor);
        $divMessage.css('top', $w.scrollTop());
        $divMessage.find('#spanMessage').text(message);
        $divMessage.fadeIn();
        setTimeout(function () { $divMessage.fadeOut(fadeOutSpeed); }, timeout);
    };

    //Scrolls down the contact list div to the bottom
    var scrollDownContactList = function () {
        $divContactList.scrollTop($divContactList.prop("scrollHeight"));
    };

    //Assigning to the namespace
    helper.DrawContactList = drawContactList;
    helper.RemoveContactFromList = removeContactFromList;
    helper.UpdateContactInList = updateContactInList;
    helper.CloseUpdateDialog = closeUpdateDialog;
    helper.ShowUpdateDialog = showUpdateDialog;
    helper.CloseUpdateDialog = closeUpdateDialog;
    helper.ShowContactAddMsg = showContactAddMsg;
    helper.ShowContactUpdateMsg = showContactUpdateMsg;
    helper.ShowContactDeleteMsg = showContactDeleteMsg;
    helper.ScrollDownContactList = scrollDownContactList;
    return helper;
};