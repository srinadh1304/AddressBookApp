const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if (!nameRegex.test(name)) throw 'Name is Incorrect!';
}

const checkPhone = (phone) => {
    let phoneRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if (!phoneRegex.test(phone)) throw 'Phone Number is Invalid!';
}

const checkAddress = (address) => {
    let addressRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if (!addressRegex.test(address)) throw 'Address is Incorrect!';
}

const checkZip = (zip) => {
    let zipRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if (!zipRegex.test(zip)) throw 'Zipcode is Incorrect!';
}