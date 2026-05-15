// =========================================================================
// 1. CẤU HÌNH LINK ẢNH TỪ GITHUB (Thay bằng link kho ảnh của bạn)
// =========================================================================
const GITHUB_CDN = "https://cdn.jsdelivr.net/gh/nguyenvana/kho-tai-nguyen@main/images/";

// =========================================================================
// 2. KHO DỮ LIỆU TẬP TRUNG (20 Ơ MẶC ĐỊNH)
// =========================================================================
const resourceData = [
    // --- 10 Ô TAB NHÂN VẬT (Ký hiệu: nv) ---
    { id: 1, type: 'nv', title: "Nhân Vật Anime Độc Quyền Vol 1", img: GITHUB_CDN + "nv-1.jpg", linkDown: "#", linkFolder: "#", isVip: true },
    { id: 2, type: 'nv', title: "Chiến Binh Fantasy Cơ Bản", img: GITHUB_CDN + "nv-2.jpg", linkDown: "#", linkFolder: "#", isVip: false },
    { id: 3, type: 'nv', title: "Set NPC Đường Phố Chuyên Sâu", img: GITHUB_CDN + "nv-3.jpg", linkDown: "#", linkFolder: "#", isVip: true },
    { id: 4, type: 'nv', title: "Quái Vật Khổng Lồ RPG Pack", img: GITHUB_CDN + "nv-4.jpg", linkDown: "#", linkFolder: "#", isVip: false },
    { id: 5, type: 'nv', title: "Hiệp Sĩ Trung Cổ Bản Premium", img: GITHUB_CDN + "nv-5.jpg", linkDown: "#", linkFolder: "#", isVip: true },
    { id: 6, type: 'nv', title: "Robot Cơ Khí Sci-Fi Chibi", img: GITHUB_CDN + "nv-6.jpg", linkDown: "#", linkFolder: "#", isVip: false },
    { id: 7, type: 'nv', title: "Pháp Sư Tối Thượng 3D Model", img: GITHUB_CDN + "nv-7.jpg", linkDown: "#", linkFolder: "#", isVip: true },
    { id: 8, type: 'nv', title: "Sát Thủ Bóng Đêm Ninja Pack", img: GITHUB_CDN + "nv-8.jpg", linkDown: "#", linkFolder: "#", isVip: false },
    { id: 9, type: 'nv', title: "Thợ Săn Tiền Thưởng Cyberpunk", img: GITHUB_CDN + "nv-9.jpg", linkDown: "#", linkFolder: "#", isVip: true },
    { id: 10, type: 'nv', title: "Thần Thoại Hy Lạp Asset Bundle", img: GITHUB_CDN + "nv-10.jpg", linkDown: "#", linkFolder: "#", isVip: false },
    
    // --- 10 Ô TAB BIỂU CẢM (Ký hiệu: bc) ---
    { id: 11, type: 'bc', title: "Gói Biểu Cảm Streamer Hài Hước", img: GITHUB_CDN + "bc-1.png", linkDown: "#", linkFolder: "#", isVip: false },
    { id: 12, type: 'bc', title: "Emote Khóc Nhè Đáng Yêu VIP", img: GITHUB_CDN + "bc-2.png", linkDown: "#", linkFolder: "#", isVip: true },
    { id: 13, type: 'bc', title: "Set Biểu Cảm Chibi Discord", img: GITHUB_CDN + "bc-3.png", linkDown: "#", linkFolder: "#", isVip: false },
    { id: 14, type: 'bc', title: "Gói Biểu Cảm Giận Dữ Neon", img: GITHUB_CDN + "bc-4.png", linkDown: "#", linkFolder: "#", isVip: true },
    { id: 15, type: 'bc', title: "Animated Emotes For Twitch", img: GITHUB_CDN + "bc-5.png", linkDown: "#", linkFolder: "#", isVip: false },
    { id: 16, type: 'bc', title: "Kính Mắt ThugLife Meme Pack", img: GITHUB_CDN + "bc-6.png", linkDown: "#", linkFolder: "#", isVip: true },
    { id: 17, type: 'bc', title: "Biểu Cảm Game Thủ Pro Gamer", img: GITHUB_CDN + "bc-7.png", linkDown: "#", linkFolder: "#", isVip: false },
    { id: 18, type: 'bc', title: "Gói Sticker Cute Động Vật", img: GITHUB_CDN + "bc-8.png", linkDown: "#", linkFolder: "#", isVip: false },
    { id: 19, type: 'bc', title: "Halloween Special Emotes", img: GITHUB_CDN + "bc-9.png", linkDown: "#", linkFolder: "#", isVip: true },
    { id: 20, type: 'bc', title: "Pixel Art Emote Cổ Điển", img: GITHUB_CDN + "bc-10.png", linkDown: "#", linkFolder: "#", isVip: false }
];

const DISPLAY_LIMIT = 20; 

// =========================================================================
// 3. HÀM TỰ ĐỘNG TẠO Ô & BẢO VỆ ẢNH CHỐNG COPY
// =========================================================================
function renderResources() {
    const gridNV = document.getElementById('grid-nhan-vat');
    const gridBC = document.getElementById('grid-bieu-cam');
    
    gridNV.innerHTML = '';
    gridBC.innerHTML = '';
    
    let countNV = 0;
    let countBC = 0;

    resourceData.slice(0, DISPLAY_LIMIT).forEach(item => {
        const cardHTML = `
            <div class="resource-card">
                <div class="card-image">
                    <!-- draggable="false" và oncontextmenu="return false;" chặn thao tác chuột trên ảnh -->
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

        if (item.type === 'nv') {
            gridNV.innerHTML += cardHTML;
            countNV++;
        } else if (item.type === 'bc') {
            gridBC.innerHTML += cardHTML;
            countBC++;
        }
    });

    document.getElementById('count-nv').innerText = countNV;
    document.getElementById('count-bc').innerText = countBC;
}

// Chạy hàm khi trang tải xong
document.addEventListener('DOMContentLoaded', renderResources);

// =========================================================================
// 4. HỆ THỐNG CHUYỂN ĐỔI TAB & GOOGLE FORM
// =========================================================================
function openTab(evt, tabName) {
    let tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove("active");
    }

    let tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

const modal = document.getElementById("vipModal");
function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // Khóa cuộn trang nền
}

function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto"; // Mở lại cuộn trang nền
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}