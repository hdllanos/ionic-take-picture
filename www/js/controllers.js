angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {})
    .controller('TakePictureCtrl', function ($scope, CamService) {
        $scope.executing = false;

            $scope.takePicture = function () {
                $scope.start = "Starting";
                
                //Avoid to doble click over take picture button
                if ($scope.executing === true) {
                    return;
                }
                
                $scope.executing = true;
                
                var options = {
                    quality: 70,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true
                };

                CamService.getPicture(options).then(function (imageData) {
                    
                    var base64Img = "data:image/jpeg;base64," + imageData;
                    $scope.llamando = " Llamando";
                    $scope.camPhotoDirect = imageData;
                    $scope.camPhoto = base64Img;
                    $scope.executing = false;
                    $scope.$apply();

                }, function (err) {

                    $scope.camPhoto = err;
                    $scope.executing = false;
                    $scope.$apply();

                });
            };
        
    });
