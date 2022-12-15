import Table from 'cli-table'
import config from './config.js';

function printTable(datas) {

    var table = new Table({
        head: config.csvHeaders,
        chars: {
            'top': '═',
            'top-mid': '╤',
            'top-left': '╔',
            'top-right': '╗',
            'bottom': '═',
            'bottom-mid': '╧',
            'bottom-left': '╚',
            'bottom-right': '╝',
            'left': '║',
            'left-mid': '╟',
            'mid': '─',
            'mid-mid': '┼',
            'right': '║',
            'right-mid': '╢',
            'middle': '│'
        },
        colWidths: [11, 11, 11, 11, 11, 11, 11],
        style: {
            "text-color": "blue"
        }

    });

    datas.forEach(element => {

        table.push(element);
    });
    console.log(table.toString());
    return
}


export default printTable