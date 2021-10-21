let isUpdate = false;
let contactObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            setTextValue('.name-error', "");
            return;
        }
        try {
            checkName(name.value);
            setTextValue('.name-error', "");
        } catch (e) {
            setTextValue('.name-error', e);
        }
    });
    const phone = document.querySelector('#phoneNumber');
    phone.addEventListener('input', function() {
        if (phone.value.length == 0) {
            setTextValue('.tel-error', "");
            return;
        }
        try {
            checkPhone(phone.value);
            setTextValue('.tel-error', "");
        } catch (e) {
            setTextValue('.tel-error', e);
        }
    });
    const address = document.querySelector('#address');
    address.addEventListener('input', function() {
        if (address.value.length == 0) {
            setTextValue('.address-error', "");
            return;
        }
        try {
            checkAddress(address.value);
            setTextValue('.address-error', "");
        } catch (e) {
            setTextValue('.address-error', e);
        }
    });
    const zip = document.querySelector('#zip');
    zip.addEventListener('input', function() {
        if (zip.value.length == 0) {
            setTextValue('.zip-error', "");
            return;
        }
        try {
            checkZip(zip.value);
            setTextValue('.zip-error', "");
        } catch (e) {
            setTextValue('.zip-error', e);
        }
    });
    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setContactObject();
        if (site_properties.use_local_storage.match("true")) {
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        } else {
            createOrUpdateContactData();
        }
    } catch (e) {
        console.log(e);
        return;
    }
}
const createOrUpdateContactData = () => {
    let postUrl = site_properties.server_url;
    let methodCall = "POST";
    if (isUpdate) {
        methodCall = "PUT";
        postUrl = postUrl + contactObj.id.toString();
    }
    makeServiceCall(methodCall, postUrl, true, contactObj)
        .then(responseText => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            throw error;
        });
}
const setContactObject = () => {
    if (!isUpdate) contactObj.id = createNewContactId();
    contactObj._name = getInputValueById('#name');
    contactObj._phoneNumber = getInputValueById('#phoneNumber');
    contactObj._address = getInputValueById('#address');
    contactObj._city = getInputValueById('#city');
    contactObj._state = getInputValueById('#state');
    contactObj._zip = getInputValueById('#zip');
    alert("hgghhg");
}

const checkForUpdate = () => {
    const contactJson = localStorage.getItem('editContact');
    isUpdate = contactJson ? true : false;
    if (!isUpdate) return;
    contactObj = JSON.parse(contactJson);
    setForm();
}
const createAndUpdateStorage = () => {
    let contactDataList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (contactDataList) {
        let contactData = contactDataList.find(contact => contact.id == contactObj.id);
        if (!contactData) {
            contactDataList.push(contactObj);
        } else {
            const index = contactDataList.map(contact => contact.id)
                .indexOf(contactData.id);
            contactDataList.splice(index, 1, createContactData(contactData.id));
        }
    } else {
        contactDataList = [contactObj];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(contactDataList));
    window.location.replace(site_properties.home_page);
}

const setContactData = (contactData) => {
    try {
        contactData.name = contactObj._name;
    } catch (e) {
        setTextValue('.name-error', e);
        throw e;
    }
    try {
        contactData.phone = contactObj._phone;
    } catch (e) {
        setTextValue('.tel-error', e);
        throw e;
    }
    try {
        contactData.address = contactObj._address;
    } catch (e) {
        setTextValue('.address-error', e);
        throw e;
    }
    contactData.city = contactObj._city;
    contactData.state = contactObj._state;
    try {
        contactData.zipcode = contactObj._zipcode;
    } catch (e) {
        setTextValue('.zip-error', e);
        throw e;
    }
    alert(contactData.toString());
}

const createNewContactId = () => {
    let contactID = localStorage.getItem("ContactId");
    contactID = !contactID ? 1 : (parseInt(contactID) + 1).toString();
    localStorage.setItem("ContactId", contactID);
    return contactID;
}

const setForm = () => {
    setValue('#name', contactObj._name);
    setValue('#phoneNumber', contactObj._phone);
    setValue('#address', contactObj._address);
    setValue('#city', contactObj._city);
    setValue('#state', contactObj._state);
    setValue('#zip', contactObj._zipcode);
}
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const resetForm = () => {
    setValue('#name', '');
    setValue('#phoneNumber', '');
    setValue('#address', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zip', '');
    setTextValue('.name-error', '');
    setTextValue('.tel-error', '');
    setTextValue('.zip-error', '');
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}