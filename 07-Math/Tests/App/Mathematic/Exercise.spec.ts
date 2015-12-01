/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../../typings/lodash/lodash.d.ts" />

/// <reference path="../../../app/app.ts" />
/// <reference path="../../../app/common/commonservices.ts" />
/// <reference path="../../../app/mathematic/operandtype.ts" />
/// <reference path="../../../app/mathematic/task.ts" />
/// <reference path="../../../app/mathematic/mathcontroller.ts" />
/// <reference path="../../../app/mathematic/exercise.ts" />
/// <chutzpah_reference path="../../../scripts/lodash.min.js" />

module App.Mathematic {

    describe("app/mathematic/exercise", () => {
        let $controller: angular.IControllerService;
        let $rootScope: angular.IRootScopeService;
        let app: angular.IModule;
        let exercise: Excercise;

        beforeEach(() => {
            exercise = new Excercise(2, [OperandType.Minus, OperandType.Plus], 3);
        });
        //beforeEach(angular.mock.module("AppMath"));

        //beforeEach(() => {
        //    app = angular.module("AppMath", ["ui.router", "CommonServices"]);
        //    angular.module("ngMock");
        //});
        
        //it("title_property_isAssigned", () => {
        //    expect(mathController.title).toEqual("alive");
        //});

        it("Excercise_generateTasks_returnsObject", () => {

            exercise = new Excercise(2, [OperandType.Minus, OperandType.Plus, , OperandType.Multiplication], 4);
            expect(exercise).toBeDefined();
            expect(exercise.TaskCount).toEqual(4);
            
            expect(exercise.TaskActiveIndex).toEqual(0);
            expect(exercise.Task).toBeDefined();

            let operandsAll = _.all(exercise.Tasks, (task) => { return (task.operand === OperandType.Minus) || (task.operand === OperandType.Plus) });

            expect(operandsAll).toEqual(true);

            var users = [
                { 'user': 'barney', 'active': true },
                { 'user': 'fred', 'active': false }
            ];

            // using the `_.matches` callback shorthand
            let result = _.some(users, { 'user': 'barney', 'active': false });
            expect(result).toEqual(false);
        });

        it("createNewRandomTask_call_returnsTask", () => {
            const task = exercise.createNewRandomTask();
            //write to console
            console.log(JSON.stringify(task, null, 4));

            expect(task.numberOfTrial).toEqual(0,"numberOfTrial");
            expect(task.inputResolved).toEqual(false);
            expect(task.inputTyped).toEqual(null);
            expect(task.inputResultType).toEqual(ResultType.None);
            expect(task.numbers).toBeDefined();
            expect(task.numbers.length).toEqual(2);
            expect(task.operandSymbol).toBeDefined();
            expect(task.operandSymbol.length).toEqual(4);
        });

        it("check_inputTypedIsCorrect_Success", () => {
            //arrange
            let task = exercise.createNewRandomTask();
            task.inputTyped = task.result;

            //act
            exercise.check(task);

            //assert
            expect(task.result).toEqual(task.inputTyped);
            expect(task.inputResultType).toEqual(ResultType.Success);
            expect(task.inputResolved).toEqual(true);
            expect(task.inputFeedback).toEqual("OK");
               
        });

        it("check_inputTypedIsInCorrect_Failure", () => {
            //arrange
            let task = exercise.createNewRandomTask();
            task.inputTyped = task.result+1;

            //act
            exercise.check(task);

            //assert
            expect(task.result).not.toEqual(task.inputTyped);
            expect(task.inputResultType).toEqual(ResultType.Failure);
            expect(task.inputResolved).toEqual(false);
            expect(task.inputFeedback).not.toEqual("OK");

        });

        it("check_inputTypedIsCorrect_Fixed", () => {
            //arrange
            let task = exercise.createNewRandomTask();
            task.inputTyped = task.result;
            task.numberOfTrial = 1;

            //act
            exercise.check(task);

            //assert
            expect(task.inputResultType).toEqual(ResultType.Fixed);
            expect(task.inputResolved).toEqual(true);
            expect(task.inputFeedback).toEqual("OK");

        });

        it("check_inputTypedIsCorrect_Fixed", () => {
            //arrange
            let task = exercise.createNewRandomTask();
            task.inputTyped = task.result;
            task.numberOfTrial = 1;

            //act
            exercise.check(task);

            //assert
            expect(task.inputResultType).toEqual(ResultType.Fixed);
            expect(task.inputResolved).toEqual(true);
            expect(task.inputFeedback).toEqual("OK");

        });

        it("next_inputTypedIsCorrect_moveToNext", () => {
            //arrange
            let task = exercise.Task;
            task.inputTyped = task.result;
            let currentTaskActiveId = exercise.TaskActiveIndex;

            //act
            let nextTaskActiveId = exercise.next();

            //assert
            expect(nextTaskActiveId).not.toEqual(currentTaskActiveId);
        });

        it("next_inputTypedIsNOTCorrect_moveToNext", () => {
            //arrange
            let task = exercise.Task;
            task.inputTyped = task.result+1;
            let currentTaskActiveId = exercise.TaskActiveIndex;

            //act
            let nextTaskActiveId = exercise.next();

            //assert
            expect(nextTaskActiveId).not.toEqual(currentTaskActiveId);
            expect(task.inputResolved).toEqual(true,"next means resolved must be true");
        });

        it("check_inputTypedIsCorrectAndAtTheEndOfTasks_returnsSameTaskId", () => {
            //arrange
            do {
                exercise.Task.inputTyped = exercise.Task.result;
                exercise.next();   
            } while (exercise.TaskActiveIndex + 1 < exercise.TaskCount)

            //act
            //we are at the end now we can call the next how many time we want
            //it will not move
            for (var i = 1; i < 5; i++) {
               exercise.Task.inputTyped = exercise.Task.result;
               exercise.check(exercise.Task); 
            } 
           
            //assert
            expect(exercise.TaskActiveIndex).toEqual(exercise.TaskCount-1);
            expect(exercise.Task.inputResultType).toEqual(ResultType.Success);
            expect(exercise.Task.inputResolved).toEqual(true,"correct at the end must be resolved");
            expect(exercise.IsCompleted).toEqual(true,"");
        });

        it("check_inputTypedIsNOTCorrectAndAtTheEndOfTasks_inputResolvedIsTrue", () => {
            //arrange
            do {
                exercise.Task.inputTyped = exercise.Task.result;
                exercise.next();
            } while (exercise.TaskActiveIndex + 1 < exercise.TaskCount)

            //act
            //we are at the end now 
            exercise.Task.inputTyped = exercise.Task.result + 1000;
            exercise.check(exercise.Task);
           
            //assert
            expect(exercise.TaskActiveIndex).toEqual(exercise.TaskCount - 1,"TaskActiveIndex");
            expect(exercise.Task.inputResultType).toEqual(ResultType.Failure,"inputResultType must be failure");
            expect(exercise.Task.inputResolved).toEqual(false, "inputResolved");
            expect(exercise.IsCompleted).toEqual(false, "IsCompleted");
        });

        it("check_inputTypedIsCorrectAfterFailure_inputResolvedIsTrue", () => {
            //arrange
            do {
                exercise.Task.inputTyped = exercise.Task.result;
                exercise.next();
            } while (exercise.TaskActiveIndex + 1 < exercise.TaskCount)

            //act
            //we are at the end now
            //first incorrect 
            exercise.Task.inputTyped = exercise.Task.result + 1000;
            exercise.check(exercise.Task);
            expect(exercise.Task.inputResultType).toEqual(ResultType.Failure);
            expect(exercise.Task.inputResolved).toEqual(false);

            //second correct
            exercise.Task.inputTyped = exercise.Task.result;
            exercise.check(exercise.Task);          

            //assert
            expect(exercise.Task.inputResultType).toEqual(ResultType.Fixed);
            expect(exercise.Task.inputResolved).toEqual(true);
            expect(exercise.IsCompleted).toEqual(true);
        });

        it("check_inputTypedIsNOTCorrectAfterFailure_inputResolvedIsTrue", () => {
            //arrange
            do {
                exercise.Task.inputTyped = exercise.Task.result;
                exercise.next();
            } while (exercise.TaskActiveIndex + 1 < exercise.TaskCount)

            //act
            //we are at the end now
            //first incorrect 
            exercise.Task.inputTyped = exercise.Task.result + 1000;
            exercise.check(exercise.Task);
            expect(exercise.Task.inputResultType).toEqual(ResultType.Failure);
            expect(exercise.Task.inputResolved).toEqual(false);

            //second again incorrect
            exercise.Task.inputTyped = exercise.Task.result + 2000;
            exercise.next();          

            //assert
            expect(exercise.Task.inputResultType).toEqual(ResultType.Failure);
            expect(exercise.Task.inputResolved).toEqual(true);

        });

        it("next_inputTypedIsInCorrect_movesTonextTaskId", () => {
            //arrange
            let task = exercise.Task;
            task.inputTyped = task.result+1;
            let currentTaskActiveId = exercise.TaskActiveIndex;
            
            //act
            let nextTaskActiveId = exercise.next();

            //assert
            expect(nextTaskActiveId).toEqual(currentTaskActiveId+1);
        });
    });
}