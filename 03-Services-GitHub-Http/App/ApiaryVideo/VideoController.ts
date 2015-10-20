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

        public mockVideos() {
            this.videos = [
                { id: 1, title: "mock video 01" },
                { id: 2, title: "mock video 02" },
                { id: 3, title: "mock video 03" },
                { id: 4, title: "mock video 04" },
                { id: 5, title: "mock video 05" },
                { id: 6, title: "mock video 06" }
            ]
        }
    }

    //registration of the controller
    // give me module "DemoServiceModule"
    var module = angular.module("DemoServiceModule");

    //register new controller "VideoController" into module "DemoServiceModule"
    module.controller("VideoController", VideoController);

}