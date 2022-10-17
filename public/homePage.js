"use strict"

let logoutBtn = new LogoutButton();

logoutBtn.action = function () {
    ApiConnector.logout(res => {
        if (res.success) {
            location.reload();
        }
    })
};

ApiConnector.current(res => {
    if (res.success) {
        ProfileWidget.showProfile(res.data);
    }
});

let currency = new RatesBoard();

let getCurr = function () {
    ApiConnector.getStocks(res => {
        if (res.success) {
            currency.clearTable();
            currency.fillTable(res.data);
        }
    });
};

getCurr();

let getCurrInterval = setInterval(getCurr, 60000);


let moneyMngr = new MoneyManager();
moneyMngr.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, res => {
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            this.setMessage(res.success, "Средства зачислены успешно!")
        }
        if (res.error) {
            this.setMessage(res.success, res.error)
        }
    });
};
moneyMngr.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, res => {
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            this.setMessage(res.success, "Средства переведены успешно!")
        }
        if (res.error) {
            this.setMessage(res.success, res.error)
        }
    })
};
moneyMngr.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, res => {
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            this.setMessage(res.success, "Средства переданы успешно!")
        }
        if (res.error) {
            this.setMessage(res.success, res.error)
        }
    })
}

let favoritesWgt = new FavoritesWidget();
ApiConnector.getFavorites(res => {
    if (res.success) {
        favoritesWgt.clearTable();
        favoritesWgt.fillTable(res.data);
        moneyMngr.updateUsersList(res.data);
        // favoritesWgt.setMessage(res.success, "Успех")
    }
    if (res.error) {
        favoritesWgt.setMessage(res.success, res.error)

    }
});
favoritesWgt.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, res => {
        if (res.success) {
            favoritesWgt.clearTable();
            favoritesWgt.fillTable(res.data);
            moneyMngr.updateUsersList(res.data);
            favoritesWgt.setMessage(res.success, "Успех добавления в избранное!")
        }
        if (res.error) {
            favoritesWgt.setMessage(res.success, res.error)

        }
    })
};
favoritesWgt.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, res => {
        if (res.success) {
            favoritesWgt.clearTable();
            favoritesWgt.fillTable(res.data);
            moneyMngr.updateUsersList(res.data);
            favoritesWgt.setMessage(res.success, "Успех удаления из избранного!")
        }
        if (res.error) {
            favoritesWgt.setMessage(res.success, res.error)
        }
    })
}