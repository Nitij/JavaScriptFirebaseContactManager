;
/*JSContactManager.Templates*/
(function () {
    var contactItemDiv = [];
    contactItemDiv.push("<div class='contactItemDiv' contactId = '{{contactId}}' address='{{address}}'>");
    contactItemDiv.push("<div class='contactSubItemDiv borderRadiusTopLeftBottomLeft contactItemPadding' contactFirstName>{{firstName}}</div>");
    contactItemDiv.push("<div class='contactSubItemDiv contactItemPadding' contactLastName>{{lastName}}</div>");
    contactItemDiv.push("<div class='contactSubItemDiv contactItemPadding' contactBirthDate>{{birthDate}}</div>");
    contactItemDiv.push("<div class='contactSubItemDiv contactItemPadding' contactPhone>{{phoneNumber}}</div>");
    contactItemDiv.push("<div class='contactSubItemDiv borderRadiusTopRightBottomRight'>{{actions}}</div>");
    contactItemDiv.push("</div>");
    contactItemDiv = contactItemDiv.join('');

    var updateActionLink = '<a class="updateButton" onClick="{{updateEvent}}">Update</a>&nbsp;';
    var deleteActionLink = '<a class="deleteButton" onClick="{{deleteEvent}}">Delete</a>';

    var contactList =
        {
            ContactItemDiv: contactItemDiv,
            UpdateActionLink: updateActionLink,
            DeleteActionLink: deleteActionLink
        };
    JSContactManager.Templates.ContactList = contactList;
})();