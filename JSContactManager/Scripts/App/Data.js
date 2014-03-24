;
/*JSContactManager.Objects*/
(function () {
    var contact = function (config) {
        this.firstName = config.firstName || 'New';
        this.lastName = config.lastName || 'Contact';
        this.birthDate = config.birthDate || (function () {
            var currentdate = new Date(),
                datetime = currentdate.getFullYear() + "-"
                    + (currentdate.getMonth() + 1) + "-"
                    + currentdate.getDate();
            return datetime;
        })();                                
        this.phoneNumber = config.phoneNumber || '0000000000';
        this.address = config.address || 'Some Address';
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