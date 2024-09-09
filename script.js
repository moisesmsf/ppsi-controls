//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
scrollFunction();
};

function scrollFunction() {
if (
document.body.scrollTop > 20 ||
document.documentElement.scrollTop > 20
) {
mybutton.style.display = "block";
} else {
mybutton.style.display = "none";
}
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}

var groupColumn = 6;
const table = $('#controls').DataTable({
    columnDefs: [{ visible: false, targets: groupColumn },{ visible: false, searchable: false, orderable: false, targets: 7 },{ searchable: false, orderable: false, visible: false, targets: 0}],
    paging: false,
    fixedHeader: true,
    responsive: true,
    rowGroup: {
        dataSrc: 6
    },
    language: {
      "search": "Pesquisar:",
      "searchPlaceholder": "Insira o termo para pesquisar",
      "info": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
      "infoEmpty": "Mostrando 0 até 0 de 0 registro(s)",
      "zeroRecords": "Nenhum registro encontrado",
      "infoFiltered": "(Filtrados de _MAX_ registros)"
    },

    initComplete: function () {
        this.api()
            .columns()
            .every(function () {
                let column = this;
                let title = column.footer().textContent;
 
                // Create input element
                let input = document.createElement('input');
                input.placeholder = title;
                column.footer().replaceChildren(input);
 
                // Event listener for user input
                input.addEventListener('keyup', () => {
                    if (column.search() !== this.value) {
                        column.search(input.value).draw();
                    }
                });
            });
    },
});
 
// Order by the grouping
$('#controls tbody').on('click', 'tr.group', function () {
    var currentOrder = table.order()[0];
    if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
        table.order([groupColumn, 'desc']).draw();
    }
    else {
        table.order([groupColumn, 'asc']).draw();
    }
});

const chart = Highcharts.chart('graphic1', {
    chart: {
        type: 'pie',
        styledMode: true
    },
    title: {
        text: 'FUNÇÕES NIST'
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
        }
    },
    series: [
        {
            name: 'Quantidade',
            colorByPoint: true,
            data: chartData(table)
        }
    ]
});


const chart2 = Highcharts.chart('graphic2', {
    chart: {
        type: 'pie',
        styledMode: true
    },
    title: {
        text: 'CIBERSEGURANÇA x PRIVACIDADE'
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
        }
    },
    series: [
        {
            name: 'Quantidade',
            colorByPoint: true,
            data: chartData2(table)
        }
    ]
});

const chart3 = Highcharts.chart('graphic3', {
    chart: {
        type: 'pie',
        styledMode: true
    },
    title: {
        text: 'GRUPOS DE IMPLEMENTAÇÃO (GI)'
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
        }
    },
    series: [
        {
            name: 'Quantidade',
            colorByPoint: true,
            data: chartData3(table)
        }
    ]
});

const chart4 = Highcharts.chart('graphic4', {
    chart: {
        type: 'pie',
        styledMode: true
    },
    title: {
        text: 'CONTROLES'
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
        }
    },
    series: [
        {
            name: 'Quantidade',
            colorByPoint: true,
            data: chartData4(table)
        }
    ]
});

table.on('draw', function () {
    chart.series[0].setData(chartData(table));
    chart2.series[0].setData(chartData2(table));
    chart3.series[0].setData(chartData3(table));
    chart4.series[0].setData(chartData4(table));
});

function chartData(table) {
    var counts = {};
 
    // Count the number of entries for each position
    table
        .column(2, { search: 'applied' })
        .data()
        .each(function (val) {
            if (counts[val]) {
                counts[val] += 1;
            }
            else {
                counts[val] = 1;
            }
        });
 
    return Object.entries(counts).map((e) => ({
        name: e[0],
        y: e[1]
    }));
}

function chartData2(table) {
    var counts = {};
 
    // Count the number of entries for each position
    table
        .column(7, { search: 'applied' })
        .data()
        .each(function (val) {
            if (counts[val]) {
                counts[val] += 1;
            }
            else {
                counts[val] = 1;
            }
        });
 
    return Object.entries(counts).map((e) => ({
        name: e[0],
        y: e[1]
    }));
}

function chartData3(table) {
    var counts = {};
 
    // Count the number of entries for each position
    table
        .column(5, { search: 'applied' })
        .data()
        .each(function (val) {
            if (counts[val]) {
                counts[val] += 1;
            }
            else {
                counts[val] = 1;
            }
        });
 
    return Object.entries(counts).map((e) => ({
        name: e[0],
        y: e[1]
    }));
}

function chartData4(table) {
    var counts = {};
 
    // Count the number of entries for each position
    table
        .column(6, { search: 'applied' })
        .data()
        .each(function (val) {
            if (counts[val]) {
                counts[val] += 1;
            }
            else {
                counts[val] = 1;
            }
        });
 
    return Object.entries(counts).map((e) => ({
        name: e[0],
        y: e[1]
    }));
}
