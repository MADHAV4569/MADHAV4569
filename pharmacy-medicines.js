document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pharmacyId = urlParams.get('pharmacyId');

    if (pharmacyId) {
        fetchPharmacyDetails(pharmacyId);
    }

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', filterMedicines);
});

async function fetchPharmacyDetails(pharmacyId) {
    try {
        // Replace with your API endpoint to fetch pharmacy details
        const response = await fetch('/api/pharmacies/${pharmacyId}');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const pharmacy = await response.json();

        document.getElementById('pharmacy-name').textContent = pharmacy.name;
        populateMedicineList(pharmacy.medicines);
    } catch (error) {
        console.error('Error fetching pharmacy details:', error);
        alert('Failed to load pharmacy details.');
    }
}

function populateMedicineList(medicines) {
    const medicineList = document.getElementById('medicine-list');
    medicineList.innerHTML = '';

    medicines.forEach(medicine => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${medicine.name}</td>
            <td>${medicine.expiry}</td>
            <td>$${medicine.cost.toFixed(2)}</td>
            <td>${medicine.stock}</td>
        `;
        medicineList.appendChild(row);
    });
}

function filterMedicines() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const medicines = document.querySelectorAll('#medicine-list tr');

    medicines.forEach(medicine => {
        const name = medicine.querySelector('td:first-child').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            medicine.style.display = '';
        } else {
            medicine.style.display = 'none';
        }
    });
}