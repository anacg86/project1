$(document).ready(function () {
    
    var getData = getFromSessionStorage("userInfo");
    var BMI = getData.weight/Math.pow(getData.height,2);//Math.round((getData.weight/Math.pow(getData.height,2)),4);
    BMI = BMI.toFixed(2);
    BMI = parseInt(BMI);
    var bodyComplexion = (getData.height * 100) / getData.wrist;
    var WHR = getData.waist / getData.hip;
    console.log(WHR);

    $("#planHeader").text(getData.name + "'s WL Plan");

    
    //BMI CHART
    $(function () {
        
        Highcharts.setOptions({
            chart: {
                inverted: true,
                marginLeft: 40,
                type: 'bullet'
            },
            title: {
                text: null
            },
            legend: {
                enabled: false
            },
            yAxis: {
                gridLineWidth: 0,
                min:13,
                max: 45,
                tickPixelInterval: 50
            },
            plotOptions: {
                series: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    color: '#404040',
                    targetOptions: {
                        width: '150%'
                    }
                }
            },
            credits: {
                enabled: true
            },
            exporting: {
                enabled: false
            }
        });
        
        console.log(BMI);

        var myChart = Highcharts.chart('BMIchart', {
            chart: {
                marginTop: 40
            },
            title: {
                text: 'This is your BMI'
            },
            xAxis: {
                categories: ['']
            },
            yAxis: {
                plotBands: [{
                    from: 0,
                    to: 15,
                    color: '#BC4B4B'//'#B22222'
                }, {
                    from: 15,
                    to: 18.5,
                    color: '#FF8B61' //'#FF7F50'
                }, {
                    from: 18.5,
                    to: 25,
                    color: '#8EEC8E' //'#32CD32'
                }, {
                    from: 25,
                    to: 30,
                    color: '#FDFD62' //'#FFD700'
                }, {
                    from: 30,
                    to: 35,
                    color: '#FFBC66' //'#FF8C00'
                }, {
                    from: 35,
                    to: 40,
                    color: '#FF6D37' //'#FF4500'
                }, {
                    from: 40,
                    to: 50,
                    color: '#FF5454' //'#FF0000'
                }],
                title: null
            },
            series: [{
                data: [{
                    y: BMI,
                    target: 22
                }]
            }],
            tooltip: {
                pointFormat: 'Your BMI is <b>{point.y}</b>. You must get to a {point.target} range)'
            }
        });
    
    }); 6
    
    
    //BODY COMPLEXION CHART FOR MEN
    $(function () {
        
        Highcharts.setOptions({
            chart: {
                inverted: true,
                marginLeft: 40,
                type: 'bullet'
            },
            title: {
                text: null
            },
            legend: {
                enabled: false
            },
            yAxis: {
                gridLineWidth: 0,
                min:8,
                max: 12,
                tickPixelInterval: 50
            },     
            plotOptions: {
                series: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    color: '#404040',
                    targetOptions: {
                        width: '150%'
                    }
                }
            },
            credits: {
                enabled: true
            },
            exporting: {
                enabled: false
            }
        });
        
        console.log(BMI);

        var myChart = Highcharts.chart('bodyComplexChartMen', {
            chart: {
                marginTop: 40
            },
            title: {
                text: "Here's you body complexion"
            },
            xAxis: {
                categories: ['']
            },
            yAxis: {
                plotBands: [{
                    from: 0,
                    to: 9.6,
                    color: '#99CCFF'//'#B22222'
                }, {
                    from: 9.6,
                    to: 10.4,
                    color: '#66B2FF' //'#FF7F50'
                }, {
                    from: 10.4,
                    to: 9e9,
                    color: '#3399FF' //'#32CD32'
                }],
                title: null
            },
            series: [{
                data: [{
                    y: bodyComplexion,
                    target: 10
                }]
            }],
            tooltip: {
                pointFormat: 'Your have a body complexion of <b>{point.y}</b>.'
            }
        });
    
    });



    //Waist Hip Ratio (WHR) CHART
    $(function () {
        
        Highcharts.setOptions({
            chart: {
                inverted: true,
                marginLeft: 40,
                type: 'bullet'
            },
            title: {
                text: null
            },
            legend: {
                enabled: false
            },
            yAxis: {
                gridLineWidth: 0,
                min: 0.7,
                max: 1,
                tickPixelInterval: 80
            },     
            plotOptions: {
                series: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    color: '#404040',
                    targetOptions: {
                        width: '150%'
                    }
                }
            },
            credits: {
                enabled: true
            },
            exporting: {
                enabled: false
            }
        });
        

        var myChart = Highcharts.chart('WHRChart', {
            chart: {
                marginTop: 40
            },
            title: {
                text: "The Waist-Hip ratio you got"
            },
            xAxis: {
                categories: ['']
            },
            yAxis: {
                plotBands: [{
                    from: 0.6,
                    to: 0.78,
                    color: '#FF9999'//'#B22222'
                }, {
                    from: 0.78,
                    to: 0.93,
                    color: '#CCCCFF' //'#FF7F50'
                }, {
                    from: 0.93,
                    to: 9e9,
                    color: '#CCFF99' //'#32CD32'
                }],
                title: null
            },
            series: [{
                data: [{
                    y: WHR,
                    target: 0.85
                }]
            }],
            tooltip: {
                pointFormat: 'Your have a WHR of <b>{point.y}</b>.'
            }
        });
    
    });
        

});