﻿module App.ApiaryVideo {

    //web api url
    const VIDEO_URL = "http://private-d3791-angulajstutorial.apiary-mock.com/videos"; 

    //extend the ng.Resource interface
    export interface IResourceVideo extends ng.resource.IResource<App.ApiaryVideo.IVideo> {
        
    }

    //define interface for the service
    export interface IVideoService {
        getVideoResourceClass(): ng.resource.IResourceClass<IResourceVideo>; 

        //getVideos(): IVideo[];
    }

    //implement concrete service class
    export class VideoService implements IVideoService {
        videos: App.ApiaryVideo.IVideo[];

        static $inject = ["$resource"];
        constructor(private $resource: ng.resource.IResourceService) {

        }

        getVideoResourceClass(): ng.resource.IResourceClass<IResourceVideo> {
            return this.$resource(VIDEO_URL);
        }

    }

    //get the CommonServices module
    let moduleCs = angular.module("CommonServices");
    //register there VideoService
    moduleCs.service("VideoService", VideoService);

}