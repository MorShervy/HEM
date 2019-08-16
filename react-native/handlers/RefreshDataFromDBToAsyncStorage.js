
import { AsyncStorage } from 'react-native';
import SQL from './SQL';

export default class RefreshDataFromDBToAsyncStorage {

    static SaveToAsyncStorage = async (email, name, url) => {
        const res = await SQL.InsertUserFBandGL(email, name, url)
        AsyncStorage.setItem(
            "user",
            JSON.stringify({
                accountID: res.AccountID,
                email: res.Email,
                name: res.Name,
                url: res.PhotoUrl
            })
        )
        return res
    }

    static GetUserDetailsFromDB = async (user) => {
        const date = new Date();

        const incomes = await SQL.GetIncomeUserByYear(
            user.accountID,
            date.toLocaleDateString()
        );

        const expenses = await SQL.GetExpensesUserByYear(
            user.accountID,
            date.toLocaleDateString()
        );

        const result = {
            incomes: incomes,
            expenses: expenses
        }
        return result;
    }
}

