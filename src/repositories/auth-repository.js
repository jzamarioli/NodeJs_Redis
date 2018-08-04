exports.authenticateUser = (data) => {
    // Mocked validation - you can use a database to accomplish this
    let userData;
    if (data.username == 'user' && data.password == 'pwd')    
    // mocked data being returned
        userData = `{
            "name": "John",
            "username": "${data.username}",
            "company": "ABC Corporation",
            "role": "user",
            "dateOfBirth": "1990-03-03"
        }`;    
    return userData;
}