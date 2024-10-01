'use strict';



/*Выход из личного кабинета*/

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(data => {
        if (data.success) {   
            location.reload();
        }
    }); 
};



/*Получение информации о пользователе*/

ApiConnector.current(response => { 
    if (response.success) { 
        ProfileWidget.showProfile(response.data)
    }
}
);



/*Получение текущих курсов валюты*/

const ratesBoard = new RatesBoard();

function getCurrencyRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

getCurrencyRates();
setInterval(getCurrencyRates, 60000);



/*Пополнение баланса*/

const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

moneyManager.addMoneyCallback = (money) => { 
    ApiConnector.addMoney(money, (response) => {
        if (response.success) {
            console.log(response);
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Баланс пополнен" );
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}



/*Конвертирование валюты*/

moneyManager.conversionMoneyCallback = (moneyToConvert) => {
    ApiConnector.convertMoney(moneyToConvert, (response) => {
        if (response.success) {
            console.log(response);
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Обмен выполнен" );
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}



/*Перевод валюты*/

moneyManager.sendMoneyCallback = (moneyToTransfer) => {
    ApiConnector.transferMoney(moneyToTransfer, (response) => {
        // updateUsersList();
        if (response.success) {
            console.log(response);
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод выполнен" );
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}



/*Запрос начального списка избранного*/



ApiConnector.getFavorites((response) => {
    if (response.success) { 
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = (userToFavorites) => {
    ApiConnector.addUserToFavorites(userToFavorites, (response) => {
        if (response.success) { 
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь добавлен" );
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}



/*Удаление пользователя из избранного*/

favoritesWidget.removeUserCallback = (userToRemove) => {
    ApiConnector.removeUserFromFavorites(userToRemove, (response) => {
        if (response.success) { 
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь удален" );
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}