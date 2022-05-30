var app = angular.module('myApp', []).controller('controller', function ($scope, $http, $filter) {

    $scope.workWithGoods = "expend";
    $scope.storage = true;
    $scope.product = [
        {
            id: 1,
            name: "horalka",
            price: 0.50,
            storageStatus: 5,
            totallyPrice: 0.50 * 5
        },
        {
            id: 2,
            name: "kávenka",
            price: 0.41,
            storageStatus: 10,
            totallyPrice: 0.41 * 10
        },
    ]

    $scope.getProductInfo = function () {
        $scope.product.forEach(x => {
            if (parseInt($scope.goodsId) === x.id) {
                $scope.productId = x.id;
                $scope.productname = x.name;
                $scope.productPrice = x.price;
                $scope.productStorageStatus = x.storageStatus;
                $scope.totallyPrice = x.totallyPrice;
            }
        });
    }

    function setNewValues() {
        if (!!$scope.goodsId && $scope.numOfGoods && !!$scope.priceOfGoods) {
            $scope.getProductInfo();
            if ($scope.workWithGoods === "expend") {
                increasingStock();
            } else {
                inventoryReduction()
            }
        } else {
            $scope.errorMsg = "Vyplňte všetky polia"
            return
        }
    }

    function increasingStock() {
        $scope.product.forEach(x => {
            if (x.id == $scope.goodsId) {
                var numOfGoods = parseInt($scope.numOfGoods);
                var priceOfGoods = parseFloat($scope.priceOfGoods);
                var storageStatus = $scope.productStorageStatus + numOfGoods;
                var price = numOfGoods * priceOfGoods;
                var totallyPrice = $scope.totallyPrice + price;
                const newData = $scope.product.map(obj => {
                    if (obj.id == $scope.goodsId) {
                        return { ...obj, id: $scope.goodsId, totallyPrice: totallyPrice, storageStatus: storageStatus }
                    }
                    return obj;
                });
                $scope.goodsId = null;
                $scope.numOfGoods = null;
                $scope.priceOfGoods = null;
                $scope.confirmMsg = "Navyšovanie zásob na položke" + " " + $scope.productname + " " + "úšpesné";
                $scope.product = newData;

            }
        })
    }

    function inventoryReduction() {
        $scope.product.forEach(x => {
            if (x.id == $scope.goodsId) {
                var numOfGoods = parseInt($scope.numOfGoods);
                var priceOfGoods = parseFloat($scope.priceOfGoods);
                var storageStatus = $scope.productStorageStatus - numOfGoods;
                var price = numOfGoods * priceOfGoods;
                var totallyPrice = $scope.totallyPrice - price;
                const newData = $scope.product.map(obj => {
                    if (obj.id == $scope.goodsId) {
                        return { ...obj, id: $scope.goodsId, totallyPrice: totallyPrice, storageStatus: storageStatus }
                    }
                    return obj;
                });
                $scope.goodsId = null;
                $scope.numOfGoods = null;
                $scope.priceOfGoods = null;
                $scope.confirmMsg = "Odobratie zásob na položke" + " " + $scope.productname + " " + "úšpesné";
                $scope.product = newData;
            }
        })
    }

    $scope.submited = function () {
        setNewValues();
    }

    // $scope.createNewProduct = function () {
    //     $scope.addProduct = true;
    // }

    // $scope.saveNewProduct = function () {
    //     if (!!$scope.newProdId && !!$scope.prodName && !!$scope.prodPriceOfGoods && !!$scope.prodNumOfGoods) {
    //         $scope.errorMsgProd = null;
    //         $scope.inputData = [{
    //             id: $scope.newProdId,
    //             name: $scope.prodName,
    //             price: parseFloat($scope.prodPriceOfGoods),
    //             storageStatus: parseFloat($scope.prodNumOfGoods),
    //             totallyPrice: parseFloat($scope.prodPriceOfGoods) * parseFloat($scope.prodNumOfGoods),
    //         }];
    //         var add = $scope.inputData.filter(a => !$scope.product.find(b => b.id === a.id));
    //         var result = [...$scope.product, ...add];
    //         $scope.product = result

    //         $scope.newProdId = null;
    //         $scope.prodName = null;
    //         $scope.prodPriceOfGoods = null;
    //         $scope.prodNumOfGoods = null;
    //         $scope.prodPriceOfGoods = null;
    //         $scope.addProduct = false;
    //         $scope.confirmMsg = "Nový produkt" + " " + $scope.productname + " " + "úšpesné pridaný";
    //     } else {
    //         $scope.errorMsgProd = "Ako chceš pridať tovať bez údajov ? "
    //     }
    // }

});
