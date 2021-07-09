
const PdfPrinter = require('pdfmake/src/printer');
const fs = require('fs');
const moment = require('moment');
const {
    getUserHumanResourcesInfo,
} = require('../repositories/HumanResourceQuery');
const {
    getShiftsEmployeeByDate,
} = require('../repositories/UserQuery');
const formatHoraires = (shiftrenumere) => {
    let body = '';
    for (let i = 0; i < shiftrenumere.arriver.length; i++) {
        body += `${shiftrenumere.arriver[i] ? shiftrenumere.arriver[i].time : ''} - ${shiftrenumere.quitter[i] ? shiftrenumere.quitter[i].time : ''}\n`
    }
    return body;
}
const formatDuree = duree => `${parseInt(duree / 60)}h${((duree / 60) - Math.floor(duree / 60)).toFixed(2)}`
module.exports = (license, site, employee, from, to, output) => new Promise(async (resolve, reject) => {
    try {
        try {
            employee.hr = await getUserHumanResourcesInfo(employee._id);
        } catch (e) {
            employee.hr = { adress: '', zipCode: '', city: '' }
        }
        const shifts = await getShiftsEmployeeByDate(from.format('YYYY-MM-DD'), to.format('YYYY-MM-DD'), employee._id);
        if(shifts.length == 0){
            return resolve('');
        }
        const fonts = {
            Roboto: {
                normal: 'public/fonts/roboto/Roboto-Regular.ttf',
                bold: 'public/fonts/roboto/Roboto-Medium.ttf',
                italics: 'public/fonts/roboto/Roboto-Italic.ttf',
                bolditalics: 'public/fonts/roboto/Roboto-MediumItalic.ttf',
            },
        };
        const printer = new PdfPrinter(fonts);
        let body = [
            ['Date', 'Horaires', 'Etablissement', 'Durée', 'Pause', 'Repas', 'Commentaire'],
        ];
        let dureeTotal = 0;
        let pauseTotal = 0;
        shifts.map(
            shift => {
                pauseTotal += parseInt(shift.absent ? 0 : (shift.repas ? shift.repas : '0'));
                dureeTotal += (shift.absent ? 0 : shift.duree);
                body.push([
                    { text: moment(shift.shiftDate).locale('fr').format('ddd DD/MM/YYYY'), style: 'littleMargin' },
                    { text: formatHoraires(shift.shiftrenumere), style: 'littleMargin' },
                    { text: shift.site.name.toUpperCase(), style: 'littleMargin' },
                    { text: formatDuree(shift.duree), style: 'littleMargin' },
                    { text: `${shift.pauseTotal} min.`, style: 'littleMargin' },
                    { text: shift.repas, style: 'littleMargin' },
                    { text: shift.comment+(shift.absent ?  '\nABSENT' : ''), style: 'littleMargin' },
                ])
            }
        )
        const docDefinition = {
            content: [
                {
                    columns: [
                        { text: `Etablissement ${site.name.toUpperCase()}`, style: 'pageHeader', width: '40%' },
                        { text: `${employee.fname.toUpperCase()} ${employee.lname.toUpperCase()}`, alignment: 'right', style: 'pageHeader', width: '60%' },
                    ],
                },
                {
                    columns: [
                        { text: `${license.enseigne.toUpperCase()}`, style: 'pageHeader', width: '40%' },
                        { text: `${employee.hr.adress.toUpperCase()}`, alignment: 'right', style: 'pageHeader', width: '60%' },
                    ],
                },
                {
                    columns: [
                        { text: `SIRET: ${site.siret.toUpperCase()}`, style: 'pageHeader', width: '40%' },
                        { text: `${employee.hr.zipCode.toUpperCase()} ${employee.hr.city.toUpperCase()}`, alignment: 'right', style: 'pageHeader', width: '60%' },
                    ],
                },
                {
                    table: {
                        widths: ['*'],
                        body: [[' '], [' ']],
                    },
                    layout: {
                        hLineWidth: (i, node) => ((i === 0 || i === node.table.body.length) ? 0 : 1),
                        vLineWidth: () => 0,
                    },
                },
                { text: 'Feuille d\'émargement', style: 'header' },
                { text: `Du ${from.format('DD MMMM')} au ${to.format('DD MMMM')}`, style: 'subheader' },
                {
                    style: 'tableExample',
                    layout: {
                        hLineWidth: (i, node) => ((i === 0 || i === node.table.body.length) ? 0 : 1),
                        vLineWidth: () => 0,
                        hLineColor: () => '#eee',
                    },
                    table: {
                        heights: 20,
                        widths: ['17%', '17%', '20%', '10%', '10%', '8%', '16%'],
                        body: body,
                    },
                },
                {
                    style: 'bigMargin',
                    columns: [
                        {
                            text: `Total des heures travaillés: ${(dureeTotal / 60).toFixed(2)}h`,
                            style: 'bold',
                            width: '60%',
                        },
                        {
                            text: `Total des repas pris: ${pauseTotal}`,
                            style: 'bold',
                            width: '40%',
                        },
                    ],
                },
                {
                    layout: {
                        hLineWidth: () => 0,
                        vLineWidth: () => 0,
                        hLineColor: () => '#eee',
                    },
                    table: {
                        heights: 20,
                        widths: ['33.33%', '33.33%', '33.33%'],
                        alignment: 'center',
                        body: [
                            [
                                {
                                    table: {
                                        widths: ['*'],
                                        body: [[' '], [' ']],
                                    },
                                    layout: {
                                        hLineWidth: (i, node) => ((i === 0 || i === node.table.body.length) ? 0 : 1),
                                        vLineWidth: () => 0,
                                        hLineColor: () => '#ccc',
                                    },
                                },
                                {
                                    table: {
                                        widths: ['*'],
                                        body: [[' '], [' ']],
                                    },
                                    layout: {
                                        hLineWidth: (i, node) => ((i === 0 || i === node.table.body.length) ? 0 : 1),
                                        vLineWidth: () => 0,
                                        hLineColor: () => '#ccc',
                                    },
                                },
                                {
                                    table: {
                                        widths: ['*'],
                                        body: [[' '], [' ']],
                                    },
                                    layout: {
                                        hLineWidth: (i, node) => ((i === 0 || i === node.table.body.length) ? 0 : 1),
                                        vLineWidth: () => 0,
                                        hLineColor: () => '#ccc',
                                    },
                                },
                            ],
                            [
                                { text: 'Signature du responsable', style: 'leftRightMargin' },
                                { text: 'Date', style: 'leftRightMargin' },
                                { text: 'Signature du salarié', style: 'leftRightMargin' },
                            ],
                        ],
                    },
                },
            ],
            styles: {
                bold: {
                    bold: true,
                },
                center: {
                    alignment: 'center',
                },
                littleMargin: {
                    margin: [0, 5, 0, 5],
                },
                leftRightMargin: {
                    margin: [10, 0, 10, 0],
                    alignment: 'center',
                },
                bigMargin: {
                    margin: [0, 35, 0, 35],
                },
                marginGlobal: {
                    margin: [40, 5, 40, 5],
                },
                pageHeader: {
                    fontSize: 10,
                    color: '#555',
                },
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10],
                    alignment: 'center',
                },
                subheader: {
                    fontSize: 14,
                    bold: false,
                    italics: true,
                    alignment: 'center',
                    margin: [0, 0, 10, 5],
                },
                tableExample: {
                    fontSize: 10,
                    margin: [0, 30, 0, 15],
                },
            },
            defaultStyle: {
                // alignment: 'justify'
            },
        };
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(fs.createWriteStream(output));
        pdfDoc.end();
        return resolve(output);
    } catch (e) {
        return reject(e);
    }
});