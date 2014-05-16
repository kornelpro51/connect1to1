define(['./module', 'fuelux'], function (module) {
  'use strict';

  module.controller('PatientWidgetController', [
    '$scope',
    '$stateParams',
    '$location',
    '$http',
    'AttributesService',
    'Patients',
    function ($scope, $stateParams, $location, $http, AttributesService, Patients) {
      //-----------------------------------------------

      $scope.errors = '';

      $scope.uiConfig = {
        calendar:{
          height: 450,
          editable: true,
          selectable: true,
          header:{
            left: 'month agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next'
          },
          eventClick: function(calEvent, jsEvent, view){$scope.alertEventClick(calEvent, jsEvent, view, this);}
        },
        demographicInfoList : [],
        clinicalInfoList : []
      };

      var date = new Date();
      date.setHours(10);
      date.setMinutes(0);
      /* event source that contains custom events on the scope */
      $scope.events = [];

      $scope.datepickerOptions = {
      };
      //------------------------------------------------
      // empty patient info for create page
      $scope.patientInfo = {
        name            : '',
        email           : '',
        phone           : '',
        gender          : 'Male',
        birthdate       : '1980-01-01',

        demographicInfo : '',
        clinicalInfo    : '',
        demographicId : '',
        clinicalId    : '',

        schedules       : []
      };

      // Schedule Info
      $scope.scheduleSource = [$scope.events];

      $scope.schInfo = {
        title: '',
        description: '',
        allDay: true,
        recursiveType: 'none',
        start: new Date(date),
        end: new Date(date.getTime() + (3600000)),
        recursiveDate: 1,
        recursiveWeek: 1,
        recursiveMonth: 1,
        recursiveYear: 1,
        recursiveStart: new Date(date),
        recursiveEnd: new Date(date.getTime() + (86400000))
      };
      //-------------------------------------------------

      //var wizard = $('.wizard').wizard('selectedItem');
      //------ Initialize ------------------------------

      /**
       * load Demographic and Clinical information on ctrl init
       */
      $scope.loader = function() {
        AttributesService.getAttributeInfo().then(function(result){
          if(result.err === 0) {
            $scope.uiConfig.demographicInfoList = result.data.dmg;
            $scope.uiConfig.clinicalInfoList = result.data.clc;
            if($scope.uiConfig.demographicInfoList.length) {
              $scope.patientInfo.demographicInfo = $scope.uiConfig.demographicInfoList[0];
            }
            if($scope.uiConfig.clinicalInfoList.length) {
              $scope.patientInfo.clinicalInfo = $scope.uiConfig.clinicalInfoList[0];
            }
          }
        });
      };

      /**
       * create a new Patient
       */

      $scope.createNewPatient = function() {
        $scope.patientInfo.demographicId = $scope.patientInfo.demographicInfo._id;
        $scope.patientInfo.clinicalId = $scope.patientInfo.clinicalInfo._id;
        var patient = new Patients($scope.patientInfo);
        $scope.OpenOverlay();
        patient.$save(
          function (response) {
            $scope.CloseOverlay();
            $location.path('patients/' + response._id);
          },
          function (response) {
            $scope.CloseOverlay();
            $scope.errors = response.data;
          }
        );
      };
      //-------------------------------------------------------
      /**
       * Add new schedule source for recursive event.
       * @param scheduleInfo
       */
      $scope.addScheduleSource = function(scheduleInfo) {

        /**
         *
         * @param recStart : recursive event start datetime (millisecond)
         * @param recEnd : recursive event end datetime (millisecond)
         * @param rangeStart : current calendar view's start date (millisecond)
         * @param rangeEnd : current calendar view's end date (millisecond)
         * @param offset : event to event time (millisecond)
         * @param duration : one event time (millisecond)
         * @returns {{start: *, end: *}}
         */

        function getStartEndTime(recStart, recEnd, rangeStart, rangeEnd, offset, duration) {
          var activeStart, activeEnd;
          var curPos;
          if(recStart >= rangeStart) {
            activeStart = recStart;
          } else {
            var prevEventCnt = Math.floor((rangeStart - recStart) / offset);
            prevEventCnt = Math.ceil((recStart + prevEventCnt * offset + duration - rangeStart) / offset);

            activeStart = prevEventCnt * offset + recStart;
          }
          if(recEnd < rangeEnd) {
            activeEnd = recEnd;
          } else {
            activeEnd = Math.round(Math.floor((rangeEnd - activeStart) / offset) * offset + activeStart);
          }
          return {start: activeStart, end: activeEnd};
        }

        // Add event source for recursive Event.

        $scope.scheduleSource.push(function(start, end, callback) {
          if (scheduleInfo.recursiveStart.getTime() > end.getTime() || scheduleInfo.recursiveEnd.getTime() < start.getTime()) {
            callback([]);
          } else {
            var events = [];                                     // return value;
            var offset = 0, i = 0;                               // offset : one event to next event distance( millisecond )
            var duration = scheduleInfo.end.getTime() - scheduleInfo.start.getTime(); // duration : the time(millisecond) for one event affected.
            var activeRange;
            switch(scheduleInfo.recursiveType) {
              case 'daily':
                offset = scheduleInfo.recursiveDate * 86400000;
                activeRange = getStartEndTime(scheduleInfo.recursiveStart.getTime(),scheduleInfo.recursiveEnd.getTime(), start.getTime(), end.getTime(), offset, duration);
                for( i = activeRange.start; i <= activeRange.end; i += offset ) {
                  events.push({title: scheduleInfo.title, start: Math.round(i / 1000), end : Math.round((i + duration)/1000), allDay: scheduleInfo.allDay, id: scheduleInfo.schIdx});
                }
                break;
              case 'weekly':
                offset = scheduleInfo.recursiveWeek * 7 * 86400000;
                activeRange = getStartEndTime(scheduleInfo.recursiveStart.getTime(),scheduleInfo.recursiveEnd.getTime(), start.getTime(), end.getTime(), offset, duration);
                for( i = activeRange.start; i <= activeRange.end; i += offset ) {
                  events.push({title: scheduleInfo.title, start: Math.round(i / 1000), end : Math.round((i + duration)/1000), allDay: scheduleInfo.allDay, id: scheduleInfo.schIdx});
                }
                break;
              case 'monthly':
                break;
              case 'yearly':
                break;
            }

            callback(events);
          }
        });
      };
      //----------------------------------------------------
      /**
       * control wizard panel
       */

      $scope.goPrev = function() {
        $('.wizard').wizard('previous');
      };

      $scope.goNext = function() {
        if ($('.wizard').wizard('selectedItem').step == 1) {            // The first step - form validation check.
          if ($scope.patient_detail.$valid) {
            $('.wizard').wizard('next');
          } else {
            alert("Please input correct parameters.");
          }
        } else if ($('.wizard').wizard('selectedItem').step == 2) {     // The second step - render calendar.
          $('.wizard').wizard('next');
          var selector = angular.element($('#scheduler').get(0));
          if (selector) {
            var calendarScope = selector.scope();
            calendarScope.calendar.fullCalendar('render');
          }
        } else {                                                        // The third (Last) step - create new patient and send email.
          $scope.createNewPatient();
          //$('.wizard').wizard('next');
        }
      };

      /**
       * Open dialog box for new schedule.
       */
      $scope.openScheduleDlg = function() {
        $("#dlg_scheduleditor").modal();
      };

      /**
       * Create new schedule based on dialog box's form data.
       * @param form
       */
      $scope.createSchedule = function(form) {
        var isValid = true;
        var errMsg = '';

        // Do schedule validation check.
        if (form.$valid) {
          if ($scope.schInfo.start.getTime() >= $scope.schInfo.end.getTime()) {
            isValid = false;
            errMsg = 'The schedule end time should greater than start time.';
          }
          if ($scope.schInfo.recursiveType != 'none') {
            if ($scope.schInfo.recursiveStart.getTime() > $scope.schInfo.recursiveEnd.getTime()) {
              isValid = false;
              errMsg = 'The recursive end date should greater than start date.';
            }
          }
        } else {
          isValid = false;
          errMsg = 'Please enter valid values.';
        }

        // if form is valid, create a new event and add it to the fullcalendar.
        if(isValid) {
          $scope.schInfo.start.setFullYear($scope.schInfo.recursiveStart.getFullYear());
          $scope.schInfo.start.setMonth($scope.schInfo.recursiveStart.getMonth());
          $scope.schInfo.start.setDate($scope.schInfo.recursiveStart.getDate());
          $scope.schInfo.end.setFullYear($scope.schInfo.recursiveStart.getFullYear());
          $scope.schInfo.end.setMonth($scope.schInfo.recursiveStart.getMonth());
          $scope.schInfo.end.setDate($scope.schInfo.recursiveStart.getDate());

          var newSchedule = angular.copy($scope.schInfo);
          newSchedule.schIdx = (new Date()).getTime();
          $scope.patientInfo.schedules.push(newSchedule);
          if ($scope.schInfo.recursiveType == 'none') {
            $scope.events.push(newSchedule);
          } else {
            $scope.addScheduleSource(newSchedule);
          }
          $("#dlg_scheduleditor").data("modal").hide();
          $scope.resetSchedule();
        } else {
          alert(errMsg);
        }
      };

      /**
       * Remove selected schedule
       * @param sch
       */
      $scope.removeSchedule = function(sch) {
        var idx;
        if (sch.recursiveType == 'none') { // The case - single mode
          for ( idx in $scope.events ) {
            if(sch.schIdx == $scope.events[idx].schIdx) {
              $scope.events.splice(idx, 1);
              break;
            }
          }
        } else {                           // The case - recursive mode
          var isMatchEvent = false;
          var checkEventIsEqual = function(events){
            if(events.length>0) {
              if(events[0].id == sch.schIdx) {
                isMatchEvent = true;
              }
            }
          };
          for ( idx in $scope.scheduleSource) {
            if(typeof $scope.scheduleSource[idx] == 'function') {
              $scope.scheduleSource[idx](new Date(1970,0,1), new Date(2049,11,31), checkEventIsEqual);
              if (isMatchEvent) {
                $scope.scheduleSource.splice(idx, 1);
                break;
              }
            }
          }
        }
        $scope.patientInfo.schedules.splice($scope.patientInfo.schedules.indexOf(sch), 1);
      };

      /**
       * Reset the new schedule form.
       */
      $scope.resetSchedule = function() {
        $scope.schInfo.title          = '';
        $scope.schInfo.description    = '';
        $scope.schInfo.allDay         = true;
        $scope.schInfo.recursiveType  = 'none';
        $scope.schInfo.recursiveDate  = 1;
        $scope.schInfo.recursiveWeek  = 1;
        $scope.schInfo.recursiveMonth = 1;
        $scope.schInfo.recursiveYear  = 1;
        $scope.schInfo.recursiveStart = new Date(date);
        $scope.schInfo.recursiveEnd   = new Date(date.getTime() + (86400000));
      };

      // ---------- Fullcalendar ----------------------------

      /**
       * Full calendar event
       * -- We have to implement this functionality for modification and deletion of schedule on fullcalendar.
       * @param calEvent
       * @param jsEvent
       * @param view
       */
      $scope.alertEventClick = function(calEvent, jsEvent, view) {
        //alert('event selected');
      };

      //-------------- Utility functions -------------------------

      /**
       * Phone number validation check.
       * @param value
       * @returns {*}
       */
      $scope.validatePhone = function(value) {
        var re = /^\d{3}-\d{3}-\d{4}$/;
        if (value === '' || typeof value == 'undefined')
          return true;
        if (re.test(value))
          return true;
        return undefined;
      };

      $scope.OpenOverlay = function() {
        $("#dlg_loading").modal('show');
      };

      $scope.CloseOverlay = function() {
        $("#dlg_loading").modal('hide');
      };
    }
  ]);
});
