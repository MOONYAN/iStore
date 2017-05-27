angular.module('2017Web').controller('UserController', ['$location', 'UserService', 'AlertService', '$state', function ($location, UserService, AlertService, $state) {
    self = this;

    var init = function () {
        self.user = {
            username: '',
            password: ''
        };
        self.lineId = $location.search().lineId || self.lineId;
    };

    init();

    self.register = function () {
        if (!self.user.username || !self.user.username)
            AlertService.alertPopup('錯誤！', '請輸入帳號或密碼');
        else {
            UserService.register(self.user, function (data) {
                if (data.error)
                    AlertService.alertPopup('錯誤！', data.error);
                else {                    
                    $state.go('account',{ account: {
                        userId: data.loginUser._id,
                        username: data.loginUser.username,
                        lineId: self.lineId
                    }});
                }
            });
        }
    };

    self.login = function () {
        if (!self.user.username || !self.user.username)
            AlertService.alertPopup('錯誤！', '請輸入帳號或密碼');
        else {
            UserService.login(self.user, function (data) {
                if (data.error)
                    AlertService.alertPopup('錯誤！', data.error);
                else {
                    $state.go('account',{ account: {
                        userId: data.loginUser._id,
                        username: data.loginUser.username,
                        lineId: self.lineId
                    }});
                }
            });
        }
    };    
}]);
