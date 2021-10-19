window.addEventListener("DOMContentLoaded", (event) => {
    validateName();
    validatePhoneNumber();
    validateAddress();
    validateZipcode();
});

const validateName = () => {
    const name = document.querySelector("#name");
    name.addEventListener("input", function() {
        if (name.value.length == 0) {
            setTextValue(".name-error", "");
            return;
        }
        try {
            new Contact().name = name.value;
            setTextValue(".name-error", "");
        } catch (error) {
            setTextValue(".name-error", error);
        }
    });
};

const validatePhoneNumber = () => {
    const phoneNumber = document.querySelector("#phoneNumber");
    phoneNumber.addEventListener("input", function() {
        if (phoneNumber.value.length == 0) {
            setTextValue(".tel-error", "");
            return;
        }
        try {
            new Contact().phoneNumber = phoneNumber.value;
            setTextValue(".tel-error", "");
        } catch (error) {
            setTextValue(".tel-error", error);
        }
    });
};

const validateAddress = () => {
    const address = document.querySelector("#address");
    address.addEventListener("input", function() {
        if (address.value.length == 0) {
            setTextValue(".address-error", "");
            return;
        }
        try {
            new Contact().address = address.value;
            setTextValue(".address-error", "");
        } catch (error) {
            setTextValue(".address-error", error);
        }
    });
};

const validateZipcode = () => {
    const zip = document.querySelector("#zip");
    zip.addEventListener("input", function() {
        if (zip.value.length == 0) {
            setTextValue(".zip-error", "");
            return;
        }
        try {
            new Contact().zip = zip.value;
            setTextValue(".zip-error", "");
        } catch (error) {
            setTextValue(".zip-error", error);
        }
    });
};

function save() {
    let contact = new Contact();
    contact.id = new Date().getTime();
    contact.name = getInputValueById("#name");
    contact.phoneNumber = getInputValueById("#phoneNumber");
    contact.address = getInputValueById("#address");
    contact.city = getInputValueById("#city");
    contact.state = getInputValueById("#state");
    contact.zip = getInputValueById("#zip");
    console.log(contact.toString());
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
};

function getInputValueById(property) {
    let value = document.querySelector(property).value;
    return value;
}