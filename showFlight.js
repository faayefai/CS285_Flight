var allFlights = [{
    "trip": "Oneway",
    "price": 544,
    "airline": "Singapore Airlines",
    "fromAirport": "BKK Bangkok Suvarnabhumi",
    "toAirport": "LHR London Heathrow",
    "takeOffTime": {
        "year": 2020,
        "month": 2,
        "day": 1,
        "hourOfDay": 20,
        "minute": "00",
        "second": 0
    },
    "landingTime": {
        "year": 2020,
        "month": 2,
        "day": 2,
        "hourOfDay": 07,
        "minute": 20,
        "second": 0
    },
    "stopDuration": "1.40",
    "travelHours": "18.20",
    "transitNumber": 2,
    "transits": [{
        "transitAirport": "SIN",
        "transitCountry": "Singapore",
        "transitHours": 2.20,
        "order": 1,
        "flightNO": " SQ983",
        "aircraftType": "Boeing777-200",
        "airline": "Singapore",
        "seatClass": "ECONOMY",
        "remainingSeats": 4
    },
    {
        "transitAirport": "LHR",
        "transitCountry": "England",
        "transitHours": 14.10,
        "order": 2,
        "flightNO": "SQ306",
        "aircraftType": "Boeing747-400",
        "airline": "Singapore",
        "seatClass": "ECONOMY",
        "remainingSeats": 10
    }]
},
{
    "trip": "Oneway",
    "price": 447,
    "airline": "British Airways",
    "fromAirport": "BKK Bangkok Suvarnabhumi",
    "toAirport": "LHR London Heathrow",
    "takeOffTime": {
        "year": 2020,
        "month": 2,
        "day": 1,
        "hourOfDay": 10,
        "minute": 15,
        "second": 0
    },
    "landingTime": {
        "year": 2020,
        "month": 2,
        "day": 2,
        "hourOfDay": 21,
        "minute": "05",
        "second": 0
    },
    "stopDuration": "3.25",
    "travelHours": "18.20",
    "transitNumber": 2,
    "transits": [{
        "transitAirport": "SOV",
        "transitCountry": "Moscow",
        "transitHours": 10.05,
        "order": 1,
        "flightNO": " SQ983",
        "aircraftType": "Boeing777-200",
        "airline": "Aeroflo",
        "seatClass": "ECONOMY",
        "remainingSeats": 4
    },
    {
        "transitAirport": "LHR",
        "transitCountry": "England",
        "transitHours": 4.20,
        "order": 2,
        "flightNO": "SQ306",
        "aircraftType": "Boeing747-400",
        "airline": "Aeroflo",
        "seatClass": "ECONOMY",
        "remainingSeats": 10
    }]
}
];


var flight = angular.module('myApp', []);
flight.controller('controller', function ($scope) {
    var tempHour;
    var servicePrice = 0;
    var flightPrice = 0;
    var total = 0;
    var discount = 0;
    var insure = 0;
    var other = 0;

    $scope.flights = allFlights;

    $scope.takeOffHour = function (pIndex, index) {
        var hour;
        if (index == 0) {
            hour = allFlights[pIndex].takeOffTime.hourOfDay + "." + allFlights[pIndex].takeOffTime.minute;
            hour = parseFloat(hour).toFixed(2);
        }
        else {
            hour = parseFloat(allFlights[pIndex].stopDuration) + parseFloat(tempHour);
            hour = parseFloat(hour).toFixed(2);
        }

        var hourString = "" + hour;
        var spt = hourString.split('.');
        var h = spt[0];
        var m = spt[1];

        if (h >= 24) {
            h = h - 24;
            if (h == 0) {
                h = "00";
            }
        }

        if (m >= 60) {
            m = m - 60;
        }

        hour = h + "." + m;
        hour = parseFloat(hour).toFixed(2);

        return hour;
    };

    $scope.landingHour = function (pIndex, index) {
        if (index == 0) {
            hour = parseFloat(allFlights[pIndex].takeOffTime.hourOfDay + "." + allFlights[index].takeOffTime.minute) + allFlights[index].transits[0].transitHours;

            switch (allFlights[pIndex].transits[0].transitAirport) {
                case "SIN": tempHour = parseFloat(hour + 1).toFixed(2); return tempHour;
                case "SOV": tempHour = parseFloat(hour + 4).toFixed(2); return tempHour;
            }
        }
        else {
            var arrive = allFlights[pIndex].landingTime.hourOfDay + "." + allFlights[pIndex].landingTime.minute;
            return parseFloat(arrive).toFixed(2);
        }

    };

    $scope.fromAirport = function (pIndex, index) {
        if (index == 0) {
            return allFlights[index].fromAirport;
        } else {
            return allFlights[pIndex].transits[0].transitCountry;
        }
    };

    $scope.showPrice = function (index) {
        flightPrice = parseFloat(allFlights[index].price * 31).toFixed(2);
        $scope.flightP = flightPrice;
        total = parseFloat(flightPrice) + 1000;
    };

    $scope.package = function (checkbox, service) {
        if (checkbox) {
            if (service == 'bag') {
                insure += 350;
                servicePrice += 350;
                total += 350;
            }
            if (service == 'insure') {
                insure += 1300;
                servicePrice += 1300;
                total += 1300;
            }
            else if (service == 'delay') {
                other += 150;
                servicePrice += 150;
                total += 150;
            }
            else if (service == 'sms') {
                other += 300;
                servicePrice += 300;
                total += 300;
            }
        } else if (!checkbox) {
            if (service == 'bag') {
                insure -= 350;
                servicePrice -= 350;
                total -= 350;
            }
            else if (service == 'insure') {
                insure -= 1300;
                servicePrice -= 1300;
                total -= 1300;
            }
            else if (service == 'delay') {
                other -= 150;
                servicePrice -= 150;
                total -= 150;
            }
            else if (service == 'sms') {
                other -= 300;
                servicePrice -= 300;
                total -= 300;
            }
        }

        $scope.otherT = other;
        $scope.insureT = insure;
        return servicePrice;
    };

    // $scope.otherPackage = function (checkbox, service) {
    //     if (checkbox) {
    //         if (service == 'delay') {
    //             otherService += 150;
    //             servicePrice += 150;
    //             total += 150;
    //         }
    //         if (service == 'sms') {
    //             otherService += 300;
    //             servicePrice += 300;
    //             total += 300;
    //         }
    //     } else if (!checkbox) {
    //         if (service == 'delay') {
    //             otherService -= 150;
    //             servicePrice -= 150;
    //             total -= 150;
    //         }
    //         if (service == 'sms') {
    //             otherService -= 300;
    //             servicePrice -= 300;
    //             total -= 300;
    //         }
    //     }
    //     $scope.otherT = otherService;
    //     return servicePrice;
    // };

    $scope.discount = function () {
        if ((document.getElementById('insure').checked == true) && (document.getElementById('bag').checked == true)) {
            discount = (1300 + 350) * (10 / 100);
        } else {
            discount = 0;
        }
        return discount;
    };

    $scope.totalPrice = function () {
        return parseFloat(total - discount).toFixed(2);
    };

});
