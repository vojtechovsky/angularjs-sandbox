/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../../app/app.ts" />
/// <reference path="../../../app/common/commonservices.ts" />
/// <reference path="../../../app/mathematic/operandtype.ts" />
/// <reference path="../../../app/mathematic/task.ts" />
/// <reference path="../../../app/mathematic/mathcontroller.ts" />

module App.Mathematic {

    describe("app/mathematic/mathcontroller", () => {
        let $controller: angular.IControllerService;
        let $rootScope: angular.IRootScopeService;
        let app: angular.IModule;
        let mathController: MathController;

        beforeEach(() => {
            mathController = new MathController();
        });
        //beforeEach(angular.mock.module("AppMath"));

        //beforeEach(() => {
        //    app = angular.module("AppMath", ["ui.router", "CommonServices"]);
        //    angular.module("ngMock");
        //});
        
        //it("title_property_isAssigned", () => {
        //    expect(mathController.title).toEqual("alive");
        //});

        it("createNewRandomTask_call_returnsTask", () => {
            const task = mathController.createNewRandomTask();

            expect(task.numberOfTrial).toEqual(0);
            expect(task.inputResolved).toEqual(false);
            expect(task.inputFeedback).toEqual("");
            expect(task.inputTyped).toEqual(null);
            expect(task.inputResultType).toEqual(ResultType.None);
            expect(task.numbers).toBeDefined();
            expect(task.numbers.length).toEqual(2);
            expect(task.operandSymbol).toBeDefined();
            expect(task.operandSymbol.length).toEqual(4);
        });

        it("resolve_inputTypedIsCorrect_Success", () => {
            //arrange
            let task = mathController.createNewRandomTask();
            task.inputTyped = task.result;

            //act
            mathController.resolve(task);

            //assert
            expect(task.result).toEqual(task.inputTyped);
            expect(task.inputResultType).toEqual(ResultType.Success);
            expect(task.inputResolved).toEqual(true);
            expect(task.inputFeedback).toEqual("OK");
               
        });

        it("resolve_inputTypedIsInCorrect_Failure", () => {
            //arrange
            let task = mathController.createNewRandomTask();
            task.inputTyped = task.result+1;

            //act
            mathController.resolve(task);

            //assert
            expect(task.result).not.toEqual(task.inputTyped);
            expect(task.inputResultType).toEqual(ResultType.Failure);
            expect(task.inputResolved).toEqual(false);
            expect(task.inputFeedback).not.toEqual("OK");

        });

        it("resolve_inputTypedIsCorrect_Fixed", () => {
            //arrange
            let task = mathController.createNewRandomTask();
            task.inputTyped = task.result;
            task.numberOfTrial = 1;

            //act
            mathController.resolve(task);

            //assert
            expect(task.inputResultType).toEqual(ResultType.Fixed);
            expect(task.inputResolved).toEqual(true);
            expect(task.inputFeedback).toEqual("OK");

        });

        it("resolve_inputTypedIsCorrect_Fixed", () => {
            //arrange
            let task = mathController.createNewRandomTask();
            task.inputTyped = task.result;
            task.numberOfTrial = 1;

            //act
            mathController.resolve(task);

            //assert
            expect(task.inputResultType).toEqual(ResultType.Fixed);
            expect(task.inputResolved).toEqual(true);
            expect(task.inputFeedback).toEqual("OK");

        });

        it("next_inputTypedIsCorrect_moveToNext", () => {
            //arrange
            let task = mathController.Task;
            task.inputTyped = task.result;
            let currentTaskActiveId = mathController.TaskActiveIndex;

            //act
            let nextTaskActiveId = mathController.next();

            //assert
            expect(nextTaskActiveId).not.toEqual(currentTaskActiveId);
        });

        it("next_inputTypedIsCorrectAndAtTheEndOfTasks_returnsSameTaskId", () => {
            //arrange
            do {
                mathController.Task.inputTyped = mathController.Task.result;
                mathController.next();   
            } while (mathController.TaskActiveIndex + 1 < mathController.TaskCount)

            //act
            //we are at the end now we can call the next how many time we want
            //it will not move
            for (var i = 1; i < 5; i++) {
               mathController.Task.inputTyped = mathController.Task.result;
               mathController.next(); 
            } 
           
            //assert
            expect(mathController.TaskActiveIndex).toEqual(mathController.TaskCount-1);
            expect(mathController.Task.inputResultType).toEqual(ResultType.Success);
            expect(mathController.Task.inputResolved).toEqual(true);
            expect(mathController.IsCompleted).toEqual(true);
        });

        it("next_inputTypedIsInCorrectAndAtTheEndOfTasks_inputResolvedIsFalse", () => {
            //arrange
            do {
                mathController.Task.inputTyped = mathController.Task.result;
                mathController.next();
            } while (mathController.TaskActiveIndex + 1 < mathController.TaskCount)

            //act
            //we are at the end now 
            mathController.Task.inputTyped = mathController.Task.result + 1000;
            mathController.next();
           
            //assert
            expect(mathController.TaskActiveIndex).toEqual(mathController.TaskCount - 1);
            expect(mathController.Task.inputResultType).toEqual(ResultType.Failure);
            expect(mathController.Task.inputResolved).toEqual(false);
            expect(mathController.IsCompleted).toEqual(false);
        });

        it("next_inputTypedIsCorrectAfterFailure_inputResolvedIsTrue", () => {
            //arrange
            do {
                mathController.Task.inputTyped = mathController.Task.result;
                mathController.next();
            } while (mathController.TaskActiveIndex + 1 < mathController.TaskCount)

            //act
            //we are at the end now
            //first incorrect 
            mathController.Task.inputTyped = mathController.Task.result + 1000;
            mathController.next();
            expect(mathController.Task.inputResultType).toEqual(ResultType.Failure);
            expect(mathController.Task.inputResolved).toEqual(false);

            //second correct
            mathController.Task.inputTyped = mathController.Task.result;
            mathController.next();          

            //assert
            expect(mathController.Task.inputResultType).toEqual(ResultType.Fixed);
            expect(mathController.Task.inputResolved).toEqual(true);
            expect(mathController.IsCompleted).toEqual(true);
        });

        it("next_inputTypedIsInCorrectAfterFailure_inputResolvedIsTrue", () => {
            //arrange
            do {
                mathController.Task.inputTyped = mathController.Task.result;
                mathController.next();
            } while (mathController.TaskActiveIndex + 1 < mathController.TaskCount)

            //act
            //we are at the end now
            //first incorrect 
            mathController.Task.inputTyped = mathController.Task.result + 1000;
            mathController.next();
            expect(mathController.Task.inputResultType).toEqual(ResultType.Failure);
            expect(mathController.Task.inputResolved).toEqual(false);

            //second again incorrect
            mathController.Task.inputTyped = mathController.Task.result + 2000;
            mathController.next();          

            //assert
            expect(mathController.Task.inputResultType).toEqual(ResultType.Failure);
            expect(mathController.Task.inputResolved).toEqual(true);

        });

        it("next_inputTypedIsInCorrect_returnsSameTaskId", () => {
            //arrange
            let task = mathController.Task;
            task.inputTyped = task.result+1;
            let currentTaskActiveId = mathController.TaskActiveIndex;
            
            //act
            let nextTaskActiveId = mathController.next();

            //assert
            expect(nextTaskActiveId).toEqual(currentTaskActiveId);
        });



    });
}