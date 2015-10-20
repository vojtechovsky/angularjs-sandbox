/// <reference path="Scripts/sinon-1.7.3.js" />
/// <reference path="../Angular4DotNet/Scripts/angular-min.js"/>
/// <reference path="../Angular4DotNet/Scripts/angular-resource.min.js"/>
/// <reference path="../Angular4DotNet/Scripts/angular-route-min.js"/>
/// <reference path="Scripts/angular-mocks.js"/>
/// <reference path="../Angular4DotNet/Scripts/registration-module.js"/>
/// <reference path="../Angular4DotNet/Scripts/Courses/courses-controller.js"/>
/// <reference path="../Angular4DotNet/Scripts/Courses/course-repository.js"/>

'use strict';

(function () {
    describe('During construction of the controller', function() {
        var scope, controller, courseRepositoryMock, courses;

        beforeEach(function() {
            module('registrationModule');

            inject(function($rootScope, $controller, courseRepository) {
                scope = $rootScope.$new();
                courseRepositoryMock = sinon.stub(courseRepository);
                courses = [{ foo: 'bar' }];
                courseRepositoryMock.get.returns(courses);
                controller = $controller('CoursesController', { $scope: scope });
            });
        });

        it('should set the courses from the repository', function() {
            expect(scope.courses).toBe(courses);
        });
    });
}());