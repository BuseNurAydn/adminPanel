//sidebar dropdown
const toggles = document.querySelectorAll('#sidebar .side-dropdown');
toggles.forEach(item => {
    const first = item.parentElement.querySelector('a:first-child');
    first.addEventListener('click', function (event) {
        event.preventDefault();

        if (!this.classList.contains('active')) {
            toggles.forEach(i => {
                const link = i.parentElement.querySelector('a:first-child');
                link.classList.remove('active');
                i.classList.remove('show');
            })

        }
        this.classList.toggle('active');
        item.classList.toggle('show');

    })
});
/********************************************* */
//profile 
const profile = document.querySelector('nav .profile')
const img = profile.querySelector('img');
const dropdown = profile.querySelector('.profile-link');

img.addEventListener('click', function () {
    dropdown.classList.toggle('show');

});
/***************************************** */
//sayfa akışı
document.addEventListener("DOMContentLoaded", function () {

    function loadPage(page) {

        const template = document.getElementById(`${page}-template`);
        const content = template.content.cloneNode(true);

        document.getElementById('page-content').innerHTML = '';
        document.getElementById('page-content').appendChild(content);


        if (page === 'teklifler') {
            setupTekliflerButtons();
        }
    }
    // güncel durum sayfasını başlangıçta yüklemek için
    loadPage('dashboard');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });
    function setupTekliflerButtons() {
        document.querySelectorAll('.buttons .btn').forEach(button => {
            button.addEventListener('click', function () {
                document.querySelectorAll('.buttons .btn').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const content = this.getAttribute('data-content');
                loadTekliflerContent(content);
            });
        });

        loadTekliflerContent('cevap-beklenenler');
    }
    function loadTekliflerContent(content) {
        const template = document.getElementById(`${content}-template`);
        const contentElement = template.content.cloneNode(true);
        const tekliflerContent = document.getElementById('teklifler-content');
        tekliflerContent.innerHTML = '';
        tekliflerContent.appendChild(contentElement);
    }
});
/******************************************************** */
//teklif ekleme ve listeleme
function btnClick() {
    addOffer();
}

function addOffer() {
    const offerName = document.getElementById('offerName').value.trim();
    const invoiceStatus = document.getElementById('invoiceStatus').value.trim();
    const editDate = document.getElementById('editDate').value;
    const offerTO = document.getElementById('offerTO').value.trim();

    if (offerName && invoiceStatus && editDate && offerTO) {
       
        const tablebody = document.getElementById('offerTableBody');
        const newRow = document.createElement('tr');

        const editDateDate = new Date(editDate);
        const today = new Date();

        editDateDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const difference_time = today- editDateDate;
        const difference_day = Math.floor(difference_time / (1000 * 60 * 60 * 24));

        const teklifToplamiFormatted = `${parseFloat(offerTO).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} €`;

        newRow.innerHTML = `
            <td>
                <a href="#"> <i class="fas fa-file"></i>${offerName}</a>
                <p style="margin-left: 14px;">(Kullanıcı tanımlı)</p>
            </td>
            <td>${invoiceStatus}
                <div>
                    <i class="fa-solid fa-envelope"></i>
                    <button style="border-radius: 10px; border: 1px solid #ddd;padding: 2px 5px;"><i class="fa-solid fa-comment"></i>Cevap bekleniyor</button>
                </div>
            </td>
            <td>${editDateDate.toLocaleDateString('tr-TR')}
                <p style="color: red;">(${difference_day} gün önce)</p>
            </td>
            <td>${teklifToplamiFormatted}</td>
        `;

        tablebody.appendChild(newRow);

        document.getElementById('offerName').value = '';
        document.getElementById('invoiceStatus').value = '';
        document.getElementById('editDate').value = '';
        document.getElementById('offerTO').value = '';
    } else {
        alert('Lütfen tüm alanları doldurun.');
    }
}
/********************************************************* */
//kullanıcı ekleme ve listeleme
function btnClick() {
    addRow();
}

function addRow() {

    var user_ad = document.getElementById("user_ad").value.trim();
    var user_soyad = document.getElementById("user_soyad").value.trim();
    var user_phone = document.getElementById("user_phone").value.trim();
    var user_email = document.getElementById("user_email").value.trim();

    if (user_ad === '' || user_soyad === '' || user_phone === '' || user_email === '') {
        alert("Lütfen tüm alanları doldurun.");
        return; // Eksik veri girişi varsa işlem durur
    }
    var userTable = document.getElementById("myTable");
    var tr = userTable.insertRow();

    var tdİsim = tr.insertCell();
    var tdSoyisim = tr.insertCell();
    var tdTel = tr.insertCell();
    var tdEmail = tr.insertCell();

    var user_ad = document.getElementById("user_ad").value;
    var user_soyad = document.getElementById("user_soyad").value;
    var user_phone = document.getElementById("user_phone").value;
    var user_email = document.getElementById("user_email").value;

    tdİsim.appendChild(document.createTextNode(user_ad));
    tdSoyisim.appendChild(document.createTextNode(user_soyad));
    tdTel.appendChild(document.createTextNode(user_phone));
    tdEmail.appendChild(document.createTextNode(user_email));

    document.getElementById("user_ad").value = "";
    document.getElementById("user_soyad").value = "";
    document.getElementById("user_phone").value = "";
    document.getElementById("user_email").value = "";

    tr.appendChild(tdİsim);
    tr.appendChild(tdSoyisim);
    tr.appendChild(tdTel);
    tr.appendChild(tdEmail);
}
/**************************************************** */
// faturalar sayfası satır ekleme , silme 
function createTr(tableID) {
    let bill_body = document.getElementById(tableID);
    let firstTr = bill_body.firstElementChild;
    let trClone = firstTr.cloneNode(true);
    cleanFirstTr(trClone); 
    bill_body.append(trClone);
}
function cleanFirstTr(tr) {
    let children = tr.children;
    children = Array.from(children);
    children.forEach((child, index) => {
        if (index !== children.length - 1) {
            let input = child.querySelector('input');
            if (input) {
                input.value = '';
            }
        }
    });
}
function removeTr(element) {
    let tbody = element.closest('tbody');
    if (tbody.childElementCount > 1) {
        element.closest('tr').remove();
    }
}
/********************************************** */