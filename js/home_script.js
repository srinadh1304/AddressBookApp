let contactDataList;
window.addEventListener('DOMContentLoaded', (event) => {
    if (site_properties.use_local_storage.match("true")) {
        getContactDataFromStorage();
    } else getContactDataFromServer();
});

const processContactDataResponse = () => {
    document.querySelector(".person-count").textContent = contactDataList.length;
    createInnerHtml();
    localStorage.removeItem('editContact');
}

const getContactDataFromStorage = () => {
    contactDataList = localStorage.getItem('AddressBookList') ? JSON.parse(localStorage.getItem('AddressBookList')) : [];
    processContactDataResponse();
}

const getContactDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
        .then(responseText => {
            contactDataList = JSON.parse(responseText);
            processContactDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status: " + JSON.stringify(error));
            contactDataList = [];
            processContactDataResponse();
        })
}
const createInnerHtml = () => {
    const headerHtml = "<tr><th>FullName</th><th>Address</th><th>City</th><th>State</th><th>Zip code</th><th>Phone Number</th></tr>";
    if (contactDataList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const contactData of contactDataList) {
        innerHtml = `${innerHtml}
        <tr>
            <td>${contactData._name}</td>
            <td>${contactData._address}</td>
            <td>${contactData._city}</td>
            <td>${contactData._state}</td>
            <td>${contactData._zip}</td>
            <td>${contactData._phoneNumber}</td>
            <td>
                <img id="${contactData.id}" onclick="remove(this)" alt="delete"src="../assets/delete-black-18dp.svg" style="padding-right: 5px;">
                <img id="${contactData.id}" alt="edit" onclick="update(this)"src="../assets/create-black-18dp.svg">
            </td>
        </tr>
    `;
        document.querySelector('#table-display').innerHTML = innerHtml;
    }
}
const remove = (node) => {
    let contactData = contactDataList.find(contact => contact.id == node.id);
    if (!contactData) return;
    const index = contactDataList
        .map(contact => contact.id)
        .indexOf(contactData.id);
    contactDataList.splice(index, 1);
    if (site_properties.use_local_storage.match("true")) {
        localStorage.setItem("AddressBookList", JSON.stringify(contactDataList));
        createInnerHtml();
    } else {
        const deleteUrl = site_properties.server_url + contactData.id.toString();
        makeServiceCall("DELETE", deleteUrl, false)
            .then(responseText => {
                createInnerHtml();
            })
            .catch(error => {
                console.log("DELETE Error Status: " + JSON.stringify(error));
            })
    }
}
const update = (node) => {
    let contactData = contactDataList.find(contact => contact.id == node.id);
    if (!contactData) return;
    localStorage.setItem('editContact', JSON.stringify(contactData))
    window.location.replace(site_properties.add_contact_page);
}