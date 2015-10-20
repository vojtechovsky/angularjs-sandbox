module App.ApiaryVideo {

    class VideoController {

        public title: string;
        public videos : App.ApiaryVideo.IVideo[];

        
        static $inject = ["VideoService"];
        constructor(private service: App.ApiaryVideo.VideoService) {

            this.title = "VideoController is OK";

            var resourceClass = service.getVideoResourceClass();
            resourceClass.query((data: App.ApiaryVideo.IVideo[]) => {
                this.videos = data;
            });
        }

        public loadVideos() {
            alert("loadVideos");
          //this.videos =  this.service.getVideos();
        }
    }

    //registration of the controller
    // give me module "DemoServiceModule"
    var module = angular.module("DemoServiceModule");

    //register new controller "VideoController" into module "DemoServiceModule"
    module.controller("VideoController", VideoController);

}