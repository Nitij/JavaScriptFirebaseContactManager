;
(function () {
    var contact = function (config) {
        this.firstName = config.firstName || 'New';
        this.lastName = config.lastName || 'Contact';
    };

    contact.prototype =
        {
            getFullName: function () {
                var fullname = [];
                fullname.push(this.firstName);
                fullname.push(' ');
                fullname.push(this.lastName);
                return fullname;
            }
        };
    JSContactManager.Objects.Contact = contact;
})();