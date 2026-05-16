// =========================================================================
// 1. CẤU HÌNH CƠ BẢN
// =========================================================================
const GITHUB_BASE = "https://cdn.jsdelivr.net/gh/vatlieugaumienphi/vatlieugaumienphi@main/images/";

// 🔴 DÁN LINK GOOGLE SHEET (ĐỊNH DẠNG CSV) VÀO ĐÂY:
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1p8sDX7-HX9fporKf4JJr9js-BBn4JwuNzeqGLtq56A4/export?format=csv&gid=0"; 

const ITEMS_PER_PAGE = 20; 

// 👑 NÚT GẠT VIP TỔNG: 
// - Đổi thành 'true' nếu muốn TẤT CẢ mọi Tab đều là VIP. 
// - Để 'false' nếu muốn tùy chỉnh từng Tab bên dưới.
const MAKE_ALL_VIP = false; 

// =========================================================================
// 2. HÀM TỰ ĐỘNG TẠO DỮ LIỆU (ĐÃ CẬP NHẬT LOGIC VIP TỪNG TAB)
// =========================================================================
function autoGen(type, folderName, filePrefix, ext, count, folderUrl, vipList = []) {
    let items = [];
    for (let i = 1; i <= count; i++) {
        let isItemVip = false;
        if (MAKE_ALL_VIP === true || vipList === true) {
            isItemVip = true;
        } else if (Array.isArray(vipList) && vipList.includes(i)) {
            isItemVip = true;
        }

        items.push({
            id: `${type}-${i}`,
            type: type,                   
            title: `${filePrefix}${i}`,
            img: `${GITHUB_BASE}${folderName}/${filePrefix}${i}${ext}`, 
            linkDown: "#", 
            linkFolder: folderUrl,              
            isVip: isItemVip
        });
    }
    return items;
}

// 🌟 THIẾT LẬP KHO DỮ LIỆU
let resourceData = [
    // Cách 1: Gạt VIP cho CẢ TAB bằng cách điền chữ true ở cuối
    ...autoGen('nv', 'nhanvat', 'nhan vat ', '.png', 45, 'https://drive.google.com/drive/folders/1-l0dT9gH_P9oqHBBjJbo-fCaeLfCUKlP?usp=sharing', []),
    
    // Cách 2: Chỉ VIP vài cái cụ thể (ví dụ ảnh 1, 3, 5) bằng cách dùng mảng []
    ...autoGen('bc', 'bieucam', 'bieu cam ', '.png', 30, 'LINK_DRIVE_FOLDER_BC', [1, 3, 5]),

    // Cách 3: Không có cái nào VIP (trừ khi MAKE_ALL_VIP bên trên là true)
    ...autoGen('hu', 'hieuung', 'Ảnh hiệu ứng ', '.png', 25, 'LINK_DRIVE_FOLDER_HU', true),
];

let currentPages = { 'nv': 1, 'bc': 1, 'hu': 1 };

// =========================================================================
// 3. XỬ LÝ GOOGLE SHEET & LINK TẢI TRỰC TIẾP
// =========================================================================

function makeDirectDriveLink(url) {
    if (!url) return "#";
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return url; 
}

async function fetchSheetDataAndRender() {
    if (SHEET_CSV_URL && SHEET_CSV_URL.startsWith("http")) {
        try {
            const response = await fetch(SHEET_CSV_URL);
            const csvText = await response.text();
            const rows = csvText.split('\n').map(row => row.split(','));
            
            if (rows.length > 0) {
                const headers = rows[0].map(header => header.trim().toLowerCase());
                let colMap = {};
                headers.forEach((header, index) => { colMap[header] = index; });

                resourceData = resourceData.map(item => {
                    let type = item.type;
                    let rowNumber = parseInt(item.id.split('-')[1]);
                    let colIndex = colMap[type];
                    if (colIndex !== undefined && rows[rowNumber]) {
                        let linkFromSheet = rows[rowNumber][colIndex];
                        if (linkFromSheet && linkFromSheet.trim() !== "") {
                            item.linkDown = makeDirectDriveLink(linkFromSheet.trim());
                        }
                    }
                    return item;
                });
            }
        } catch (error) {
            console.error("Lỗi Google Sheet:", error);
        }
    }
    initAllTabs();
}

// =========================================================================
// 4. HIỂN THỊ & PHÂN TRANG
// =========================================================================
function renderTab(type, gridId, paginationId, countId) {
    const grid = document.getElementById(gridId);
    const pagination = document.getElementById(paginationId);
    const countSpan = document.getElementById(countId);
    
    const filteredData = resourceData.filter(item => item.type === type);
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    if(countSpan) countSpan.innerText = totalItems;
    if (currentPages[type] > totalPages) currentPages[type] = totalPages;

    const startIndex = (currentPages[type] - 1) * ITEMS_PER_PAGE;
    const pageData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    grid.innerHTML = '';
    pageData.forEach(item => {
        grid.innerHTML += `
            <div class="resource-card">
                <div class="card-image">
                    <img src="${item.img}" alt="${item.title}" draggable="false" oncontextmenu="return false;">
                    ${item.isVip ? '<div class="badge vip-badge">👑 VIP</div>' : ''}
                </div>
                <div class="card-info">
                    <h3>${item.title}</h3>
                    <div class="action-buttons">
                        <a href="${item.linkDown}" class="btn-download">Tải Xuống</a>
                        <a href="${item.linkFolder}" target="_blank" class="btn-folder">Thư Mục</a>
                    </div>
                </div>
            </div>
        `;
    });

    pagination.innerHTML = '';
    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            btn.className = `page-btn ${currentPages[type] === i ? 'active' : ''}`;
            btn.onclick = () => {
                currentPages[type] = i; 
                renderTab(type, gridId, paginationId, countId);
                window.scrollTo(0,0); 
            };
            pagination.appendChild(btn);
        }
    }
}

function initAllTabs() {
    renderTab('nv', 'grid-nhan-vat', 'pagination-nhan-vat', 'count-nv');
    renderTab('bc', 'grid-bieu-cam', 'pagination-bieu-cam', 'count-bc');
    renderTab('hu', 'grid-hieu-ung', 'pagination-hieu-ung', 'count-hu');
}

document.addEventListener('DOMContentLoaded', fetchSheetDataAndRender);

// =========================================================================
// 5. HỆ THỐNG MENU & MODAL
// =========================================================================
function openTab(evt, tabName) {
    let tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) { tabContents[i].style.display = "none"; }
    let tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) { tabBtns[i].classList.remove("active"); }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

const modal = document.getElementById("vipModal");
function openModal() { modal.classList.add("show"); document.body.style.overflow = "hidden"; }
function closeModal() { modal.classList.remove("show"); document.body.style.overflow = "auto"; }
window.onclick = function(e) { if (e.target == modal) closeModal(); }
