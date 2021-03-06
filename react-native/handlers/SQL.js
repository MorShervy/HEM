const URL = "http://ruppinmobile.tempdomain.co.il/site04";


export default class SQL {
  static InsertUserFBandGL(email, name, photoUrl) {
    console.log(email, name, photoUrl)

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/InsertUserFBandGL`, {
          body: JSON.stringify({
            email,
            name,
            photoUrl
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        //console.log(`${URL}/InsertUserFBandGL`, res);
        const data = await res.json();
        //console.log("data=", data)
        //if (data.d === null) reject("something went wrong");
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  } //End InsertUserFBandGL

  static InsertUser(email, pass) {
    return new Promise(async (resolve, reject) => {
      console.log(email, " ", pass);
      try {
        const res = await fetch(`${URL}/InsertUser`, {
          body: JSON.stringify({
            email,
            pass
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        //console.log(`${URL}/InsertUser`, res);
        const data = await res.json();
        //console.log("data=", data);
        if (data.d === null) reject("something went wrong");
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  } //End InsertUser

  static Login(email, pass) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/Login`, {
          body: JSON.stringify({
            email,
            pass
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        //console.log(`${URL}/Login`, res);
        const data = await res.json();
        //console.log("data=", data);
        if (data.d === null) reject("something went wrong")
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  } // End Login

  static UpdateUserName(email, name) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/UpdateUserName`, {
          body: JSON.stringify({
            email,
            name
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        //console.log(`${URL}/UpdateUserName`, res);
        const data = await res.json();
        //console.log("data=", data);
        if (data.d === null) reject("something went wrong")
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  } // End UpdateUserName

  static UpdateUserPicture(email, photoUrl) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/UpdateUserPicture`, {
          body: JSON.stringify({
            email,
            photoUrl
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        //console.log(`${URL}/UpdateUserPicture`, res);
        const data = await res.json();
        //console.log("data=", data);
        if (data.d === null) reject("something went wrong")
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  } // End UpdateUserPicture

  static GetIncomeUserByYear(accountID, date) {
    return new Promise(async (resolve, reject) => {
      console.log(accountID, " ", date);
      try {
        const res = await fetch(`${URL}/GetIncomeUserByYear`, {
          body: JSON.stringify({
            accountID,
            date
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        //console.log(`${URL}/GetIncomeUserByYear`, res);
        const data = await res.json();
        //console.log("data=", data);
        //if (data === null) return null//reject("something went wrong")
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  } // End GetIncomeUserByYear


  static GetExpensesUserByYear(accountID, date) {
    return new Promise(async (resolve, reject) => {
      console.log(accountID, " ", date);
      try {
        const res = await fetch(`${URL}/GetExpensesUserByYear`, {
          body: JSON.stringify({
            accountID,
            date
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        //console.log(`${URL}/GetExpensesUserByYear`, res);
        const data = await res.json();
        //console.log("data=", data);
        //if (data === null) reject("something went wrong")
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  } // End GetExpensesUserByYear


  static InsertIncome(income) {
    console.log("SQL.income->", income)
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/InsertIncome`, {
          body: JSON.stringify({
            accountID: income.accountID,
            date: income.date,
            time: income.time,
            amount: income.amount,
            type: income.type
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        //console.log(`${URL}/InsertIncome`, res);
        const data = await res.json();
        //console.log("data=", data);
        if (data.d === null) reject("something went wrong")
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  } // End InsertIncome


  static InsertExpense(expense) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/InsertExpense`, {
          body: JSON.stringify({
            accountID: expense.accountID,
            date: expense.date,
            time: expense.time,
            amount: expense.amount,
            categoryID: expense.categoryID,
            info: expense.info
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        //console.log(`${URL}/InsertExpense`, res);
        const data = await res.json();
        //console.log("data=", data);
        if (data.d === null) reject("something went wrong")
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  } // End InsertExpense

  static DeleteExpense(expense) {
    console.log("expenseSQL=", expense);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/DeleteExpense/`, {
          body: JSON.stringify({
            accountID: expense.accountID,
            date: expense.date,
            time: expense.time,
            amount: expense.amount,
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        console.log(`${URL}/DeleteExpense`, res);
        const data = await res.json();
        console.log("data=", data);
        if (data.d === null) reject("something went wrong")
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  } // End DeleteExpense

  static DeleteIncome(income) {
    console.log("incomeSQL=", income);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${URL}/DeleteIncome/`, {
          body: JSON.stringify({
            accountID: income.accountID,
            date: income.date,
            time: income.time,
            amount: income.amount,
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        console.log(`${URL}/DeleteIncome`, res);
        const data = await res.json();
        console.log("data=", data);
        if (data.d === null) reject("something went wrong")
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  } // End DeleteIncome

  static ImgUpload(imgUri, picName) {
    let urlAPI = "http://ruppinmobile.tempdomain.co.il/site04/uploadpicture";
    let dataI = new FormData();
    dataI.append('picture', {
      uri: imgUri,
      name: picName,
      type: 'image/jpg'
    });

    // Create the config object for the POST
    // You typically have an OAuth2 token that you use for authentication
    const config = {
      method: 'POST',
      // headers: {
      //   'Accept': 'application/json',
      //  // 'Content-Type': 'multipart/form-data;',
      //   'Authorization': 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH',
      // },
      body: dataI,
    }


    fetch(urlAPI, config)
      .then((responseData) => {
        // Log the response form the server

        console.log("res=", responseData.status)
        if (responseData.status == 201) {

          alert(`uploaded successfully!`);
        }
        else {

          alert('error uploding ...');
        }
      })
      .catch(err => {
        alert('err upload= ' + err);

      })
  }


}
