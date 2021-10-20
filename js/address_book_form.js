let addressBookContactJSONObject = {};
let isUpdate = false;
window.addEventListener("DOMContentLoaded", (event) => {


    const name = document.querySelector("#name");
    name.addEventListener("input", function() {
        if (name.value.length == 0) {
            setTextValue(".name-error", "");
            return;
        }
        try {
            checkName(name.value);
            setTextValue(".name-error", "");
        } catch (error) {
            setTextValue(".name-error", error);
        }
    });



    const phoneNumber = document.querySelector("#phoneNumber");
    phoneNumber.addEventListener("input", function() {
        if (phoneNumber.value.length == 0) {
            setTextValue(".tel-error", "");
            return;
        }
        try {
            checkPhone(phoneNumber.value);
            setTextValue(".tel-error", "");
        } catch (error) {
            setTextValue(".tel-error", error);
        }
    });

    const address = document.querySelector("#address");
    address.addEventListener("input", function() {
        if (address.value.length == 0) {
            setTextValue(".address-error", "");
            return;
        }
        try {
            checkAddress(address.value);
            setTextValue(".address-error", "");
        } catch (error) {
            setTextValue(".address-error", error);
        }
    });



    const zip = document.querySelector("#zip");
    zip.addEventListener("input", function() {
        if (zip.value.length == 0) {
            setTextValue(".zip-error", "");
            return;
        }
        try {
            checkZip(zip.value);
            setTextValue(".zip-error", "");
        } catch (error) {
            setTextValue(".zip-error", error);
        }
    });
    checkForUpdate();

});

const save = (event) => {
    try {
        setAddressBookContactJSONObject();
        UpdateLocalStorage();
        resetForm();
        open("../pages/home.html");
    } catch (submitError) {
        alert(submitError);
        return;
    }
};

const UpdateLocalStorage = () => {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressBookList) {
        let contactData = addressBookList.find(contact => contact.id == addressBookContactJSONObject.id);
        if (!contactData) {
            addressBookList.push(createAddressBookContactData());
        } else {
            const index = addressBookList.map(contact => contact.id).indexOf(contactData.id);
            addressBookList.splice(index, 1, createAddressBookContactData(contactData.id));
        }
    } else {
        addressBookList = [createAddressBookContactData()];
    }
    alert("Local Storage Updated Successfully!\nTotal Contacts : " + addressBookList.length);
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

const setAddressBookContactJSONObject = () => {
    addressBookContactJSONObject._name = getValue('#name');
    addressBookContactJSONObject._address = getValue('#address');
    addressBookContactJSONObject._phoneNumber = getValue('#phoneNumber');
    addressBookContactJSONObject._city = getValue('#city');
    addressBookContactJSONObject._state = getValue('#state');
    addressBookContactJSONObject._zip = getValue('#zip');
};


const createAddressBookContactData = (id) => {
    let contactData = new Contact();
    if (!id) contactData.id = createNewContactId();
    else contactData.id = id;
    setAddressBookContactClassObject(contactData);
    return contactData;
}

const setAddressBookContactClassObject = (contactData) => {
    try {
        contactData.name = addressBookContactJSONObject._name;
    } catch (error) {
        setTextValue(".name-error", error);
        throw error;
    }
    try {
        contactData.address = addressBookContactJSONObject._address;
    } catch (error) {
        setTextValue(".address-error", error);
        throw error;
    }
    try {
        contactData.phoneNumber = addressBookContactJSONObject._phoneNumber;
    } catch (error) {
        setTextValue(".tel-error", error);
        throw error;
    }
    contactData.city = addressBookContactJSONObject._city;
    contactData.state = addressBookContactJSONObject._state;
    contactData.zip = addressBookContactJSONObject._zip;
    alert("Added contact   :\n" + contactData.toString());
};

const createNewContactId = () => {
    let contactId = localStorage.getItem("ContactID");
    contactId = !contactId ? 1 : (parseInt(contactId) + 1).toString();
    localStorage.setItem("ContactID", contactId);
    return contactId;
}

const getValue = (propertyId) => {
    let value = document.querySelector(propertyId).value;
    return value;
};

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
};

const resetForm = () => {
    setValue("#name", "");
    setValue("#phoneNumber", "");
    setValue("#address", "");
    setSelectedIndex('#city', 0);
    setSelectedIndex('#state', 0);
    setValue("#zip", "");
    setTextValue(".name-error", "");
    setTextValue(".tel-error", "");
    setTextValue(".address-error", "");
    setTextValue(".zip-error", "");
};

const setValue = (propertyId, value) => {
    const element = document.querySelector(propertyId);
    element.value = value;
};

const setSelectedIndex = (propertyId, index) => {
    const element = document.querySelector(propertyId);
    element.selectedIndex = index;
};

const setForm = () => {
    setValue("#name", addressBookContactJSONObject._name);
    setValue("#phoneNumber", addressBookContactJSONObject._phoneNumber);
    setValue("#address", addressBookContactJSONObject._address);
    setValue("#city", addressBookContactJSONObject._city);
    setValue("#state", addressBookContactJSONObject._state);
    setValue("#zip", addressBookContactJSONObject._zip);
};
const checkForUpdate = () => {
    const personToEditJson = localStorage.getItem("PersonToEdit");
    isUpdate = personToEditJson ? true : false;
    if (!isUpdate) return;
    addressBookContactJSONObject = JSON.parse(personToEditJson);
    setForm();
};

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.setItem = value;
            }
        } else if (item.value === value)
            item.setItem = value;
    });

}