const URL = "http://ruppinmobile.tempdomain.co.il/site04/WebServiceM.asmx";

export default class SQL {
  static InsertUserFBandGL(email, name, photoUrl) {
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
        console.log(`${URL}/InsertUserFBandGL`, res);
        const data = await res.json();
        if (data.d === null) reject("something went wrong");
        resolve(data.d);
      } catch (error) {
        reject(error);
      }
    });
  } //End InsertUserFBandGL

  static InsertUser(email, pass) {
    return new Promise(async (resolve, reject) => {
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
        if (data.d === null) reject("something went wrong");
        resolve(JSON.parse(data.d));
      } catch (error) {
        reject(error);
      }
    });
  } //End InsertUser
}
