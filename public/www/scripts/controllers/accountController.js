angular.module('2017Web').controller('AccountController', ['$location', 'AccountService', 'AlertService', '$state', function ($location, AccountService, AlertService, $state) {
    self = this;

    var init = function () {
        self.account = $state.params.account;
    };

    init();

    self.register = function () {
        AccountService.register(self.account, function (data) {
            if (data.error)
                AlertService.alertPopup('錯誤！', data.error);
            else
                AlertService.alertPopup('註冊成功！', '歡迎使用 LINE@iStore');
        });
    };

    self.login = function () {
        AccountService.login(self.account, function (data) {
            if (data.error)
                AlertService.alertPopup('錯誤！', data.error);
            else
                AlertService.alertPopup('登入成功！', '歡迎使用 LINE@iStore');
        });
    };

    self.logout = function () {
        $state.go('user');
    }
}]);