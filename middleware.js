const xlsx = require('xlsx');
const DataFile = "./public/documents/report.xlsx";


const getRowByTitle = (title, data) => {
    return data.find(row => {
        const rowTitle = row['title'];
        return typeof rowTitle === 'string' && rowTitle.toLowerCase().includes(title.toLowerCase());
    });
}


module.exports = {
    getFileData: (req, res, next) => {
        try {
            const titleToSearch = req.query['title'];
            const fileLink = req.query['link'];
            const isPreview = req.query['type'];
            const coverImage = req.query['coverImage'];
            // console.log(titleToSearch)

            if (!titleToSearch || !fileLink) {
                return res.status(400).render('error', { message: "Les paramètres <i>title</i> et <i>link</i> sont requis.", error: { status: 400, stack: "" } });
            }

            const workbook = xlsx.readFile(DataFile);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const data = xlsx.utils.sheet_to_json(worksheet);

            const row = getRowByTitle(titleToSearch, data);

            if (row) {
                row['title'] = row['title'].split('.')[0];
                row['fileLink'] = fileLink;
                row['coverImage'] = coverImage;
                row['isPreview'] = isPreview !== undefined;
                req.data = row;

                next();
            } else {
                res.status(404).render('error', { message: "Aucune ligne trouvée pour ce titre.", error: { status: 404, stack: "" } });
            }
        } catch (error) {
            res.status(500).render('error', { message: "Erreur lors de la récupération des données.", error });
        }
    }
}
