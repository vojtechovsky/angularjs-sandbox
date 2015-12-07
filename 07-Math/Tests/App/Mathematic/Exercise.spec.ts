/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../../typings/lodash/lodash.d.ts" />

/// <reference path="../../../app/app.ts" />
/// <reference path="../../../app/common/commonservices.ts" />
/// <reference path="../../../app/mathematic/operandtype.ts" />
/// <reference path="../../../app/mathematic/task.ts" />
/// <reference path="../../../app/mathematic/mathcontroller.ts" />
/// <reference path="../../../app/mathematic/exercisebuilder.ts" />
/// <reference path="../../../app/mathematic/exercise.ts" />
/// <chutzpah_reference path="../../../scripts/lodash.min.js" />

module App.Mathematic {
    
    describe("Exercise", () => {
        let $controller: angular.IControllerService;
        let $rootScope: angular.IRootScopeService;
        let app: angular.IModule;
        
        //beforeEach(angular.mock.module("AppMath"));

        //beforeEach(() => {
        //    app = angular.module("AppMath", ["ui.router", "CommonServices"]);
        //    angular.module("ngMock");
        //});
        
        //it("title_property_isAssigned", () => {
        //    expect(mathController.title).toEqual("alive");
        //});

        it("constructor_default_createsObject", () => {
            //assert
            expect(new App.Mathematic.Exercise()).toBeDefined();
        });

        it("constructor_operandCountRange_excerciseHasFiveOrSixOperandCount", () => {
            // arrange,act
            var exercise = ExerciseBuilder.operatorType(App.Mathematic.OperatorType.Plus, App.Mathematic.OperatorType.Minus)
                .operandRange(0, 10)
                .operandCountRange(5,6)
                .resultRange(0, 10)
                .taskCount(10)
                .create();

            //assert
            expect(_.inRange(exercise.task.operands.length, 5, 7)).toEqual(true, "Number of opreands should be 5 or 6, but was:" + exercise.task.operands.length);
            
        });

        it("constructor_taskCount_returns10Tasks", () => {
            // arrange,act

            var exercise = ExerciseBuilder.operatorType(App.Mathematic.OperatorType.Plus, App.Mathematic.OperatorType.Minus)
                .operandRange(0,10)
                .resultRange(0,10)
                .taskCount(10)
                .create();

            //assert
            expect(exercise.tasks.length).toEqual(10);
        });

        it("constructor_operatorTypes_returnsOperatorTypesInRange", () => {
            // arrange,act
            var exercise = ExerciseBuilder.operatorType(App.Mathematic.OperatorType.Plus, App.Mathematic.OperatorType.Minus)
                .operandRange(0, 10)
                .operandCountRange(5, 6)
                .resultRange(0, 10)
                .taskCount(100)
                .create();

            let operandsAll = _.all(exercise.tasks, (task) => {
                return ((task.operatorTypes[0] === App.Mathematic.OperatorType.Minus)
                    || (task.operatorTypes[0] === App.Mathematic.OperatorType.Plus));
            });

            expect(operandsAll).toEqual(true);

        });

        it("createNewRandomTask_call_returnsTask", () => {
            let exercise = new App.Mathematic.Exercise(); 
            const task = exercise.createNewRandomTask();
            //write to console
            console.log(JSON.stringify(task, null, 4));

            expect(task.numberOfTrial).toEqual(0,"numberOfTrial");
            expect(task.inputResolved).toEqual(false);
            expect(task.inputTyped).toEqual(null);
            expect(task.inputResultType).toEqual(ResultType.None);
            expect(task.operands).toBeDefined();
            expect(task.operands.length).toEqual(2);
        });

        it("check_inputTypedIsCorrect_Success", () => {
            //arrange
            let exercise = new App.Mathematic.Exercise();
            let task = exercise.createNewRandomTask();
            task.inputTyped = task.result;

            //act
            exercise.check(task);

            //assert
            expect(task.result).toEqual(task.inputTyped);
            expect(task.inputResultType).toEqual(ResultType.Success, "Result must be Success");
            expect(task.inputResolved).toEqual(true);
            expect(task.inputFeedback).toEqual("OK");
               
        });

        it("check_inputTypedIsInCorrect_Failure", () => {
            //arrange
            let exercise = new App.Mathematic.Exercise();
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
            let exercise = new App.Mathematic.Exercise();
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
            let exercise = new App.Mathematic.Exercise();
            let task = exercise.createNewRandomTask();
            task.inputTyped = task.result;
            task.numberOfTrial = 1;

            //act
            exercise.check(task);

            //assert
            expect(task.inputResultType).toEqual(ResultType.Fixed, "Must be fixed");
            expect(task.inputResolved).toEqual(true);
            expect(task.inputFeedback).toEqual("OK");

        });

        it("next_inputTypedIsCorrect_moveToNext", () => {
            //arrange
            let exercise = new App.Mathematic.Exercise();
            let task = exercise.task;
            task.inputTyped = task.result;
            let currentTaskActiveId = exercise.taskActiveIndex;

            //act
            let nextTaskActiveId = exercise.next();

            //assert
            expect(nextTaskActiveId).not.toEqual(currentTaskActiveId);
        });

        it("next_inputTypedIsNOTCorrect_moveToNext", () => {
            //arrange
            let exercise = new App.Mathematic.Exercise();
            let task = exercise.task;
            task.inputTyped = task.result+1;
            let currentTaskActiveId = exercise.taskActiveIndex;

            //act
            let nextTaskActiveId = exercise.next();

            //assert
            expect(nextTaskActiveId).not.toEqual(currentTaskActiveId);
            expect(task.inputResolved).toEqual(true,"next means resolved must be true");
        });

        it("check_inputTypedIsCorrectAndAtTheEndOfTasks_returnsSameTaskId", () => {
            //arrange
            let exercise = new App.Mathematic.Exercise();
            do {
                exercise.task.inputTyped = exercise.task.result;
                exercise.next();   
            } while (exercise.taskActiveIndex + 1 < exercise.tasks.length)

            //act
            //we are at the end now we can call the next how many time we want
            //it will not move
            for (var i = 1; i < 5; i++) {
               exercise.task.inputTyped = exercise.task.result;
               exercise.check(exercise.task); 
            } 
           
            //assert
            expect(exercise.taskActiveIndex).toEqual(exercise.tasks.length-1);
            expect(exercise.task.inputResultType).toEqual(ResultType.Success);
            expect(exercise.task.inputResolved).toEqual(true,"correct at the end must be resolved");
            expect(exercise.isCompleted).toEqual(true,"");
        });

        it("check_inputTypedIsNOTCorrectAndAtTheEndOfTasks_inputResolvedIsTrue", () => {
            //arrange
            let exercise = new App.Mathematic.Exercise();
            do {
                exercise.task.inputTyped = exercise.task.result;
                exercise.next();
            } while (exercise.taskActiveIndex + 1 < exercise.tasks.length)

            //act
            //we are at the end now 
            exercise.task.inputTyped = exercise.task.result + 1000;
            exercise.check(exercise.task);
           
            //assert
            expect(exercise.taskActiveIndex).toEqual(exercise.tasks.length - 1,"TaskActiveIndex");
            expect(exercise.task.inputResultType).toEqual(ResultType.Failure,"inputResultType must be failure");
            expect(exercise.task.inputResolved).toEqual(false, "inputResolved");
            expect(exercise.isCompleted).toEqual(false, "IsCompleted");
        });

        it("check_inputTypedIsCorrectAfterFailure_inputResolvedIsTrue", () => {
            //arrange
            let exercise = new App.Mathematic.Exercise();
            do {
                exercise.task.inputTyped = exercise.task.result;
                exercise.next();
            } while (exercise.taskActiveIndex + 1 < exercise.tasks.length)

            //act
            //we are at the end now
            //first incorrect 
            exercise.task.inputTyped = exercise.task.result + 1000;
            exercise.check(exercise.task);
            expect(exercise.task.inputResultType).toEqual(ResultType.Failure);
            expect(exercise.task.inputResolved).toEqual(false);

            //second correct
            exercise.task.inputTyped = exercise.task.result;
            exercise.check(exercise.task);          

            //assert
            expect(exercise.task.inputResultType).toEqual(ResultType.Fixed);
            expect(exercise.task.inputResolved).toEqual(true);
            expect(exercise.isCompleted).toEqual(true);
        });

        it("check_inputTypedIsNOTCorrectAfterFailure_inputResolvedIsTrue", () => {
            //arrange
            let exercise = new App.Mathematic.Exercise();
            do {
                exercise.task.inputTyped = exercise.task.result;
                exercise.next();
            } while (exercise.taskActiveIndex + 1 < exercise.tasks.length)

            //act
            //we are at the end now
            //first incorrect 
            exercise.task.inputTyped = exercise.task.result + 1000;
            exercise.check(exercise.task);
            expect(exercise.task.inputResultType).toEqual(ResultType.Failure);
            expect(exercise.task.inputResolved).toEqual(false);

            //second again incorrect
            exercise.task.inputTyped = exercise.task.result + 2000;
            exercise.next();          

            //assert
            expect(exercise.task.inputResultType).toEqual(ResultType.Failure);
            expect(exercise.task.inputResolved).toEqual(true);

        });

        it("next_inputTypedIsInCorrect_movesTonextTaskId", () => {
            //arrange
            let exercise = new App.Mathematic.Exercise();
            let task = exercise.task;
            task.inputTyped = task.result+1;
            let currentTaskActiveId = exercise.taskActiveIndex;
            
            //act
            let nextTaskActiveId = exercise.next();

            //assert
            expect(nextTaskActiveId).toEqual(currentTaskActiveId+1);
        });
    });
}