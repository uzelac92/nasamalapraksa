app.factory('webservice', function ($http) {

    var obj = {};

    obj.putEmail = function (data) {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        return $http.post('http://localhost:8000/api/subscribe/subscribe.php',data)
    }
    obj.putPost = function (data) {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        return $http.post('http://localhost:8000/api/post/create.php',data)
    }
    obj.getPost = function (id) {
        return $http.get('http://localhost:8000/api/post/read_one.php?id='+id);
    }
    obj.getPosts = function () {
        return $http.get('http://localhost:8000/api/post/read.php');
    }
    obj.putQuestion = function (data) {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        return $http.post('http://localhost:8000/api/question/create.php',data)
    }
    obj.getQuestions = function () {
        return $http.get('http://localhost:8000/api/question/read.php');
    }
    obj.editQuestion = function (data) {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        return $http.post('http://localhost:8000/api/question/update.php',data);
    }
    obj.ulogin = function (data) {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        return $http.post(userLink + 'login', data);
    }
    obj.getUserInfo = function (id) {
        return $http.get(userLink + 'getUserInfo/?id=' + id)
    }
    // obj.ireTAXRefund = function (tax_year, status, income, age, taxPaid, uscPaid, prsiPaid, studentType, schoolFees, schoolYear, medicalCardHolder, medicalExpenses, rentBefore, tax_deduc_exp, income2, tax_deduc_exp2, claim_tax_credit, is_self_income_greater, pension, bik, pension2, bik2, selfemploy, pentax) {
    //     return $http.post(calcLink + 'calculateRefund/?tax_year=' + tax_year + '&status=' + status + '&income=' + income + '&age=' + age + '&taxPaid=' + taxPaid + '&uscPaid=' + uscPaid + '&prsiPaid=' + prsiPaid + '&studentType=' + studentType + '&schoolFees=' + schoolFees + '&schoolYear=' + schoolYear + '&medicalCardHolder=' + medicalCardHolder + '&medicalExpenses=' + medicalExpenses + '&rentBefore=' + rentBefore + '&tax_deduc_exp=' + tax_deduc_exp + '&income2=' + income2 + '&tax_deduc_exp2=' + tax_deduc_exp2 + '&claim_tax_credit=' + claim_tax_credit + '&is_self_income_greater=' + is_self_income_greater + '&pension=' + pension + '&bik=' + bik + '&pension2=' + pension2 + '&bik2=' + bik2 + '&selfemploy=' + selfemploy + '&pentax=' + pentax);
    // }
    return obj;

});