const csvFilePath = 'data.csv'; // Chemin vers votre fichier CSV dans le dépôt

// Fonction pour charger les données depuis le fichier CSV et les afficher dans le tableau
function loadCSV() {
    fetch(csvFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur de chargement du fichier CSV : ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n'); // Divise les données par ligne
            const tableBody = document.getElementById('table-body');
            tableBody.innerHTML = ''; // Efface les lignes précédentes

            rows.forEach((row, index) => {
                if (index === 0) return; // Ignore l'en-tête

                const columns = row.split(';'); // Divise chaque ligne par le séparateur ';'
                if (columns.length < 3) return; // Ignore les lignes invalides

                // Crée une nouvelle ligne pour chaque entrée
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${columns[0]}</td><td>${columns[1]}</td><td>${columns[2]}</td>`;
                tableBody.appendChild(tr);
            });

            console.log('Données affichées dans le tableau.');
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}

// Fonction de recherche pour filtrer le tableau
function searchTable() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#table-body tr');

    rows.forEach(row => {
        const chargerName = row.cells[0].textContent.toLowerCase();
        if (chargerName.includes(searchValue)) {
            row.style.display = ''; // Affiche la ligne
        } else {
            row.style.display = 'none'; // Cache la ligne
        }
    });
}

// Charger les données CSV au chargement de la page
window.onload = loadCSV;
